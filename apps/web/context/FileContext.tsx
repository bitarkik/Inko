"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Store {
  id: string;
  name: string;
  address: string;
  basePrice: number;
  isAcceptingOrders: boolean;
}

interface PrintSettings {
  pages: number;
  mode: string;
  finish: string;
  total: number;
}

interface FileContextProps {
  file: File | null;
  setFile: (file: File | null) => void;
  selectedStore: Store | null;
  setSelectedStore: (store: Store | null) => void;
  printSettings: PrintSettings | null;
  setPrintSettings: (settings: PrintSettings | null) => void;
}

const FileContext = createContext<FileContextProps | undefined>(undefined);

export function FileProvider({ children }: { children: ReactNode }) {
  const [file, setFile] = useState<File | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [printSettings, setPrintSettings] = useState<PrintSettings | null>(null);

  return (
    <FileContext.Provider value={{ file, setFile, selectedStore, setSelectedStore, printSettings, setPrintSettings }}>
      {children}
    </FileContext.Provider>
  );
}

export function useFile() {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFile must be used within a FileProvider");
  }
  return context;
}
