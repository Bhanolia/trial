# RPP Editor

A web-based editor for **Rencana Pelaksanaan Pembelajaran** (RPP) - Lesson Plans for Indonesian SMK (Vocational High School) teachers.

## Features

- **6-Tab Navigation**: Identitas → Identifikasi → Desain → Pengalaman Belajar → Asesmen → Lampiran
- **DPL Checkboxes**: 8 official Kurikulum Merdeka 2025 dimensions with checkmarks
- **Auto-Save**: Data persists in browser localStorage automatically
- **Undo/Redo**: Full history stack with Ctrl+Z / Ctrl+Y (50 states max)
- **Form Validation**: Prevents export with empty required fields
- **Live Preview**: Real-time preview matching DOCX output exactly
- **DOCX Export**: One-click export to Microsoft Word format matching official template
- **Print Support**: Clean print layout with @media print styles

## Tech Stack

- **Framework**: Next.js 15.1.0 + React 19
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4 + shadcn/ui (Radix)
- **DOCX Engine**: docx.js 9.1.0 + file-saver
- **Icons**: Lucide React

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Build for Production

```bash
# Static export (outputs to dist/)
npm run build
```

## Project Structure

```
rpp-editor/
├── app/
│   ├── page.tsx              # Main page with undo/redo, validation
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Tailwind + print styles
├── components/
│   ├── ui/                   # shadcn/ui primitives
│   └── rpp/                  # 7 tab components + live preview
│       ├── IdentitasTab.tsx
│       ├── IdentifikasiTab.tsx
│       ├── DesainTab.tsx
│       ├── PengalamanTab.tsx
│       ├── AsesmenTab.tsx
│       ├── LampiranTab.tsx
│       └── RPPLivePreview.tsx
├── lib/
│   ├── utils.ts              # cn() helper
│   ├── docx-export.ts        # DOCX generation engine
│   └── validation.ts         # Form validation
├── types/
│   └── rpp.ts                # TypeScript types + defaults
└── package.json
```

## Official 8 DPL (Dimensi Profil Lulusan)

1. Beriman, bertakwa kepada Tuhan Yang Maha Esa, dan berakhlak mulia
2. Berkebinekaan global
3. Bergotong royong
4. Mandiri
5. Bernalar kritis
6. Kreatif
7. Cinta lingkungan
8. Sehat jasmani dan rohani

## License

MIT
