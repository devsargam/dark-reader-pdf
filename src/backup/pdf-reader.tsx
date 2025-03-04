"use client";

import React, { useState } from "react";
import { PdfUploader } from "@/components/pdf-uploader";
import { PdfViewer } from "@/components/pdf-viewer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUp, Download, Keyboard } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <div className={`min-h-screen ${isZenMode ? "zen-mode" : ""}`}>
      {!isZenMode && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Dark Mode PDF Reader</h1>
            <p className="text-gray-500 text-center max-w-2xl">
              Upload a PDF file and read it with inverted colors - dark
              background with white text for better readability in low light
              conditions.
            </p>
          </div>

          {!selectedFile ? (
            <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 rounded-lg">
              <PdfUploader onFileSelect={handleFileSelect} />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold truncate max-w-[50%]">
                  {selectedFile.name}
                </h2>
                <div className="flex space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsShortcutsDialogOpen(true)}
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

                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Original
                  </Button>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FileUp className="h-4 w-4 mr-2" />
                        Change PDF
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload a PDF</DialogTitle>
                      </DialogHeader>
                      <PdfUploader onFileSelect={handleFileSelect} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {selectedFile && (
        <div className={isZenMode ? "h-screen w-full" : ""}>
          <PdfViewer
            file={selectedFile}
            onZenModeChange={handleZenModeChange}
          />
        </div>
      )}

      {/* Keyboard Shortcuts Dialog */}
      <Dialog
        open={isShortcutsDialogOpen}
        onOpenChange={setIsShortcutsDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">Z</div>
              <div>Toggle Zen Mode</div>

              <div className="font-medium">F</div>
              <div>Toggle Fullscreen</div>

              <div className="font-medium">D</div>
              <div>Toggle Dark Mode</div>

              <div className="font-medium">H</div>
              <div>Hide/Show Controls in Zen Mode</div>

              <div className="font-medium">Escape</div>
              <div>Exit Zen Mode / Fullscreen</div>

              <div className="font-medium">Double-click</div>
              <div>Toggle Controls in Zen Mode</div>
            </div>

            <div className="pt-2 text-sm text-muted-foreground">
              <p>
                In Zen Mode, move your mouse to temporarily show controls, or
                double-click to toggle controls visibility.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
