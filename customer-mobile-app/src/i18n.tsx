import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'bn';

interface I18nContextType {
  lang: Language;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    greeting: 'Good afternoon, Tanvir',
    fast: 'READY IN UNDER 30 SECONDS',
    quick: '1-Tap Quick Print',
    formats: 'PDF, DOCX, images — from your phone to the counter.',
    selectFile: 'Select file',
    nearby: 'Nearby print shops',
    list: 'List',
    map: 'Map',
    recent: 'Recent documents',
    seeAll: 'See all',
    reprint: 'Order again',
    configure: 'Configure print',
    preview: 'Page preview',
    colorMode: 'Color mode',
    sided: 'Sided',
    paper: 'Paper',
    copies: 'Copies',
    selectShop: 'Select shop',
    chooseShop: 'Choose a shop',
    continuePayment: 'Continue to payment',
    payment: 'Payment',
    payWith: 'Pay with',
    cash: 'Cash at counter',
    placeOrder: 'Place order',
    orders: 'Your order',
    received: 'Order received',
    printing: 'Printing at shop',
    ready: 'Ready for pickup',
    handover: 'HANDOVER TOKEN',
    showCounter: 'Show this at the counter',
    saved: 'Saved documents',
    printAgain: 'Order again',
    home: 'Home',
    ordersNav: 'Orders',
    savedNav: 'Saved',
    chooseSource: 'Choose a file',
  },
  bn: {
    greeting: 'শুভ অপরাহ্ণ, Tanvir',
    fast: '৩০ সেকেন্ডের মধ্যে প্রস্তুত',
    quick: '১-ট্যাপ কুইক প্রিন্ট',
    formats: 'PDF, DOCX, ছবি — ফোন থেকে সরাসরি কাউন্টারে।',
    selectFile: 'ফাইল বাছুন',
    nearby: 'কাছের প্রিন্ট শপ',
    list: 'তালিকা',
    map: 'মানচিত্র',
    recent: 'সাম্প্রতিক ডকুমেন্ট',
    seeAll: 'সব দেখুন',
    reprint: 'আবার অর্ডার',
    configure: 'প্রিন্ট কনফিগার',
    preview: 'পেজ প্রিভিউ',
    colorMode: 'কালার মোড',
    sided: 'পার্শ্ব',
    paper: 'কাগজ',
    copies: 'কপি',
    selectShop: 'শপ বাছুন',
    chooseShop: 'শপ বাছুন',
    continuePayment: 'পেমেন্টে যান',
    payment: 'পেমেন্ট',
    payWith: 'যেভাবে পেমেন্ট করবেন',
    cash: 'কাউন্টারে নগদ',
    placeOrder: 'অর্ডার করুন',
    orders: 'আপনার অর্ডার',
    received: 'অর্ডার গৃহীত',
    printing: 'শপে প্রিন্ট হচ্ছে',
    ready: 'পিকআপের জন্য প্রস্তুত',
    handover: 'হ্যান্ডওভার টোকেন',
    showCounter: 'কাউন্টারে এটি দেখান',
    saved: 'সেভ করা ডকুমেন্ট',
    printAgain: 'আবার অর্ডার',
    home: 'হোম',
    ordersNav: 'অর্ডার',
    savedNav: 'সেভড',
    chooseSource: 'ফাইল বাছুন',
  }
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'bn' : 'en');
  };

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
