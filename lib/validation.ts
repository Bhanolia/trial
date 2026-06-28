"use client";

import { RPPData } from "@/types/rpp";

export interface ValidationErrors {
  identitas?: Record<string, string>;
  identifikasi?: Record<string, string>;
  desain?: Record<string, string>;
  pengalaman?: Record<string, string>;
  asesmen?: Record<string, string>;
  lampiran?: Record<string, string>;
}

export function validateRPP(data: RPPData): { valid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  const identitasErrors: Record<string, string> = {};
  if (!data.identitas.satuanPendidikan.trim()) identitasErrors.satuanPendidikan = "Wajib diisi";
  if (!data.identitas.mataPelajaran.trim()) identitasErrors.mataPelajaran = "Wajib diisi";
  if (!data.identitas.namaGuru.trim()) identitasErrors.namaGuru = "Wajib diisi";
  if (!data.identitas.kelasSemester.trim()) identitasErrors.kelasSemester = "Wajib diisi";
  if (Object.keys(identitasErrors).length > 0) errors.identitas = identitasErrors;

  const desainErrors: Record<string, string> = {};
  if (!data.desain.capaianPembelajaran.trim()) desainErrors.capaianPembelajaran = "Wajib diisi";
  if (!data.desain.topik.trim()) desainErrors.topik = "Wajib diisi";
  if (data.desain.tujuanPembelajaran.length === 0 || data.desain.tujuanPembelajaran.every(t => !t.trim())) {
    desainErrors.tujuanPembelajaran = "Minimal 1 tujuan pembelajaran";
  }
  if (Object.keys(desainErrors).length > 0) errors.desain = desainErrors;

  const asesmenErrors: Record<string, string> = {};
  if (!data.asesmen.awal.trim()) asesmenErrors.awal = "Wajib diisi";
  if (!data.asesmen.proses.trim()) asesmenErrors.proses = "Wajib diisi";
  if (!data.asesmen.akhir.trim()) asesmenErrors.akhir = "Wajib diisi";
  if (Object.keys(asesmenErrors).length > 0) errors.asesmen = asesmenErrors;

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
