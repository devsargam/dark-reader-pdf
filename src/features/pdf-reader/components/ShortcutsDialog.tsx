"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ShortcutsDialogProps } from "../types";

export function ShortcutsDialog({
  isOpen,
  onOpenChange,
}: ShortcutsDialogProps) {
  const shortcuts = [
    { key: "Space", description: "Toggle zen mode" },
    { key: "ArrowRight", description: "Next page" },
    { key: "ArrowLeft", description: "Previous page" },
    { key: "ArrowUp", description: "Scroll up" },
    { key: "ArrowDown", description: "Scroll down" },
    { key: "+", description: "Zoom in" },
    { key: "-", description: "Zoom out" },
    { key: "0", description: "Reset zoom" },
    { key: "Esc", description: "Exit zen mode" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {shortcuts.map((shortcut) => (
            <div
              key={shortcut.key}
              className="flex items-center justify-between"
            >
              <span className="text-sm text-muted-foreground">
                {shortcut.description}
              </span>
              <kbd className="px-2 py-1 text-xs font-semibold text-foreground bg-muted rounded border border-[oklch(var(--border))]">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
