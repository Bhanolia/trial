"use client";

import {
  Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType,
  AlignmentType, HeadingLevel, BorderStyle, TextRun, VerticalAlign,
  convertInchesToTwip, Header, Footer, PageNumber
} from "docx";
import { saveAs } from "file-saver";
import { RPPData } from "@/types/rpp";

function createCell(text: string, options: any = {}): TableCell {
  return new TableCell({
    children: [new Paragraph({
      children: [new TextRun({ text, bold: options.bold, size: options.size || 20 })],
      alignment: options.align || AlignmentType.LEFT,
    })],
    width: options.width ? { size: options.width, type: WidthType.PERCENTAGE } : undefined,
    columnSpan: options.colSpan,
    rowSpan: options.rowSpan,
    verticalAlign: VerticalAlign.CENTER,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    },
    shading: options.shading ? { fill: options.shading } : undefined,
  });
}

function createMultiLineCell(lines: string[], options: any = {}): TableCell {
  return new TableCell({
    children: lines.map(line => new Paragraph({
      children: [new TextRun({ text: line, size: options.size || 20 })],
      spacing: { after: 100 },
    })),
    width: options.width ? { size: options.width, type: WidthType.PERCENTAGE } : undefined,
    columnSpan: options.colSpan,
    rowSpan: options.rowSpan,
    verticalAlign: VerticalAlign.CENTER,
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
      right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    },
    shading: options.shading ? { fill: options.shading } : undefined,
  });
}

