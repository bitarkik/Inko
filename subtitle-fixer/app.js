document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');
    const uploadContent = document.querySelector('.upload-content');
    const fileInfo = document.getElementById('file-info');
    const fileNameDisplay = document.getElementById('file-name');
    const fileSizeDisplay = document.getElementById('file-size');
    const removeFileBtn = document.getElementById('remove-file-btn');
    
    const settingsSection = document.getElementById('settings-section');
    const previewSection = document.getElementById('preview-section');
    const previewContainer = document.getElementById('preview-container');
    const downloadBtn = document.getElementById('download-btn');
    
    const origFpsInput = document.getElementById('orig-fps');
    const targetFpsInput = document.getElementById('target-fps');
    const timeShiftInput = document.getElementById('time-shift');
    const shiftMinusBtn = document.getElementById('shift-minus');
    const shiftPlusBtn = document.getElementById('shift-plus');
    const presetBtns = document.querySelectorAll('.preset-btn');
    
    // State
    let currentFile = null;
    let originalBlocks = [];
    let modifiedBlocks = [];

    // --- File Upload Logic ---
    
    // Click to browse
    browseBtn.addEventListener('click', () => {
        fileInput.click();
    });
    
    // File input change
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });
    
    // Drag and drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            const file = e.dataTransfer.files[0];
            if (file.name.endsWith('.srt')) {
                handleFile(file);
            } else {
                alert('Please upload a valid .srt file.');
            }
        }
    });
    
    // Remove file
    removeFileBtn.addEventListener('click', () => {
        currentFile = null;
        originalBlocks = [];
        modifiedBlocks = [];
        fileInput.value = '';
        
        uploadContent.style.display = 'flex';
        fileInfo.style.display = 'none';
        
        settingsSection.style.opacity = '0.5';
        settingsSection.style.pointerEvents = 'none';
        previewSection.style.display = 'none';
    });
    
    // --- Setup Inputs ---
    
    presetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const val = btn.getAttribute('data-val');
            document.getElementById(targetId).value = val;
            updatePreview();
        });
    });
    
    [origFpsInput, targetFpsInput, timeShiftInput].forEach(input => {
        input.addEventListener('input', updatePreview);
    });
    
    shiftMinusBtn.addEventListener('click', () => {
        let val = parseFloat(timeShiftInput.value) || 0;
        timeShiftInput.value = (val - 0.5).toFixed(1);
        updatePreview();
    });
    
    shiftPlusBtn.addEventListener('click', () => {
        let val = parseFloat(timeShiftInput.value) || 0;
        timeShiftInput.value = (val + 0.5).toFixed(1);
        updatePreview();
    });
    
    // Download
    downloadBtn.addEventListener('click', downloadFixedSubtitle);
    
    // --- Core Logic ---
    
    function handleFile(file) {
        currentFile = file;
        fileNameDisplay.textContent = file.name;
        fileSizeDisplay.textContent = formatBytes(file.size);
        
        uploadContent.style.display = 'none';
        fileInfo.style.display = 'flex';
        
        settingsSection.style.opacity = '1';
        settingsSection.style.pointerEvents = 'auto';
        previewSection.style.display = 'block';
        
        const reader = new FileReader();
        reader.onload = (e) => {
            originalBlocks = parseSRT(e.target.result);
            updatePreview();
        };
        reader.readAsText(file);
    }
    
    function parseSRT(data) {
        const blocks = data.trim().split(/\r?\n\r?\n/);
        return blocks.map(block => {
            const lines = block.split(/\r?\n/);
            if (lines.length < 3) return null;
            
            const index = lines[0];
            const timeLine = lines[1];
            const text = lines.slice(2).join('\n');
            
            const timeMatch = timeLine.match(/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/);
            if (!timeMatch) return null;
            
            return {
                index,
                startMs: timeToMs(timeMatch[1]),
                endMs: timeToMs(timeMatch[2]),
                originalStartStr: timeMatch[1],
                originalEndStr: timeMatch[2],
                text
            };
        }).filter(b => b !== null);
    }
    
    function updatePreview() {
        if (!originalBlocks.length) return;
        
        const origFps = parseFloat(origFpsInput.value) || 25;
        const targetFps = parseFloat(targetFpsInput.value) || 25;
        const shiftSeconds = parseFloat(timeShiftInput.value) || 0;
        
        const scale = origFps / targetFps;
        const shiftMs = shiftSeconds * 1000;
        
        modifiedBlocks = originalBlocks.map(block => {
            const newStartMs = Math.max(0, (block.startMs * scale) + shiftMs);
            const newEndMs = Math.max(0, (block.endMs * scale) + shiftMs);
            
            return {
                ...block,
                newStartMs,
                newEndMs,
                newStartStr: msToTime(newStartMs),
                newEndStr: msToTime(newEndMs)
            };
        });
        
        renderPreview();
    }
    
    function renderPreview() {
        previewContainer.innerHTML = '';
        
        const previewCount = Math.min(5, modifiedBlocks.length);
        for (let i = 0; i < previewCount; i++) {
            const block = modifiedBlocks[i];
            
            const row = document.createElement('div');
            row.className = 'preview-row';
            
            row.innerHTML = `
                <div class="preview-time-block">
                    <span class="preview-label">Original</span>
                    <span class="preview-time">${block.originalStartStr} --> ${block.originalEndStr}</span>
                </div>
                <div class="preview-time-block">
                    <span class="preview-label">Modified</span>
                    <span class="preview-time modified">${block.newStartStr} --> ${block.newEndStr}</span>
                </div>
                <div class="preview-text">${block.text.replace(/\n/g, '<br>')}</div>
            `;
            
            previewContainer.appendChild(row);
        }
    }
    
    function downloadFixedSubtitle() {
        if (!modifiedBlocks.length) return;
        
        let srtContent = '';
        modifiedBlocks.forEach(block => {
            srtContent += `${block.index}\n`;
            srtContent += `${block.newStartStr} --> ${block.newEndStr}\n`;
            srtContent += `${block.text}\n\n`;
        });
        
        const blob = new Blob([srtContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        const originalName = currentFile ? currentFile.name : 'subtitle.srt';
        const nameWithoutExt = originalName.substring(0, originalName.lastIndexOf('.')) || originalName;
        
        a.href = url;
        a.download = `${nameWithoutExt}_fixed.srt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // --- Utility Functions ---
    
    function timeToMs(timeStr) {
        const [h, m, s_ms] = timeStr.split(':');
        const [s, ms] = s_ms.split(',');
        return parseInt(h) * 3600000 + parseInt(m) * 60000 + parseInt(s) * 1000 + parseInt(ms);
    }
    
    function msToTime(ms) {
        ms = Math.floor(ms);
        const h = Math.floor(ms / 3600000).toString().padStart(2, '0');
        const m = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
        const s = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
        const milliseconds = Math.floor(ms % 1000).toString().padStart(3, '0');
        return `${h}:${m}:${s},${milliseconds}`;
    }
    
    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }
});
