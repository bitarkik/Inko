import re
import sys

file_path = "apps/web/app/partner-signup/page.tsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add state variables inside the component
states = """  const [verificationId, setVerificationId] = useState<any>(null);
  const [otp, setOtp] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [firebaseIdToken, setFirebaseIdToken] = useState("");
  const recaptchaVerifierRef = useRef<any>(null);

  useEffect(() => {
    if (!recaptchaVerifierRef.current && typeof window !== 'undefined') {
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
  }, []);

  const handleSendOtp = async () => {
    if (errors.phone || !formData.contactNumber) {
      alert("Please enter a valid phone number first.");
      return;
    }
    setIsVerifying(true);
    try {
      const formattedPhone = formData.contactNumber.startsWith('+88') 
        ? formData.contactNumber 
        : `+88${formData.contactNumber}`;

      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, recaptchaVerifierRef.current);
      setVerificationId(confirmationResult);
      alert(currentLang === 'bn' ? "OTP পাঠানো হয়েছে" : "OTP sent to your phone");
    } catch (error: any) {
      console.error(error);
      alert("Error sending OTP: " + error.message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return;
    setIsVerifying(true);
    try {
      const result = await verificationId.confirm(otp);
      const token = await result.user.getIdToken();
      setFirebaseIdToken(token);
      setIsPhoneVerified(true);
      alert(currentLang === 'bn' ? "ফোন নম্বর ভেরিফাই হয়েছে!" : "Phone number verified!");
    } catch (error) {
      console.error(error);
      alert("Invalid OTP");
    } finally {
      setIsVerifying(false);
    }
  };
"""

content = content.replace("  const [showDropdown, setShowDropdown] = useState(false);", f"  const [showDropdown, setShowDropdown] = useState(false);\n{states}")

# 2. Add validation block in handleNext for currentStep === 0
handle_next_block = """      if (!isPhoneVerified) {
        alert(currentLang === 'bn' ? "দয়া করে ফোন নম্বর ভেরিফাই করুন।" : "Please verify your phone number before proceeding.");
        return;
      }"""
# Inject right before the end of `if (currentStep === 0) {` block
content = content.replace('      if (!phoneRegex.test(formData.contactNumber)) {\n        alert(currentLang === \'bn\' ? "অনুগ্রহ করে একটি সঠিক ১১-ডিজিটের বাংলাদেশি ফোন নম্বর দিন (যেমন: 017...)।" : "Please enter a valid 11-digit Bangladeshi phone number (e.g., 017...).");\n        return;\n      }', '      if (!phoneRegex.test(formData.contactNumber)) {\n        alert(currentLang === \'bn\' ? "অনুগ্রহ করে একটি সঠিক ১১-ডিজিটের বাংলাদেশি ফোন নম্বর দিন (যেমন: 017...)।" : "Please enter a valid 11-digit Bangladeshi phone number (e.g., 017...).");\n        return;\n      }\n' + handle_next_block)

content = content.replace('      if (!phoneRegex.test(formData.contactNumber)) {\n        alert(currentLang === \'bn\' ? "অনুগ্রহ করে একটি সঠিক ১১-ডিজিটের বাংলাদেশি ফোন নম্বর দিন (ধাপ ১)।" : "Please enter a valid 11-digit Bangladeshi phone number in Step 1.");\n        setCurrentStep(0);\n        return;\n      }', '      if (!phoneRegex.test(formData.contactNumber)) {\n        alert(currentLang === \'bn\' ? "অনুগ্রহ করে একটি সঠিক ১১-ডিজিটের বাংলাদেশি ফোন নম্বর দিন (ধাপ ১)।" : "Please enter a valid 11-digit Bangladeshi phone number in Step 1.");\n        setCurrentStep(0);\n        return;\n      }\n' + handle_next_block.replace('return;', 'setCurrentStep(0);\n        return;'))


# 3. Update handleSubmit to include headers
content = content.replace('headers: { "Content-Type": "application/json" }', 'headers: { "Content-Type": "application/json", "Authorization": `Bearer ${firebaseIdToken}` }')

# 4. Update the input field for phone in the JSX
old_input = """<input id="phone" type="tel" placeholder="01XXXXXXXXX" value={formData.contactNumber} onChange={(e) => setFormData({...formData, contactNumber: e.target.value})} required style={errors.phone ? { borderColor: 'var(--danger)', color: 'var(--danger)' } : {}} />"""
new_input = """<input id="phone" type="tel" placeholder="01XXXXXXXXX" value={formData.contactNumber} onChange={(e) => { setFormData({...formData, contactNumber: e.target.value}); setIsPhoneVerified(false); setVerificationId(null); }} required style={errors.phone ? { borderColor: 'var(--danger)', color: 'var(--danger)' } : {}} disabled={isPhoneVerified} />
                    
                    {!isPhoneVerified && !verificationId && (
                      <button type="button" onClick={handleSendOtp} disabled={isVerifying || !!errors.phone || !formData.contactNumber} className="absolute right-2 top-2 bg-[#0b7250] text-white px-3 py-1 rounded text-sm disabled:opacity-50 z-10 hover:bg-[#095f43]">
                        {isVerifying ? "..." : "Verify"}
                      </button>
                    )}
                    {isPhoneVerified && (
                      <span className="absolute right-3 top-3 text-[#0b7250] font-bold z-10">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </span>
                    )}
                  </div>
                  <div className="hint" style={errors.phone ? { color: 'var(--danger)', fontWeight: 600 } : {}}>{errors.phone || t.phoneHint}</div>
                  
                  {verificationId && !isPhoneVerified && (
                    <div className="mt-2 p-3 bg-[var(--surface-2)] rounded-[10px] border border-[var(--line)]">
                      <label className="text-sm font-medium mb-1 block text-[var(--muted)]">Enter OTP</label>
                      <div className="flex gap-2">
                        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} className="flex-1 !pl-3" placeholder="123456" />
                        <button type="button" onClick={handleVerifyOtp} disabled={isVerifying || !otp} className="bg-[#0b7250] text-white px-4 py-2 rounded font-medium disabled:opacity-50 hover:bg-[#095f43] border-0 cursor-pointer transition-colors">
                          {isVerifying ? "..." : "Submit"}
                        </button>
                      </div>
                    </div>
                  )}
                  <div id="recaptcha-container"></div>
"""

# Replace the input and the immediate </div><div className="hint"> logic since we need to insert the OTP field below the input-wrap.
content = content.replace(old_input + '\n                  </div>\n                  <div className="hint" style={errors.phone ? { color: \'var(--danger)\', fontWeight: 600 } : {}}>{errors.phone || t.phoneHint}</div>', new_input)


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Patched successfully")
