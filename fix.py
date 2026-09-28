import re

with open('apps/desktop-agent/src/App.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add import
if 'import { DetailPane }' not in code:
    code = "import { DetailPane } from './DetailPane';\n" + code

# 2. Regex to remove DetailPane
# It starts with "  const DetailPane = ({ order }: { order: any }) => {"
# and ends with "    );\n  };"
pattern = r"  const DetailPane = \(\{ order \}: \{ order: any \}\) => \{.*?\n  \};\n"
code = re.sub(pattern, "", code, flags=re.DOTALL)

# 3. Update usages
code = code.replace(
    "<DetailPane order={currentOrder} />",
    "<DetailPane order={currentOrder} apiUrl={apiUrl} t={t} formatMoney={formatMoney} printSelected={printSelected} />"
)

code = code.replace(
    "<DetailPane order={o} />",
    "<DetailPane order={o} apiUrl={apiUrl} t={t} formatMoney={formatMoney} printSelected={printSelected} />"
)

with open('apps/desktop-agent/src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Done")
