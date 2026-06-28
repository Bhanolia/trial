"use client";

import {
  Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType,
  AlignmentType, BorderStyle, TextRun, VerticalAlign,
  convertInchesToTwip
} from "docx";
import { saveAs } from "file-saver";
import { RPPData } from "@/types/rpp";

interface CellOptions {
  bold?: boolean;
  align?: AlignmentType;
  size?: number;
  width?: number;
  colSpan?: number;
  rowSpan?: number;
  shading?: string;
}

const DEFAULT_BORDER = {
  top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
  bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
  left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
  right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
};

function createCell(text: string, options: CellOptions = {}): TableCell {
  return new TableCell({
    children: [new Paragraph({
      children: [new TextRun({ text, bold: options.bold, size: options.size || 20 })],
      alignment: options.align || AlignmentType.LEFT,
    })],
    width: options.width ? { size: options.width, type: WidthType.PERCENTAGE } : undefined,
    columnSpan: options.colSpan,
    rowSpan: options.rowSpan,
    verticalAlign: VerticalAlign.CENTER,
    borders: DEFAULT_BORDER,
    shading: options.shading ? { fill: options.shading } : undefined,
  });
}

function createMultiLineCell(lines: string[], options: CellOptions = {}): TableCell {
  return new TableCell({
    children: lines.map(line => new Paragraph({
      children: [new TextRun({ text: line, size: options.size || 20 })],
      spacing: { after: 100 },
    })),
    width: options.width ? { size: options.width, type: WidthType.PERCENTAGE } : undefined,
    columnSpan: options.colSpan,
    rowSpan: options.rowSpan,
    verticalAlign: VerticalAlign.CENTER,
    borders: DEFAULT_BORDER,
    shading: options.shading ? { fill: options.shading } : undefined,
  });
}

function createEmptyCell(options: CellOptions = {}): TableCell {
  return new TableCell({
    children: [new Paragraph({ children: [new TextRun("")] })],
    verticalAlign: VerticalAlign.CENTER,
    borders: DEFAULT_BORDER,
    columnSpan: options.colSpan,
    rowSpan: options.rowSpan,
    shading: options.shading ? { fill: options.shading } : undefined,
  });
}

function createEmptyParagraphCell(options: CellOptions = {}): TableCell {
  return new TableCell({
    children: [new Paragraph({ spacing: { before: 600, after: 600 }, children: [new TextRun("")] })],
    verticalAlign: VerticalAlign.CENTER,
    borders: DEFAULT_BORDER,
    columnSpan: options.colSpan,
    rowSpan: options.rowSpan,
  });
}

function createSignatureCell(name: string): TableCell {
  return new TableCell({
    children: [
      new Paragraph({ spacing: { before: 600, after: 600 }, children: [new TextRun("")] }),
      new Paragraph({
        children: [new TextRun({ text: name || "_________________", size: 20 })],
        alignment: AlignmentType.CENTER,
      }),
    ],
    verticalAlign: VerticalAlign.CENTER,
    borders: DEFAULT_BORDER,
  });
}

// Helper to create section label cell (repeated or empty)
function sectionLabel(text: string, firstRow: boolean = true): TableCell {
  if (firstRow) {
    return createCell(text, { bold: true, shading: "F3F4F6" });
  }
  return createEmptyCell({ shading: "F3F4F6" });
}

