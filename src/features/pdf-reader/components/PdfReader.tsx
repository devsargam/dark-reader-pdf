"use client";

import React, { useState } from "react";
import { PdfReaderLayout } from "./PdfReaderLayout";
import { PdfViewer } from "./PdfViewer";
import { ShortcutsDialog } from "./ShortcutsDialog";

export function PdfReader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isZenMode, setIsZenMode] = useState<boolean>(false);
  const [isShortcutsDialogOpen, setIsShortcutsDialogOpen] =
    useState<boolean>(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setIsDialogOpen(false);
  };

  const handleDownload = () => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = selectedFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  // This function will be called from the PdfViewer component
  const handleZenModeChange = (zenMode: boolean) => {
    setIsZenMode(zenMode);
  };

  return (
    <>
      <PdfReaderLayout
        selectedFile={selectedFile}
        isZenMode={isZenMode}
        onFileSelect={handleFileSelect}
        onDownload={handleDownload}
        onOpenShortcutsDialog={() => setIsShortcutsDialogOpen(true)}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      >
        {selectedFile && (
          <PdfViewer
            file={selectedFile}
            onZenModeChange={handleZenModeChange}
          />
        )}
      </PdfReaderLayout>

      <ShortcutsDialog
        isOpen={isShortcutsDialogOpen}
        onOpenChange={setIsShortcutsDialogOpen}
      />
    </>
  );
}
