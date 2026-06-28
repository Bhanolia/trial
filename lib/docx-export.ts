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

function createSignatureCell(name: string, nip: string): TableCell {
  return new TableCell({
    children: [
      new Paragraph({ spacing: { before: 600, after: 100 }, children: [new TextRun("")] }),
      new Paragraph({
        children: [new TextRun({ text: name || "_________________", size: 20 })],
        alignment: AlignmentType.CENTER,
      }),
      new Paragraph({
        children: [new TextRun({ text: nip ? "NIP. " + nip : "NIP. _________________", size: 18 })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 100 },
      }),
    ],
    verticalAlign: VerticalAlign.CENTER,
    borders: DEFAULT_BORDER,
  });
}

// Helper for section labels that repeat across rows
function sectionLabel(text: string, firstRow: boolean = true): TableCell {
  if (firstRow) {
    return createCell(text, { bold: true, shading: "F3F4F6" });
  }
  return createEmptyCell({ shading: "F3F4F6" });
}

export async function exportToDocx(data: RPPData) {
  const rows: TableRow[] = [];

  // ============================================
  // TITLE ROWS - Single merged cells spanning all 14 columns
  // ============================================
  rows.push(new TableRow({
    children: [createCell("RENCANA PELAKSANAAN PEMBELAJARAN", { bold: true, align: AlignmentType.CENTER, shading: "E0E7FF", colSpan: 14 })],
  }));
  rows.push(new TableRow({
    children: [createCell("DEEP LEARNING", { bold: true, align: AlignmentType.CENTER, shading: "E0E7FF", colSpan: 14 })],
  }));

  // ============================================
  // IDENTITAS (5 rows, 14 columns each)
  // Structure: [label(1)] [field(3)] [sep(2)] [value(8)]
  // Total: 1+3+2+8 = 14
  // ============================================
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTITAS", true),
      createCell("Nama Satuan Pendidikan", { colSpan: 3 }),
      createCell(":", { colSpan: 2, align: AlignmentType.CENTER }),
      createCell(data.identitas.satuanPendidikan, { colSpan: 8 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTITAS", false),
      createCell("Mata Pelajaran", { colSpan: 3 }),
      createCell(":", { colSpan: 2, align: AlignmentType.CENTER }),
      createCell(data.identitas.mataPelajaran, { colSpan: 8 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTITAS", false),
      createCell("Nama Guru", { colSpan: 3 }),
      createCell(":", { colSpan: 2, align: AlignmentType.CENTER }),
      createCell(data.identitas.namaGuru, { colSpan: 8 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTITAS", false),
      createCell("Kelas/ semester", { colSpan: 3 }),
      createCell(":", { colSpan: 2, align: AlignmentType.CENTER }),
      createCell(data.identitas.kelasSemester, { colSpan: 8 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTITAS", false),
      createCell("Alokasi Waktu", { colSpan: 3 }),
      createCell("", { colSpan: 2 }),
      createCell(data.identitas.alokasiWaktu, { colSpan: 8 }),
    ],
  }));

  // ============================================
  // IDENTIFIKASI (19 rows)
  // ============================================
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", true),
      createCell("KARAKTERISTIK PESERTA DIDIK", { bold: true, colSpan: 13, shading: "E0E7FF" }),
    ],
  }));

  // Kesiapan Belajar (2 rows)
  // [label(1)] [Kesiapan(1) rowSpan=2] [Belum Siap(6)] [Siap(5)] [Sangat Siap(1)]
  // Total: 1+1+6+5+1 = 14
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Kesiapan Belajar", { rowSpan: 2 }),
      createCell("Belum Siap", { colSpan: 6 }),
      createCell("Siap", { colSpan: 5 }),
      createCell("Sangat Siap", { colSpan: 1 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("", { colSpan: 6 }),
      createCell(data.identifikasi.karakteristikPeserta.kesiapanBelajar.deskripsi, { colSpan: 5 }),
      createCell(".", { colSpan: 1 }),
    ],
  }));

  // Minat (2 rows)
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Minat", { rowSpan: 2 }),
      createCell("Teknik", { colSpan: 6 }),
      createCell("Sains/Kedokteran", { colSpan: 5 }),
      createCell("Humaniora", { colSpan: 1 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell(data.identifikasi.karakteristikPeserta.minat.deskripsi, { colSpan: 6 }),
      createCell("", { colSpan: 5 }),
      createCell("", { colSpan: 1 }),
    ],
  }));

  // Bakat (2 rows)
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Bakat", { rowSpan: 2 }),
      createCell("", { colSpan: 6 }),
      createCell("", { colSpan: 5 }),
      createCell("", { colSpan: 1 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("", { colSpan: 6 }),
      createCell(data.identifikasi.karakteristikPeserta.bakat.deskripsi, { colSpan: 5 }),
      createCell("", { colSpan: 1 }),
    ],
  }));

  // Profil Belajar (2 rows)
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Profil Belajar", { rowSpan: 2 }),
      createCell("Visual", { colSpan: 6 }),
      createCell("Auditori", { colSpan: 5 }),
      createCell("Kinestetik", { colSpan: 1 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("", { colSpan: 6 }),
      createCell("", { colSpan: 5 }),
      createCell(data.identifikasi.karakteristikPeserta.profilBelajar.deskripsi, { colSpan: 1 }),
    ],
  }));

  // KARAKTERISTIK MATA PELAJARAN header
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("KARAKTERISTIK MATA PELAJARAN", { bold: true, colSpan: 13, shading: "E0E7FF" }),
    ],
  }));

  // Mapel rows: [label(1)] [field(1)] [value(12)]
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Jenis pengetahuan yang akan dicapai"),
      createMultiLineCell(data.identifikasi.karakteristikMapel.jenisPengetahuan.map((p, i) => `${i + 1}. ${p}`), { colSpan: 12 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Relevansi dengan kehidupan nyata peserta didik"),
      createMultiLineCell(data.identifikasi.karakteristikMapel.relevansi.map((r, i) => `${i + 1}. ${r}`), { colSpan: 12 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Tingkat kesulitan"),
      createCell(data.identifikasi.karakteristikMapel.tingkatKesulitan, { colSpan: 12 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Struktur Materi"),
      createCell(data.identifikasi.karakteristikMapel.strukturMateri, { colSpan: 12 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("IDENTIFIKASI", false),
      createCell("Integrasi Nilai dan karakter"),
      createMultiLineCell(data.identifikasi.karakteristikMapel.integrasiNilai.map((n, i) => `${i + 1}. ${n}`), { colSpan: 12 }),
    ],
  }));

  // ============================================
  // DPL (Dimensi Profil Lulusan) - Match Template exactly
  // Template structure: 4 rows, 2 DPLs per row
  // [label(1) rowSpan=4] [empty(1)] [DPL left(8)] [check(1)] [DPL right(3)]
  // Total: 1+1+8+1+3 = 14
  // ============================================
  const allDPL = data.identifikasi.dimensiProfilLulusan;

  rows.push(new TableRow({
    children: [
      createCell("Dimensi Profil Lulusan", { bold: true, rowSpan: 4, shading: "F3F4F6" }),
      createCell(""),
      createCell(`DPL 1\n${allDPL[0]?.label || "Beriman, bertakwa kepada Tuhan Yang Maha Esa, dan berakhlak mulia"}`, { colSpan: 8 }),
      createCell(allDPL[0]?.checked ? "√" : "", { align: AlignmentType.CENTER }),
      createCell(`DPL 5\n${allDPL[4]?.label || "Bernalar kritis"}`, { colSpan: 3 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell(""),
      createCell(`DPL 2\n${allDPL[1]?.label || "Berkebinekaan global"}`, { colSpan: 8 }),
      createCell(allDPL[1]?.checked ? "√" : "", { align: AlignmentType.CENTER }),
      createCell(`DPL 6\n${allDPL[5]?.label || "Kreatif"}`, { colSpan: 3 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell(""),
      createCell(`DPL 3\n${allDPL[2]?.label || "Bergotong royong"}`, { colSpan: 8 }),
      createCell(allDPL[2]?.checked ? "√" : "", { align: AlignmentType.CENTER }),
      createCell(`DPL 7\n${allDPL[6]?.label || "Cinta lingkungan"}`, { colSpan: 3 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell(""),
      createCell(`DPL 4\n${allDPL[3]?.label || "Mandiri"}`, { colSpan: 8 }),
      createCell(allDPL[3]?.checked ? "√" : "", { align: AlignmentType.CENTER }),
      createCell(`DPL 8\n${allDPL[7]?.label || "Sehat jasmani dan rohani"}`, { colSpan: 3 }),
    ],
  }));

  // ============================================
  // DESAIN PEMBELAJARAN (15 rows)
  // ============================================
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", true),
      createCell("Capaian Pembelajaran"),
      createCell(data.desain.capaianPembelajaran, { colSpan: 12 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Lintas Disiplin Ilmu"),
      createCell(data.desain.lintasDisiplin, { colSpan: 12 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Tujuan Pembelajaran"),
      createMultiLineCell(data.desain.tujuanPembelajaran.map((t, i) => `${i + 1}. ${t}`), { colSpan: 12 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Topik Pembelajaran"),
      createCell(data.desain.topik, { colSpan: 12 }),
    ],
  }));

  // Praktik Pedagogis (2 rows)
  // [label(1)] [Praktik Pedagogis(1) rowSpan=2] [Model Pembelajaran(5)] [value(7)]
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Praktik Pedagogis", { rowSpan: 2 }),
      createCell("Model Pembelajaran", { colSpan: 5 }),
      createCell(data.desain.modelPembelajaran, { colSpan: 7 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Metode Pembelajaran", { colSpan: 5 }),
      createCell(data.desain.metodePembelajaran, { colSpan: 7 }),
    ],
  }));

  // Kemitraan Pembelajaran (3 rows)
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Kemitraan Pembelajaran", { rowSpan: 3 }),
      createCell("Lingkungan Sekolah", { colSpan: 5 }),
      createCell(data.desain.kemitraan.sekolah, { colSpan: 7 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Lingkungan Luar Sekolah", { colSpan: 5 }),
      createCell(data.desain.kemitraan.luarSekolah, { colSpan: 7 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Masyarakat", { colSpan: 5 }),
      createCell(data.desain.kemitraan.masyarakat, { colSpan: 7 }),
    ],
  }));

  // Lingkungan Pembelajaran (3 rows)
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Lingkungan Pembelajaran", { rowSpan: 3 }),
      createCell("Budaya Belajar", { colSpan: 5 }),
      createCell(data.desain.lingkungan.budaya, { colSpan: 7 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Optimalisasi Ruang Fisik", { colSpan: 5 }),
      createCell(data.desain.lingkungan.fisik, { colSpan: 7 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Pemanfaatan Ruang Virtual", { colSpan: 5 }),
      createCell(data.desain.lingkungan.virtual, { colSpan: 7 }),
    ],
  }));

  // Pemanfaatan Digital (3 rows)
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Pemanfaatan Digital", { rowSpan: 3 }),
      createCell("Perencanaan Pembelajaran", { colSpan: 5 }),
      createCell(data.desain.digital.perencanaan, { colSpan: 7 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Pelaksanaan Pembelajaran", { colSpan: 5 }),
      createCell(data.desain.digital.pelaksanaan, { colSpan: 7 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("DESAIN PEMBELAJARAN", false),
      createCell("Asesmen Pembelajaran", { colSpan: 5 }),
      createCell(data.desain.digital.asesmen, { colSpan: 7 }),
    ],
  }));

  // ============================================
  // PENGALAMAN BELAJAR (10 rows)
  // ============================================
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", true),
      createCell("Langkah Pembelajaran", { bold: true, colSpan: 13, shading: "E0E7FF" }),
    ],
  }));

  // Awal (3 rows)
  // Row 1: [label(1)] [Awal(1) rowSpan=3] [Prinsip(3) rowSpan=2] [Mindful(5)] [Meaningful(3)] [Joyful(1)]
  // Total: 1+1+3+5+3+1 = 14
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createCell("Awal", { rowSpan: 3 }),
      createCell("Prinsip Pembelajaran", { rowSpan: 2, colSpan: 3 }),
      createCell("Mindful\n(Berkesadaran)", { colSpan: 5 }),
      createCell("Meaningful\n(Bermakna)", { colSpan: 3 }),
      createCell("Joyful\n(Menyenangkan)", { colSpan: 1 }),
    ],
  }));
  // Row 2 (V marks): [label(1)] [Awal rowSpan] [Prinsip rowSpan] [V(5)] [empty(3)] [V(1)]
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createCell(data.pengalaman.awal.mindful ? "V" : "", { colSpan: 5, align: AlignmentType.CENTER }),
      createCell(data.pengalaman.awal.meaningful ? "V" : "", { colSpan: 3, align: AlignmentType.CENTER }),
      createCell(data.pengalaman.awal.joyful ? "V" : "", { colSpan: 1, align: AlignmentType.CENTER }),
    ],
  }));
  // Row 3 (Langkah): [label(1)] [Awal rowSpan] [content(12)]
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createMultiLineCell(data.pengalaman.awal.langkah.map((l, i) => `${i + 1}. ${l}`), { colSpan: 12 }),
    ],
  }));

  // Inti (3 rows)
  // [label(1)] [Inti(1) rowSpan=3] [Memahami(3)] [content(9)]
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createCell("Inti", { rowSpan: 3 }),
      createCell("Memahami", { colSpan: 3 }),
      createMultiLineCell(data.pengalaman.inti.memahami.map((l, i) => `${i + 1}. ${l}`), { colSpan: 9 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createCell("Mengaplikasi", { colSpan: 3 }),
      createMultiLineCell(data.pengalaman.inti.mengaplikasi.map((l, i) => `${i + 1}. ${l}`), { colSpan: 9 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createCell("Merefleksi", { colSpan: 3 }),
      createMultiLineCell(data.pengalaman.inti.merefleksi.map((l, i) => `${i + 1}. ${l}`), { colSpan: 9 }),
    ],
  }));

  // Penutup (3 rows) - same structure as Awal
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createCell("Penutup", { rowSpan: 3 }),
      createCell("Prinsip Pembelajaran", { rowSpan: 2, colSpan: 3 }),
      createCell("Mindful\n(Berkesadaran)", { colSpan: 4 }),
      createCell("Meaningful\n(Bermakna)", { colSpan: 4 }),
      createCell("Joyful\n(Menyenangkan)", { colSpan: 1 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createCell(data.pengalaman.penutup.mindful ? "V" : "", { colSpan: 4, align: AlignmentType.CENTER }),
      createCell(data.pengalaman.penutup.meaningful ? "V" : "", { colSpan: 4, align: AlignmentType.CENTER }),
      createCell(data.pengalaman.penutup.joyful ? "V" : "", { colSpan: 1, align: AlignmentType.CENTER }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("PENGALAMAN BELAJAR", false),
      createMultiLineCell(data.pengalaman.penutup.langkah.map((l, i) => `${i + 1}. ${l}`), { colSpan: 12 }),
    ],
  }));

  // ============================================
  // ASESMEN (3 rows)
  // ============================================
  rows.push(new TableRow({
    children: [
      sectionLabel("ASESMEN", true),
      createCell("Asesmen pada Awal Pembelajaran"),
      createCell(data.asesmen.awal, { colSpan: 12 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("ASESMEN", false),
      createCell("Asesmen pada Proses Pembelajaran"),
      createCell(data.asesmen.proses, { colSpan: 12 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      sectionLabel("ASESMEN", false),
      createCell("Asesmen pada Akhir Pembelajaran"),
      createCell(data.asesmen.akhir, { colSpan: 12 }),
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
        new Paragraph({ children: [new TextRun({ text: "1. Rubrik penilaian observasi sikap selama proses diskusi dan mengerjakan tugas praktik", bold: true, size: 20 })], spacing: { after: 100 } }),
        new Table({
          rows: [
            new TableRow({ children: [createCell("Aspek", { bold: true, shading: "E0E7FF" }), createCell("Indikator", { bold: true, shading: "E0E7FF" }), createCell("Skor 4 (Sangat Baik)", { bold: true, shading: "E0E7FF" }), createCell("Skor 3 (Baik)", { bold: true, shading: "E0E7FF" }), createCell("Skor 2 (Cukup)", { bold: true, shading: "E0E7FF" }), createCell("Skor 1 (Perlu Bimbingan)", { bold: true, shading: "E0E7FF" })] }),
            ...data.lampiran.rubrikSikap.map(r => new TableRow({ children: [createCell(r.aspek, { bold: true }), createCell(r.indikator), createCell(r.skor4), createCell(r.skor3), createCell(r.skor2), createCell(r.skor1)] })),
          ],
          width: { size: 100, type: WidthType.PERCENTAGE },
        }),
        new Paragraph({ spacing: { before: 200 } }),
        new Paragraph({ children: [new TextRun({ text: `2. Joobsheet: ${data.lampiran.jobsheet}`, size: 20 })] }),
        new Paragraph({ spacing: { before: 200 } }),
        new Paragraph({ children: [new TextRun({ text: "3. Rubrik penilaian presentasi penggunaan alat", bold: true, size: 20 })] }),
        new Paragraph({ spacing: { before: 400 } }),
        new Paragraph({ children: [new TextRun({ text: `${data.tempat}, ${data.tanggal}`, size: 20 })], alignment: AlignmentType.RIGHT }),
        new Paragraph({ spacing: { before: 400 } }),
        new Table({
          rows: [
            new TableRow({ children: [createCell("Kepala Sekolah", { align: AlignmentType.CENTER }), createCell("Kurikulum", { align: AlignmentType.CENTER }), createCell("Guru", { align: AlignmentType.CENTER })] }),
            new TableRow({ children: [createEmptyParagraphCell(), createEmptyParagraphCell(), createEmptyParagraphCell()] }),
            new TableRow({ children: [
              createSignatureCell(data.lampiran.penandatangan.kepalaSekolah, data.lampiran.penandatangan.nipKepalaSekolah || ""),
              createSignatureCell(data.lampiran.penandatangan.kurikulum, data.lampiran.penandatangan.nipKurikulum || ""),
              createSignatureCell(data.lampiran.penandatangan.guru, data.lampiran.penandatangan.nipGuru || ""),
            ]}),
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
