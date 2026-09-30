import re
file_path = "apps/web/app/partner-signup/page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    'import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";\nimport { auth } from "../../lib/firebase";\n"use client";',
    '"use client";\nimport { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";\nimport { auth } from "../../lib/firebase";'
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed use client")
