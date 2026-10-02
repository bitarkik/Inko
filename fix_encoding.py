import sys

file_path = 'apps/web/app/partner-signup/page.tsx'

with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

# Fix common UTF-8 mojibake for dashes
text = text.replace('â€“', '—')
text = text.replace('Ã¢â‚¬â€œ', '—')
text = text.replace('â€”', '—')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Encoding fixed")
