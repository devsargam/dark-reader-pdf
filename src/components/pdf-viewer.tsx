"use client";

import React, { useState, useEffect, useRef } from "react";
import { Maximize2, Minimize2, Moon, Sun } from "lucide-react";

interface PdfViewerProps {
  file: File | null;
}

export function PdfViewer({ file }: PdfViewerProps) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
  }, []);

  if (!fileUrl) {
    return (
      <div className="text-center p-4 text-gray-500">No PDF file selected</div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`h-screen w-full relative ${
        isDarkMode ? "bg-[#1a1a1a]" : "bg-white"
      }`}
    >
      <div className="absolute top-2 right-2 z-10 flex space-x-2">
        <button
          onClick={toggleDarkMode}
          className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          aria-label={isDarkMode ? "Light mode" : "Dark mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={toggleFullScreen}
          className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          aria-label={isFullScreen ? "Exit full screen" : "Enter full screen"}
        >
          {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </button>
      </div>
      <object
        data={fileUrl}
        type="application/pdf"
        className="w-full h-full"
        style={
          isDarkMode
            ? {
                filter: "invert(1) hue-rotate(180deg)",
                backgroundColor: "#1a1a1a",
              }
            : undefined
        }
      >
        <div className="text-center p-4 text-red-500">
          Your browser does not support PDF viewing. Please download the file to
          view it.
        </div>
      </object>
    </div>
  );
}
