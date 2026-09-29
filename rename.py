import os
import re

def replace_in_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original = content
        
        # We only want to replace PrintPanda when it's NOT part of a URL, 
        # and not part of a hyphenated string like printpanda-api
        
        # First, temporarily protect URLs and known system strings by replacing them with placeholders
        placeholders = {}
        counter = 0
        
        def protect(match):
            nonlocal counter
            p = f"__PROTECTED_{counter}__"
            placeholders[p] = match.group(0)
            counter += 1
            return p
            
        # Protect onrender URLs
        content = re.sub(r'printpanda-api\.onrender\.com', protect, content, flags=re.IGNORECASE)
        # Protect github agent exe
        content = re.sub(r'PrintPanda-Agent-Setup\.exe', protect, content, flags=re.IGNORECASE)
        # Protect render.yaml DBs and services
        content = re.sub(r'printpanda-(db|redis|api)', protect, content, flags=re.IGNORECASE)
        # Protect package names or node_modules
        content = re.sub(r'printpanda', protect, content)
        
        # Now replace visible text
        content = re.sub(r'PrintPanda', 'PrintIt by Inko', content)
        content = re.sub(r'Printpanda', 'PrintIt by Inko', content)
        
        # Restore protected strings
        for p, orig in placeholders.items():
            content = content.replace(p, orig)
            
        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {filepath}")
            
    except Exception as e:
        # Ignore non-text files
        pass

for root, dirs, files in os.walk('.'):
    if 'node_modules' in dirs: dirs.remove('node_modules')
    if 'dist' in dirs: dirs.remove('dist')
    if '.next' in dirs: dirs.remove('.next')
    if '.git' in dirs: dirs.remove('.git')
    
    for file in files:
        if file.endswith(('.ts', '.tsx', '.html', '.md', '.json', '.js', '.jsx')):
            replace_in_file(os.path.join(root, file))