export async function exportToDocx(data: RPPData) {
  const rows: TableRow[] = [];

  // Title rows (single column spanning all)
  rows.push(new TableRow({
    children: [createCell("RENCANA PELAKSANAAN PEMBELAJARAN", { bold: true, align: AlignmentType.CENTER, shading: "E0E7FF" })],
  }));
  rows.push(new TableRow({
    children: [createCell("DEEP LEARNING", { bold: true, align: AlignmentType.CENTER, shading: "E0E7FF" })],
  }));

  // ============================================
  // IDENTITAS (5 rows, 10 columns each)
  // Col structure: [label(1)] [field(2)] [sep(1)] [value(6)]
  // Total: 1+2+1+6 = 10
  // ============================================
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTITAS", true),
      createCell("Nama Satuan Pendidikan", { colSpan: 2 }),
      createCell(":"),
      createCell(data.identitas.satuanPendidikan, { colSpan: 6 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTITAS", false),
      createCell("Mata Pelajaran", { colSpan: 2 }),
      createCell(":"),
      createCell(data.identitas.mataPelajaran, { colSpan: 6 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTITAS", false),
      createCell("Nama Guru", { colSpan: 2 }),
      createCell(":"),
      createCell(data.identitas.namaGuru, { colSpan: 6 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTITAS", false),
      createCell("Kelas/ semester", { colSpan: 2 }),
      createCell(":"),
      createCell(data.identitas.kelasSemester, { colSpan: 6 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTITAS", false),
      createCell("Alokasi Waktu", { colSpan: 2 }),
      createCell(":"),
      createCell(data.identitas.alokasiWaktu, { colSpan: 6 }),
    ],
  }));

  // ============================================
  // IDENTIFIKASI (19 rows)
  // ============================================
  // Header row
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", true),
      createCell("KARAKTERISTIK PESERTA DIDIK", { bold: true, colSpan: 9, shading: "E0E7FF" }),
    ],
  }));

  // Kesiapan Belajar (2 rows)
  // Row 1: [label] [Kesiapan Belajar rowSpan=2] [Belum Siap colSpan=3] [Siap colSpan=3] [Sangat Siap colSpan=2]
  // Total: 1+1+3+3+2 = 10
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Kesiapan Belajar", { rowSpan: 2 }),
      createCell("Belum Siap", { colSpan: 3 }),
      createCell("Siap", { colSpan: 3 }),
      createCell("Sangat Siap", { colSpan: 2 }),
    ],
  }));
  // Row 2: [label] [Kesiapan rowSpan] [empty colSpan=3] [deskripsi colSpan=3] [. colSpan=2]
  // The Kesiapan cell is rowSpan=2, so it's already there. We don't include it.
  // Total: 1 + 3 + 3 + 2 = 9... wait, need 10. The rowSpan'd cell counts as 1.
  // So: 1(label) + 1(rowSpan'd Kesiapan, implicit) + 3 + 3 + 2 = 10? No, the rowSpan'd cell is NOT in this row's children.
  // The library handles it. We just provide: [label] [empty colSpan=3] [deskripsi colSpan=3] [. colSpan=2]
  // That's 1+3+3+2 = 9 cells. But the table has 10 columns total.
  // The missing cell is the rowSpan'd one. The library fills it in.
  // So total = 10. ✓
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("", { colSpan: 3 }),
      createCell(data.identifikasi.karakteristikPeserta.kesiapanBelajar.deskripsi, { colSpan: 3 }),
      createCell(".", { colSpan: 2 }),
    ],
  }));

  // Minat (2 rows)
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Minat", { rowSpan: 2 }),
      createCell("Teknik", { colSpan: 3 }),
      createCell("Sains/Kedokteran", { colSpan: 3 }),
      createCell("Humaniora", { colSpan: 2 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell(data.identifikasi.karakteristikPeserta.minat.deskripsi, { colSpan: 3 }),
      createCell("", { colSpan: 3 }),
      createCell("", { colSpan: 2 }),
    ],
  }));

  // Bakat (2 rows)
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Bakat", { rowSpan: 2 }),
      createCell("", { colSpan: 3 }),
      createCell("", { colSpan: 3 }),
      createCell("", { colSpan: 2 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("", { colSpan: 3 }),
      createCell(data.identifikasi.karakteristikPeserta.bakat.deskripsi, { colSpan: 3 }),
      createCell("", { colSpan: 2 }),
    ],
  }));

  // Profil Belajar (2 rows)
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Profil Belajar", { rowSpan: 2 }),
      createCell("Visual", { colSpan: 3 }),
      createCell("Auditori", { colSpan: 3 }),
      createCell("Kinestetik", { colSpan: 2 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("", { colSpan: 3 }),
      createCell("", { colSpan: 3 }),
      createCell(data.identifikasi.karakteristikPeserta.profilBelajar.deskripsi, { colSpan: 2 }),
    ],
  }));

  // KARAKTERISTIK MATA PELAJARAN header
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("KARAKTERISTIK MATA PELAJARAN", { bold: true, colSpan: 9, shading: "E0E7FF" }),
    ],
  }));

  // Mapel rows: [label] [field] [value colSpan=8]
  // Total: 1+1+8 = 10
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Jenis pengetahuan"),
      createMultiLineCell(data.identifikasi.karakteristikMapel.jenisPengetahuan.map((p, i) => `${i + 1}. ${p}`), { colSpan: 8 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Relevansi"),
      createMultiLineCell(data.identifikasi.karakteristikMapel.relevansi.map((r, i) => `${i + 1}. ${r}`), { colSpan: 8 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Tingkat kesulitan"),
      createCell(data.identifikasi.karakteristikMapel.tingkatKesulitan, { colSpan: 8 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Struktur Materi"),
      createCell(data.identifikasi.karakteristikMapel.strukturMateri, { colSpan: 8 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Integrasi Nilai"),
      createMultiLineCell(data.identifikasi.karakteristikMapel.integrasiNilai.map((n, i) => `${i + 1}. ${n}`), { colSpan: 8 }),
    ],
  }));

  // ============================================
  // DPL (Dimensi Profil Lulusan)
  // Template structure: 2-column layout with DPL labels
  // ============================================
  const checkedDPL = data.identifikasi.dimensiProfilLulusan.filter(d => d.checked);
  const uncheckedDPL = data.identifikasi.dimensiProfilLulusan.filter(d => !d.checked);

  // Calculate rows needed
  const checkedRows = checkedDPL.length > 0 ? Math.ceil(checkedDPL.length / 2) : 1;
  const uncheckedHeaderRow = uncheckedDPL.length > 0 ? 1 : 0;
  const uncheckedRows = uncheckedDPL.length > 0 ? Math.ceil(uncheckedDPL.length / 2) : 0;
  const dplTotalRows = 1 + checkedRows + uncheckedHeaderRow + uncheckedRows; // header + checked + "DPL lainnya" + unchecked

  // DPL Header row: [label rowSpan] [empty] [DPL yang dicapai header colSpan=8]
  // Total: 1+1+8 = 10
  rows.push(new TableRow({
    children: [
      createCell("Dimensi Profil Lulusan", { bold: true, rowSpan: dplTotalRows, shading: "F3F4F6" }),
      createCell(""),
      createCell("DPL yang dicapai:", { bold: true, colSpan: 8, shading: "E0E7FF" }),
    ],
  }));

  // Checked DPL in 2-column layout: [empty] [DPL left colSpan=4] [DPL right colSpan=4]
  // Total: 1+4+4 = 9... need 10. Add empty cell at start? No, the section label is rowSpan'd.
  // Actually: [section label rowSpan'd] [empty] [left colSpan=4] [right colSpan=4]
  // The section label takes 1, so: 1 + 1 + 4 + 4 = 10 ✓
  if (checkedDPL.length > 0) {
    for (let i = 0; i < checkedDPL.length; i += 2) {
      rows.push(new TableRow({
        children: [
          createCell(""),
          createCell(`[v] ${checkedDPL[i].label}`, { colSpan: 4 }),
          createCell(checkedDPL[i + 1] ? `[v] ${checkedDPL[i + 1].label}` : "", { colSpan: 4 }),
        ],
      }));
    }
  } else {
    rows.push(new TableRow({
      children: [
        createCell(""),
        createCell("(Tidak ada DPL yang dicentang)", { colSpan: 8, align: AlignmentType.CENTER }),
      ],
    }));
  }

  // Unchecked DPL header
  if (uncheckedDPL.length > 0) {
    rows.push(new TableRow({
      children: [
        createCell(""),
        createCell("DPL lainnya:", { bold: true, colSpan: 8, shading: "F3F4F6" }),
      ],
    }));
    for (let i = 0; i < uncheckedDPL.length; i += 2) {
      rows.push(new TableRow({
        children: [
          createCell(""),
          createCell(`[ ] ${uncheckedDPL[i].label}`, { colSpan: 4 }),
          createCell(uncheckedDPL[i + 1] ? `[ ] ${uncheckedDPL[i + 1].label}` : "", { colSpan: 4 }),
        ],
      }));
    }
  }

  // ============================================
  // DESAIN PEMBELAJARAN (15 rows)
  // ============================================
  // Row 1: [label] [Capaian Pembelajaran] [value colSpan=8]
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", true),
      createCell("Capaian Pembelajaran"),
      createCell(data.desain.capaianPembelajaran, { colSpan: 8 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Lintas Disiplin Ilmu"),
      createCell(data.desain.lintasDisiplin, { colSpan: 8 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Tujuan Pembelajaran"),
      createMultiLineCell(data.desain.tujuanPembelajaran.map((t, i) => `${i + 1}. ${t}`), { colSpan: 8 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Topik Pembelajaran"),
      createCell(data.desain.topik, { colSpan: 8 }),
    ],
  }));

  // Model & Metode: 2-column layout
  // [label] [Model Pembelajaran colSpan=4] [value colSpan=4]
  // Total: 1+4+4 = 9... need 10. 
  // Actually: [section label] [field label colSpan=4] [value colSpan=4] = 1+4+4 = 9. Missing 1.
  // Let me use: [section label] [field colSpan=3] [value colSpan=5] = 1+3+5 = 9. Still missing.
  // Or: [section label] [field colSpan=2] [value colSpan=6] = 1+2+6 = 9.
  // Hmm, 1+4+4 = 9, but we need 10. Where's the missing 1?
  // Oh wait, the section label is 1 column. Then field + value = 9 more. Total = 10.
  // 1+4+4 = 9. I need 1+4+5 = 10 or 1+5+4 = 10.
  // Let me use: [section label] [field colSpan=4] [value colSpan=5] = 10 ✓
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Model Pembelajaran", { colSpan: 4 }),
      createCell(data.desain.modelPembelajaran, { colSpan: 5 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Metode Pembelajaran", { colSpan: 4 }),
      createCell(data.desain.metodePembelajaran, { colSpan: 5 }),
    ],
  }));

  // Kemitraan (3 rows)
  // [label] [Kemitraan rowSpan=3] [Lingkungan Sekolah colSpan=4] [value colSpan=4]
  // Total: 1+1+4+4 = 10 ✓
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Kemitraan Pembelajaran", { rowSpan: 3 }),
      createCell("Lingkungan Sekolah", { colSpan: 4 }),
      createCell(data.desain.kemitraan.sekolah, { colSpan: 4 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Lingkungan Luar Sekolah", { colSpan: 4 }),
      createCell(data.desain.kemitraan.luarSekolah, { colSpan: 4 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Masyarakat", { colSpan: 4 }),
      createCell(data.desain.kemitraan.masyarakat, { colSpan: 4 }),
    ],
  }));

  // Lingkungan (3 rows)
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Lingkungan Pembelajaran", { rowSpan: 3 }),
      createCell("Budaya Belajar", { colSpan: 4 }),
      createCell(data.desain.lingkungan.budaya, { colSpan: 4 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Optimalisasi Ruang Fisik", { colSpan: 4 }),
      createCell(data.desain.lingkungan.fisik, { colSpan: 4 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Pemanfaatan Ruang Virtual", { colSpan: 4 }),
      createCell(data.desain.lingkungan.virtual, { colSpan: 4 }),
    ],
  }));

  // Digital (3 rows)
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Pemanfaatan Digital", { rowSpan: 3 }),
      createCell("Perencanaan", { colSpan: 4 }),
      createCell(data.desain.digital.perencanaan, { colSpan: 4 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Pelaksanaan", { colSpan: 4 }),
      createCell(data.desain.digital.pelaksanaan, { colSpan: 4 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Asesmen", { colSpan: 4 }),
      createCell(data.desain.digital.asesmen, { colSpan: 4 }),
    ],
  }));

  // ============================================
  // PENGALAMAN BELAJAR (10 rows)
  // ============================================
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", true),
      createCell("Langkah Pembelajaran", { bold: true, colSpan: 9, shading: "E0E7FF" }),
    ],
  }));

  // Awal (3 rows)
  // Row 1: [label] [Awal rowSpan=3] [Prinsip rowSpan=2] [Mindful colSpan=3] [Meaningful colSpan=3] [Joyful colSpan=2]
  // Total: 1+1+1+3+3+2 = 11... too many. Let me recalculate.
  // We have 10 columns total. Section label = 1. Remaining = 9.
  // Awal + Prinsip + Mindful + Meaningful + Joyful = 5 cells for 9 columns.
  // If Awal=1, Prinsip=1, then Mindful+Meaningful+Joyful = 7 columns.
  // Template: Mindful(colSpan=5) + Meaningful(colSpan=3) + Joyful(colSpan=1) = 9 for content
  // With section label: 1 + 5 + 3 + 1 = 10. But where do Awal and Prinsip go?
  // They need to be in the content area too.
  // Let me use: [section] [Awal rowSpan=3] [Prinsip rowSpan=2] [Mindful colSpan=3] [Meaningful colSpan=2] [Joyful colSpan=2]
  // Total: 1+1+1+3+2+2 = 10 ✓
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createCell("Awal", { rowSpan: 3 }),
      createCell("Prinsip Pembelajaran", { rowSpan: 2 }),
      createCell("Mindful (Berkesadaran)", { colSpan: 3 }),
      createCell("Meaningful (Bermakna)", { colSpan: 2 }),
      createCell("Joyful (Menyenangkan)", { colSpan: 2 }),
    ],
  }));
  // Row 2 (V marks): [section] [Awal rowSpan] [Prinsip rowSpan] [V colSpan=3] [V colSpan=2] [V colSpan=2]
  // The Awal and Prinsip cells are rowSpan'd, so they're already there.
  // We provide: [section] [Mindful V colSpan=3] [Meaningful V colSpan=2] [Joyful V colSpan=2]
  // Total: 1+3+2+2 = 8. But with rowSpan'd cells (Awal=1, Prinsip=1), total = 10 ✓
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createCell(data.pengalaman.awal.mindful ? "V" : "", { colSpan: 3, align: AlignmentType.CENTER }),
      createCell(data.pengalaman.awal.meaningful ? "V" : "", { colSpan: 2, align: AlignmentType.CENTER }),
      createCell(data.pengalaman.awal.joyful ? "V" : "", { colSpan: 2, align: AlignmentType.CENTER }),
    ],
  }));
  // Row 3 (Langkah): [section] [Awal rowSpan] [langkah colSpan=8]
  // Awal is rowSpan=3, so it's still there. We provide: [section] [langkah colSpan=8]
  // Total: 1+8 = 9. With Awal rowSpan'd (1), total = 10 ✓
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createMultiLineCell(data.pengalaman.awal.langkah.map((l, i) => `${i + 1}. ${l}`), { colSpan: 8 }),
    ],
  }));

  // Inti (3 rows)
  // [section] [Inti rowSpan=3] [Memahami] [content colSpan=7]
  // Total: 1+1+1+7 = 10 ✓
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createCell("Inti", { rowSpan: 3 }),
      createCell("Memahami"),
      createMultiLineCell(data.pengalaman.inti.memahami.map((l, i) => `${i + 1}. ${l}`), { colSpan: 7 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createCell("Mengaplikasi"),
      createMultiLineCell(data.pengalaman.inti.mengaplikasi.map((l, i) => `${i + 1}. ${l}`), { colSpan: 7 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createCell("Merefleksi"),
      createMultiLineCell(data.pengalaman.inti.merefleksi.map((l, i) => `${i + 1}. ${l}`), { colSpan: 7 }),
    ],
  }));

  // Penutup (3 rows) - same structure as Awal
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createCell("Penutup", { rowSpan: 3 }),
      createCell("Prinsip Pembelajaran", { rowSpan: 2 }),
      createCell("Mindful (Berkesadaran)", { colSpan: 3 }),
      createCell("Meaningful (Bermakna)", { colSpan: 2 }),
      createCell("Joyful (Menyenangkan)", { colSpan: 2 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createCell(data.pengalaman.penutup.mindful ? "V" : "", { colSpan: 3, align: AlignmentType.CENTER }),
      createCell(data.pengalaman.penutup.meaningful ? "V" : "", { colSpan: 2, align: AlignmentType.CENTER }),
      createCell(data.pengalaman.penutup.joyful ? "V" : "", { colSpan: 2, align: AlignmentType.CENTER }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createMultiLineCell(data.pengalaman.penutup.langkah.map((l, i) => `${i + 1}. ${l}`), { colSpan: 8 }),
    ],
  }));

  // ============================================
  // ASESMEN (3 rows)
  // ============================================
  rows.push(new TableRow({
    children: [
      sectionLabel("ASESMEN", true),
      createCell("Asesmen Awal"),
      createCell(data.asesmen.awal, { colSpan: 8 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("ASESMEN", false),
      createCell("Asesmen Proses"),
      createCell(data.asesmen.proses, { colSpan: 8 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("ASESMEN", false),
      createCell("Asesmen Akhir"),
      createCell(data.asesmen.akhir, { colSpan: 8 }),
    ],
  }));

  const table = new Table({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE },
  });

  const doc = new Document({
    sections: [{
      properties: {
        page: { margin: { top: convertInchesToTwip(0.5), right: convertInchesToTwip(0.5), bottom: convertInchesToTwip(0.5), left: convertInchesToTwip(0.5) } },
      },
      children: [
        new Paragraph({ children: [new TextRun({ text: "RENCANA PELAKSANAAN PEMBELAJARAN", bold: true, size: 28 })], alignment: AlignmentType.CENTER, spacing: { after: 200 } }),
        new Paragraph({ children: [new TextRun({ text: "DEEP LEARNING", bold: true, size: 24 })], alignment: AlignmentType.CENTER, spacing: { after: 400 } }),
        table,
        new Paragraph({ spacing: { before: 400 } }),
        new Paragraph({ children: [new TextRun({ text: "Lampiran", bold: true, size: 22 })], spacing: { after: 200 } }),
        new Paragraph({ children: [new TextRun({ text: "1. Rubrik penilaian observasi sikap", bold: true, size: 20 })], spacing: { after: 100 } }),
        new Table({
          rows: [
            new TableRow({ children: [createCell("Aspek", { bold: true, shading: "E0E7FF" }), createCell("Indikator", { bold: true, shading: "E0E7FF" }), createCell("Skor 4", { bold: true, shading: "E0E7FF" }), createCell("Skor 3", { bold: true, shading: "E0E7FF" }), createCell("Skor 2", { bold: true, shading: "E0E7FF" }), createCell("Skor 1", { bold: true, shading: "E0E7FF" })] }),
            ...data.lampiran.rubrikSikap.map(r => new TableRow({ children: [createCell(r.aspek, { bold: true }), createCell(r.indikator), createCell(r.skor4), createCell(r.skor3), createCell(r.skor2), createCell(r.skor1)] })),
          ],
          width: { size: 100, type: WidthType.PERCENTAGE },
        }),
        new Paragraph({ spacing: { before: 200 } }),
        new Paragraph({ children: [new TextRun({ text: `2. Jobsheet: ${data.lampiran.jobsheet}`, size: 20 })] }),
        new Paragraph({ spacing: { before: 200 } }),
        new Paragraph({ children: [new TextRun({ text: "3. Rubrik penilaian presentasi", bold: true, size: 20 })] }),
        new Paragraph({ spacing: { before: 400 } }),
        new Paragraph({ children: [new TextRun({ text: `${data.tempat}, ${data.tanggal}`, size: 20 })], alignment: AlignmentType.RIGHT }),
        new Paragraph({ spacing: { before: 400 } }),
        new Table({
          rows: [
            new TableRow({ children: [createCell("Kepala Sekolah", { align: AlignmentType.CENTER }), createCell("Kurikulum", { align: AlignmentType.CENTER }), createCell("Guru", { align: AlignmentType.CENTER })] }),
            new TableRow({ children: [createEmptyParagraphCell(), createEmptyParagraphCell(), createEmptyParagraphCell()] }),
            new TableRow({ children: [createSignatureCell(data.lampiran.penandatangan.kepalaSekolah), createSignatureCell(data.lampiran.penandatangan.kurikulum), createSignatureCell(data.lampiran.penandatangan.guru)] }),
          ],
          width: { size: 100, type: WidthType.PERCENTAGE },
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  const filename = `RPP_${(data.identitas.mataPelajaran || "Dokumen").replace(/[^a-zA-Z0-9]/g, "_")}_${data.identitas.kelasSemester.replace(/\s/g, "_")}.docx`;
  saveAs(blob, filename);
}
