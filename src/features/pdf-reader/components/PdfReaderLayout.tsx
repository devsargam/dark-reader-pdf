"use client";

import React from "react";
import { FileUp, Download, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PdfUploader } from "./PdfUploader";

interface PdfReaderLayoutProps {
  selectedFile: File | null;
  isZenMode: boolean;
  onFileSelect: (file: File) => void;
  onDownload: () => void;
  onOpenShortcutsDialog: () => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export function PdfReaderLayout({
  selectedFile,
  isZenMode,
  onFileSelect,
  onDownload,
  onOpenShortcutsDialog,
  isDialogOpen,
  setIsDialogOpen,
  children,
}: PdfReaderLayoutProps) {
  return (
    <div
      className={`min-h-screen bg-background ${isZenMode ? "zen-mode" : ""}`}
    >
      {!isZenMode && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-primary">
              Dark Mode PDF Reader
            </h1>
            <p className="text-muted-foreground text-center max-w-2xl">
              Upload a PDF file and read it with inverted colors - dark
              background with white text for better readability in low light
              conditions.
            </p>
          </div>

          {!selectedFile ? (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-lg bg-card/50">
              <PdfUploader onFileSelect={onFileSelect} />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4 p-4 bg-card rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold truncate max-w-[50%] text-card-foreground">
                  {selectedFile.name}
                </h2>
                <div className="flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={onOpenShortcutsDialog}
                          className="hover:bg-primary/10"
                        >
                          <Keyboard className="h-4 w-4 mr-2" />
                          Shortcuts
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View keyboard shortcuts</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onDownload}
                    className="hover:bg-primary/10"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Original
                  </Button>

                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-primary/10"
                      >
                        <FileUp className="h-4 w-4 mr-2" />
                        Change PDF
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Upload a PDF</DialogTitle>
                      </DialogHeader>
                      <PdfUploader onFileSelect={onFileSelect} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedFile && (
        <div className={isZenMode ? "h-screen w-full" : ""}>{children}</div>
      )}
    </div>
  );
}
