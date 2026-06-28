# RPP Editor - Rencana Pelaksanaan Pembelajaran

A comprehensive web-based editor for creating and editing RPP (Rencana Pelaksanaan Pembelajaran / Lesson Plan) documents for Indonesian SMK (Vocational High School) teachers.

## Features

- **Complete RPP Structure**: All sections from the official format including:
  - Identitas (Identity)
  - Identifikasi (Identification) - Student characteristics & subject characteristics
  - Desain Pembelajaran (Learning Design) - Objectives, methods, partnerships
  - Pengalaman Belajar (Learning Experience) - Opening, core, closing activities
  - Asesmen (Assessment) - Initial, process, final assessment
  - Lampiran (Appendix) - Rubrics, jobsheets, signatures

- **Smart Editing**:
  - Tab-based navigation for easy section switching
  - Dynamic list management (add/remove items)
  - Auto-save to localStorage
  - Print-friendly layout

- **Export Options**:
  - Export to `.docx` (Microsoft Word format)
  - Print directly from browser

## Tech Stack

- **Next.js 15** with App Router
- **React 19** + TypeScript
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **docx.js** for Word export
- **Lucide React** for icons

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or extract the project
cd rpp-editor

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
```

The static export will be in the `dist/` folder.

## Usage

1. **Fill in each tab** with your lesson plan data
2. **Add/remove items** using the + and trash buttons
3. **Auto-save** happens automatically every second
4. **Export DOCX** to download a Word document
5. **Print** for a print-friendly version

## Project Structure

```
rpp-editor/
├── app/
│   ├── globals.css      # Global styles + print styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main RPP editor page
├── components/
│   └── ui/              # Reusable UI components
├── lib/
│   ├── utils.ts         # Utility functions (cn)
│   └── docx-export.ts   # DOCX export logic
├── types/
│   └── rpp.ts           # TypeScript types + default data
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

## Customization

The default data is defined in `types/rpp.ts` under `defaultRPP`. You can modify this to match your school's default template.

## License

MIT
