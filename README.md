# Dark Mode PDF Reader

A Next.js application that allows users to upload PDF files and view them with inverted colors - dark background with white text for better readability in low light conditions.

## Features

- Upload PDF files via drag-and-drop or file browser
- View PDFs with inverted colors (dark background, white text)
- Navigate between pages
- Zoom in and out
- Responsive design for all device sizes

## Technologies Used

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- react-pdf for PDF rendering
- pdf-lib for PDF manipulation
- Radix UI for accessible components

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/dark-reader.git
cd dark-reader
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Upload a PDF file by dragging and dropping it onto the upload area or by clicking the upload area to browse for a file.
2. Once uploaded, the PDF will be displayed with inverted colors.
3. Use the navigation buttons to move between pages.
4. Use the zoom buttons to adjust the size of the PDF.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
