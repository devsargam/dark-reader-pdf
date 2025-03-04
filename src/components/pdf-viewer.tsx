"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";

interface PdfViewerProps {
  file: File | null;
}

export function PdfViewer({ file }: PdfViewerProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1.0);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  function zoomIn() {
    setScale((prevScale) => Math.min(prevScale + 0.2, 3));
  }

  function zoomOut() {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.5));
  }

  if (!fileUrl) {
    return <div className="text-center p-8">No PDF file selected</div>;
  }

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex justify-center mb-4 space-x-2">
        <Button variant="outline" size="sm" onClick={zoomOut}>
          <ZoomOut className="h-4 w-4 mr-1" />
          Zoom Out
        </Button>
        <Button variant="outline" size="sm" onClick={zoomIn}>
          <ZoomIn className="h-4 w-4 mr-1" />
          Zoom In
        </Button>
      </div>

      <div className="pdf-container bg-[#1a1a1a] p-4 rounded-lg shadow-lg overflow-auto w-full h-[calc(100vh-150px)] flex-grow">
        <div
          className="relative w-full h-full"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            transition: "transform 0.2s ease",
          }}
        >
          <object
            data={fileUrl}
            type="application/pdf"
            className="w-full h-full"
            style={{
              filter: "invert(1) hue-rotate(180deg)",
              backgroundColor: "#1a1a1a",
            }}
          >
            <div className="text-center p-4 text-red-500">
              Your browser does not support PDF viewing. Please download the
              file to view it.
            </div>
          </object>
        </div>
      </div>
    </div>
  );
}
