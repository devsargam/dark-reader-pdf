import React from "react";

export interface PdfUploaderProps {
  onFileSelect: (file: File) => void;
}

export interface PdfViewerProps {
  file: File | null;
  onZenModeChange?: (zenMode: boolean) => void;
}

export interface PdfReaderLayoutProps {
  selectedFile: File | null;
  isZenMode: boolean;
  onFileSelect: (file: File) => void;
  onDownload: () => void;
  onOpenShortcutsDialog: () => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export interface ShortcutsDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