export async function exportToDocx(data: RPPData) {
  const rows: TableRow[] = [];

  // Title
  rows.push(new TableRow({
    children: [createCell("RENCANA PELAKSANAAN PEMBELAJARAN", { bold: true, align: AlignmentType.CENTER, shading: "E0E7FF" })],
  }));
  rows.push(new TableRow({
    children: [createCell("DEEP LEARNING", { bold: true, align: AlignmentType.CENTER, shading: "E0E7FF" })],
  }));

  // IDENTITAS
  const identitasRows = [
    new TableRow({
      children: [
        createCell("IDENTITAS", { bold: true, rowSpan: 5, shading: "F3F4F6" }),
        createCell("Nama Satuan Pendidikan"),
        createCell(":", { width: 5 }),
        createCell(data.identitas.satuanPendidikan, { colSpan: 8 }),
      ],
    }),
    new TableRow({
      children: [
        createCell("Mata Pelajaran"),
        createCell(":", { width: 5 }),
        createCell(data.identitas.mataPelajaran, { colSpan: 8 }),
      ],
    }),
    new TableRow({
      children: [
        createCell("Nama Guru"),
        createCell(":", { width: 5 }),
        createCell(data.identitas.namaGuru, { colSpan: 8 }),
      ],
    }),
    new TableRow({
      children: [
        createCell("Kelas/ semester"),
        createCell(":", { width: 5 }),
        createCell(data.identitas.kelasSemester, { colSpan: 8 }),
      ],
    }),
    new TableRow({
      children: [
        createCell("Alokasi Waktu"),
        createCell("", { width: 5 }),
        createCell(data.identitas.alokasiWaktu, { colSpan: 8 }),
      ],
    }),
  ];
  rows.push(...identitasRows);

  // IDENTIFIKASI - Karakteristik Peserta Didik
  rows.push(new TableRow({
    children: [
      createCell("IDENTIFIKASI", { bold: true, rowSpan: 19, shading: "F3F4F6" }),
      createCell("KARAKTERISTIK PESERTA DIDIK", { bold: true, colSpan: 12, shading: "E0E7FF" }),
    ],
  }));

  rows.push(new TableRow({
    children: [
      createCell("Kesiapan Belajar", { rowSpan: 2 }),
      createCell("Belum Siap", { colSpan: 6 }),
      createCell("Siap", { colSpan: 5 }),
      createCell("Sangat Siap"),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell("", { colSpan: 6 }),
      createCell(data.identifikasi.karakteristikPeserta.kesiapanBelajar.deskripsi, { colSpan: 5 }),
      createCell("."),
    ],
  }));

  rows.push(new TableRow({
    children: [
      createCell("Minat", { rowSpan: 2 }),
      createCell("Teknik", { colSpan: 6 }),
      createCell("Sains/Kedokteran", { colSpan: 5 }),
      createCell("Humaniora"),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell(data.identifikasi.karakteristikPeserta.minat.deskripsi, { colSpan: 6 }),
      createCell("", { colSpan: 5 }),
      createCell(""),
    ],
  }));

  rows.push(new TableRow({
    children: [
      createCell("Bakat", { rowSpan: 2 }),
      createCell("", { colSpan: 6 }),
      createCell("", { colSpan: 5 }),
      createCell(""),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell("", { colSpan: 6 }),
      createCell(data.identifikasi.karakteristikPeserta.bakat.deskripsi, { colSpan: 5 }),
      createCell(""),
    ],
  }));

  rows.push(new TableRow({
    children: [
      createCell("Profil Belajar", { rowSpan: 2 }),
      createCell("Visual", { colSpan: 6 }),
      createCell("Auditori", { colSpan: 5 }),
      createCell("Kinestetik"),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell("", { colSpan: 6 }),
      createCell("", { colSpan: 5 }),
      createCell(data.identifikasi.karakteristikPeserta.profilBelajar.deskripsi),
    ],
  }));

  // KARAKTERISTIK MATA PELAJARAN
  rows.push(new TableRow({
    children: [createCell("KARAKTERISTIK MATA PELAJARAN", { bold: true, colSpan: 12, shading: "E0E7FF" })],
  }));

  rows.push(new TableRow({
    children: [
      createCell("Jenis pengetahuan yang akan dicapai"),
      createMultiLineCell(data.identifikasi.karakteristikMapel.jenisPengetahuan.map((p, i) => `${i + 1}. ${p}`), { colSpan: 11 }),
    ],
  }));

  rows.push(new TableRow({
    children: [
      createCell("Relevansi dengan kehidupan nyata peserta didik"),
      createMultiLineCell(data.identifikasi.karakteristikMapel.relevansi.map((r, i) => `${i + 1}. ${r}`), { colSpan: 11 }),
    ],
  }));

  rows.push(new TableRow({
    children: [
      createCell("Tingkat kesulitan"),
      createCell(data.identifikasi.karakteristikMapel.tingkatKesulitan, { colSpan: 11 }),
    ],
  }));

  rows.push(new TableRow({
    children: [
      createCell("Struktur Materi"),
      createCell(data.identifikasi.karakteristikMapel.strukturMateri, { colSpan: 11 }),
    ],
  }));

  rows.push(new TableRow({
    children: [
      createCell("Integrasi Nilai dan karakter"),
      createMultiLineCell(data.identifikasi.karakteristikMapel.integrasiNilai.map((n, i) => `${i + 1}. ${n}`), { colSpan: 11 }),
    ],
  }));

  // Dimensi Profil Lulusan - Checkbox layout
  const checkedDPL = data.identifikasi.dimensiProfilLulusan.filter(d => d.checked);
  const uncheckedDPL = data.identifikasi.dimensiProfilLulusan.filter(d => !d.checked);

  rows.push(new TableRow({
    children: [
      createCell("Dimensi Profil Lulusan", { bold: true, rowSpan: Math.max(4, Math.ceil(data.identifikasi.dimensiProfilLulusan.length / 2)) }),
      createCell("DPL yang dicapai:", { bold: true, colSpan: 11, shading: "E0E7FF" }),
    ],
  }));

  // Show checked DPLs in 2-column layout
  for (let i = 0; i < checkedDPL.length; i += 2) {
    rows.push(new TableRow({
      children: [
        createCell(`[v] ${checkedDPL[i].label}`, { colSpan: 5 }),
        createCell(checkedDPL[i + 1] ? `[v] ${checkedDPL[i + 1].label}` : "", { colSpan: 6 }),
      ],
    }));
  }

  if (uncheckedDPL.length > 0) {
    rows.push(new TableRow({
      children: [
        createCell("DPL lainnya:", { colSpan: 11, shading: "F3F4F6" }),
      ],
    }));
    for (let i = 0; i < uncheckedDPL.length; i += 2) {
      rows.push(new TableRow({
        children: [
          createCell(`[ ] ${uncheckedDPL[i].label}`, { colSpan: 5 }),
          createCell(uncheckedDPL[i + 1] ? `[ ] ${uncheckedDPL[i + 1].label}` : "", { colSpan: 6 }),
        ],
      }));
    }
  }

  // DESAIN PEMBELAJARAN
  rows.push(new TableRow({
    children: [
      createCell("DESAIN PEMBELAJARAN", { bold: true, rowSpan: 15, shading: "F3F4F6" }),
      createCell("Capaian Pembelajaran"),
      createCell(data.desain.capaianPembelajaran, { colSpan: 11 }),
    ],
  }));

  rows.push(new TableRow({
    children: [
      createCell("Lintas Disiplin Ilmu"),
      createCell(data.desain.lintasDisiplin, { colSpan: 11 }),
    ],
  }));

  rows.push(new TableRow({
    children: [
      createCell("Tujuan Pembelajaran"),
      createMultiLineCell(data.desain.tujuanPembelajaran.map((t, i) => `${i + 1}. ${t}`), { colSpan: 11 }),
    ],
  }));

  rows.push(new TableRow({
    children: [
      createCell("Topik Pembelajaran"),
      createCell(data.desain.topik, { colSpan: 11 }),
    ],
  }));

  rows.push(new TableRow({
    children: [
      createCell("Model Pembelajaran", { colSpan: 5 }),
      createCell(data.desain.modelPembelajaran, { colSpan: 7 }),
    ],
  }));

  rows.push(new TableRow({
    children: [
      createCell("Metode Pembelajaran", { colSpan: 5 }),
      createCell(data.desain.metodePembelajaran, { colSpan: 7 }),
    ],
  }));

  // Kemitraan
  rows.push(new TableRow({
    children: [
      createCell("Kemitraan Pembelajaran", { rowSpan: 3 }),
      createCell("Lingkungan Sekolah", { colSpan: 5 }),
      createCell(data.desain.kemitraan.sekolah, { colSpan: 7 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell("Lingkungan Luar Sekolah", { colSpan: 5 }),
      createCell(data.desain.kemitraan.luarSekolah, { colSpan: 7 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell("Masyarakat", { colSpan: 5 }),
      createCell(data.desain.kemitraan.masyarakat, { colSpan: 7 }),
    ],
  }));

  // Lingkungan
  rows.push(new TableRow({
    children: [
      createCell("Lingkungan Pembelajaran", { rowSpan: 3 }),
      createCell("Budaya Belajar", { colSpan: 5 }),
      createCell(data.desain.lingkungan.budaya, { colSpan: 7 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell("Optimalisasi Ruang Fisik", { colSpan: 5 }),
      createCell(data.desain.lingkungan.fisik, { colSpan: 7 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell("Pemanfaatan Ruang Virtual", { colSpan: 5 }),
      createCell(data.desain.lingkungan.virtual, { colSpan: 7 }),
    ],
  }));

  // Digital
  rows.push(new TableRow({
    children: [
      createCell("Pemanfaatan Digital", { rowSpan: 3 }),
      createCell("Perencanaan Pembelajaran", { colSpan: 5 }),
      createCell(data.desain.digital.perencanaan, { colSpan: 7 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell("Pelaksanaan Pembelajaran", { colSpan: 5 }),
      createCell(data.desain.digital.pelaksanaan, { colSpan: 7 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell("Asesmen Pembelajaran", { colSpan: 5 }),
      createCell(data.desain.digital.asesmen, { colSpan: 7 }),
    ],
  }));

  // PENGALAMAN BELAJAR
  rows.push(new TableRow({
    children: [
      createCell("PENGALAMAN BELAJAR", { bold: true, rowSpan: 10, shading: "F3F4F6" }),
      createCell("Langkah Pembelajaran", { bold: true, colSpan: 12, shading: "E0E7FF" }),
    ],
  }));

  // Awal
  rows.push(new TableRow({
    children: [
      createCell("Awal", { rowSpan: 3 }),
      createCell("Prinsip Pembelajaran", { rowSpan: 2 }),
      createCell("Mindful (Berkesadaran)", { colSpan: 5 }),
      createCell("Meaningful (Bermakna)", { colSpan: 3 }),
      createCell("Joyful (Menyenangkan)"),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell(data.pengalaman.awal.mindful ? "V" : "", { colSpan: 5, align: AlignmentType.CENTER }),
      createCell(data.pengalaman.awal.meaningful ? "V" : "", { colSpan: 3, align: AlignmentType.CENTER }),
      createCell(data.pengalaman.awal.joyful ? "V" : "", { align: AlignmentType.CENTER }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createMultiLineCell(data.pengalaman.awal.langkah.map((l, i) => `${i + 1}. ${l}`), { colSpan: 12 }),
    ],
  }));

  // Inti - Memahami
  rows.push(new TableRow({
    children: [
      createCell("Inti", { rowSpan: 3 }),
      createCell("Memahami"),
      createMultiLineCell(data.pengalaman.inti.memahami.map((l, i) => `${i + 1}. ${l}`), { colSpan: 11 }),
    ],
  }));

  // Inti - Mengaplikasi
  rows.push(new TableRow({
    children: [
      createCell("Mengaplikasi"),
      createMultiLineCell(data.pengalaman.inti.mengaplikasi.map((l, i) => `${i + 1}. ${l}`), { colSpan: 11 }),
    ],
  }));

  // Inti - Merefleksi
  rows.push(new TableRow({
    children: [
      createCell("Merefleksi"),
      createMultiLineCell(data.pengalaman.inti.merefleksi.map((l, i) => `${i + 1}. ${l}`), { colSpan: 11 }),
    ],
  }));

  // Penutup
  rows.push(new TableRow({
    children: [
      createCell("Penutup", { rowSpan: 3 }),
      createCell("Prinsip Pembelajaran", { rowSpan: 2 }),
      createCell("Mindful (Berkesadaran)", { colSpan: 4 }),
      createCell("Meaningful (Bermakna)", { colSpan: 4 }),
      createCell("Joyful (Menyenangkan)"),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell(data.pengalaman.penutup.mindful ? "v" : "", { colSpan: 4, align: AlignmentType.CENTER }),
      createCell(data.pengalaman.penutup.meaningful ? "v" : "", { colSpan: 4, align: AlignmentType.CENTER }),
      createCell(data.pengalaman.penutup.joyful ? "v" : "", { align: AlignmentType.CENTER }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createMultiLineCell(data.pengalaman.penutup.langkah.map((l, i) => `${i + 1}. ${l}`), { colSpan: 12 }),
    ],
  }));

  // ASESMEN
  rows.push(new TableRow({
    children: [
      createCell("ASESMEN", { bold: true, rowSpan: 3, shading: "F3F4F6" }),
      createCell("Asesmen pada Awal Pembelajaran"),
      createCell(data.asesmen.awal, { colSpan: 11 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell("Asesmen pada Proses Pembelajaran"),
      createCell(data.asesmen.proses, { colSpan: 11 }),
    ],
  }));
  rows.push(new TableRow({
    children: [
      createCell("Asesmen pada Akhir Pembelajaran"),
      createCell(data.asesmen.akhir, { colSpan: 11 }),
    ],
  }));

  const table = new Table({
    rows,
    width: { size: 100, type: WidthType.PERCENTAGE },
  });

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(0.5),
            right: convertInchesToTwip(0.5),
            bottom: convertInchesToTwip(0.5),
            left: convertInchesToTwip(0.5),
          },
        },
      },
      children: [
        new Paragraph({
          children: [new TextRun({ text: "RENCANA PELAKSANAAN PEMBELAJARAN", bold: true, size: 28 })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "DEEP LEARNING", bold: true, size: 24 })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),
        table,
        new Paragraph({ spacing: { before: 400 } }),
        new Paragraph({
          children: [new TextRun({ text: "Lampiran", bold: true, size: 22 })],
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "1. Rubrik penilaian observasi sikap", bold: true, size: 20 })],
          spacing: { after: 100 },
        }),
        // Rubrik sikap table
        new Table({
          rows: [
            new TableRow({
              children: [
                createCell("Aspek", { bold: true, shading: "E0E7FF" }),
                createCell("Indikator", { bold: true, shading: "E0E7FF" }),
                createCell("Skor 4 (Sangat Baik)", { bold: true, shading: "E0E7FF" }),
                createCell("Skor 3 (Baik)", { bold: true, shading: "E0E7FF" }),
                createCell("Skor 2 (Cukup)", { bold: true, shading: "E0E7FF" }),
                createCell("Skor 1 (Perlu Bimbingan)", { bold: true, shading: "E0E7FF" }),
              ],
            }),
            ...data.lampiran.rubrikSikap.map(r => new TableRow({
              children: [
                createCell(r.aspek, { bold: true }),
                createCell(r.indikator),
                createCell(r.skor4),
                createCell(r.skor3),
                createCell(r.skor2),
                createCell(r.skor1),
              ],
            })),
          ],
          width: { size: 100, type: WidthType.PERCENTAGE },
        }),
        new Paragraph({ spacing: { before: 200 } }),
        new Paragraph({
          children: [new TextRun({ text: `2. Jobsheet: ${data.lampiran.jobsheet}`, size: 20 })],
        }),
        new Paragraph({ spacing: { before: 200 } }),
        new Paragraph({
          children: [new TextRun({ text: "3. Rubrik penilaian presentasi penggunaan alat", bold: true, size: 20 })],
        }),
        new Paragraph({ spacing: { before: 400 } }),
        new Paragraph({
          children: [new TextRun({ text: `${data.tempat}, ${data.tanggal}`, size: 20 })],
          alignment: AlignmentType.RIGHT,
        }),
        new Paragraph({ spacing: { before: 400 } }),
        new Table({
          rows: [
            new TableRow({
              children: [
                createCell("Kepala Sekolah", { align: AlignmentType.CENTER }),
                createCell("Kurikulum", { align: AlignmentType.CENTER }),
                createCell("Guru", { align: AlignmentType.CENTER }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ spacing: { before: 600, after: 600 }, children: [new TextRun("")] })],
                  verticalAlign: VerticalAlign.CENTER,
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ spacing: { before: 600, after: 600 }, children: [new TextRun("")] })],
                  verticalAlign: VerticalAlign.CENTER,
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                  },
                }),
                new TableCell({
                  children: [new Paragraph({ spacing: { before: 600, after: 600 }, children: [new TextRun("")] })],
                  verticalAlign: VerticalAlign.CENTER,
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                  },
                }),
              ],
            }),
            new TableRow({
              children: [
                createCell(data.lampiran.penandatangan.kepalaSekolah || "_________________", { align: AlignmentType.CENTER }),
                createCell(data.lampiran.penandatangan.kurikulum || "_________________", { align: AlignmentType.CENTER }),
                createCell(data.lampiran.penandatangan.guru || "_________________", { align: AlignmentType.CENTER }),
              ],
            }),
          ],
          width: { size: 100, type: WidthType.PERCENTAGE },
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `RPP_${data.identitas.mataPelajaran || "Dokumen"}_${data.identitas.kelasSemester.replace(/\s/g, "_")}.docx`);
}
