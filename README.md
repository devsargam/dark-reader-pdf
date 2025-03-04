# Dark Mode PDF Reader

A modern web application for reading PDF files with dark mode support. This application allows you to read PDFs with inverted colors for better readability in low light conditions.

## Features

- **Dark Mode PDF Viewing**: Automatically inverts PDF colors for better readability in low light conditions
- **Zen Mode**: Distraction-free reading experience with fullscreen mode
- **Keyboard Shortcuts**: Convenient keyboard shortcuts for common actions
- **Drag & Drop**: Easy file uploading with drag and drop support
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean and intuitive user interface

## Keyboard Shortcuts

- **Z**: Toggle Zen Mode
- **F**: Toggle Fullscreen
- **D**: Toggle Dark Mode
- **H**: Hide/Show Controls in Zen Mode
- **Escape**: Exit Zen Mode / Fullscreen
- **Double-click**: Toggle Controls in Zen Mode

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI**: Reusable UI components
- **Lucide Icons**: Beautiful SVG icons

## Project Structure

The project follows a feature-based folder structure for better organization:

```
src/
├── app/                  # Next.js app router
├── components/           # Shared UI components
│   └── ui/               # Shadcn UI components
├── features/             # Feature-based modules
│   └── pdf-reader/       # PDF reader feature
│       ├── components/   # PDF reader components
│       ├── hooks/        # Custom hooks
│       ├── utils/        # Utility functions
│       └── types/        # TypeScript types
└── lib/                  # Shared utilities and helpers
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/dark-reader.git
cd dark-reader
```

2. Install dependencies

```bash
pnpm install
```

3. Run the development server

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
pnpm build
```

## License

MIT
