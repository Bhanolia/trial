"use client";

export interface RPPData {
  identitas: Identitas;
  identifikasi: Identifikasi;
  desain: DesainPembelajaran;
  pengalaman: PengalamanBelajar;
  asesmen: Asesmen;
  lampiran: Lampiran;
  tanggal: string;
  tempat: string;
}

export interface Identitas {
  satuanPendidikan: string;
  mataPelajaran: string;
  namaGuru: string;
  kelasSemester: string;
  alokasiWaktu: string;
}

export interface Identifikasi {
  karakteristikPeserta: KarakteristikPeserta;
  karakteristikMapel: KarakteristikMapel;
  dimensiProfilLulusan: DPLItem[];
}

export interface DPLItem {
  label: string;
  checked: boolean;
}

export interface KarakteristikPeserta {
  kesiapanBelajar: { level: string; deskripsi: string };
  minat: { bidang: string; deskripsi: string };
  bakat: { bidang: string; deskripsi: string };
  profilBelajar: { gaya: string; deskripsi: string };
}

export interface KarakteristikMapel {
  jenisPengetahuan: string[];
  relevansi: string[];
  tingkatKesulitan: string;
  strukturMateri: string;
  integrasiNilai: string[];
}

export interface DesainPembelajaran {
  capaianPembelajaran: string;
  lintasDisiplin: string;
  tujuanPembelajaran: string[];
  topik: string;
  modelPembelajaran: string;
  metodePembelajaran: string;
  kemitraan: Kemitraan;
  lingkungan: Lingkungan;
  digital: Digital;
}

export interface Kemitraan {
  sekolah: string;
  luarSekolah: string;
  masyarakat: string;
}

export interface Lingkungan {
  budaya: string;
  fisik: string;
  virtual: string;
}

export interface Digital {
  perencanaan: string;
  pelaksanaan: string;
  asesmen: string;
}

export interface PengalamanBelajar {
  awal: LangkahPembelajaran;
  inti: {
    memahami: string[];
    mengaplikasi: string[];
    merefleksi: string[];
  };
  penutup: LangkahPembelajaran;
}

export interface LangkahPembelajaran {
  mindful: boolean;
  meaningful: boolean;
  joyful: boolean;
  langkah: string[];
}

export interface Asesmen {
  awal: string;
  proses: string;
  akhir: string;
}

export interface Lampiran {
  rubrikSikap: RubrikSikap[];
  jobsheet: string;
  rubrikPresentasi: RubrikPresentasi;
  penandatangan: Penandatangan;
}

export interface RubrikSikap {
  aspek: string;
  indikator: string;
  skor4: string;
  skor3: string;
  skor2: string;
  skor1: string;
}

export interface RubrikPresentasi {
  group: RubrikGroup[];
  individual: RubrikIndividual[];
  campaign: RubrikCampaign[];
}

export interface RubrikGroup {
  name: string;
  criteria: string[];
}

export interface RubrikIndividual {
  name: string;
  criteria: string[];
}

export interface RubrikCampaign {
  name: string;
  criteria: string[];
}

export interface Penandatangan {
  kepalaSekolah: string;
  nipKepalaSekolah: string;
  kurikulum: string;
  nipKurikulum: string;
  guru: string;
  nipGuru: string;
}

// Official 8 DPL (Dimensi Profil Lulusan) — Kurikulum Merdeka Revisi 2025
export const defaultDPL: DPLItem[] = [
  { label: "Beriman, bertakwa kepada Tuhan Yang Maha Esa, dan berakhlak mulia", checked: false },
  { label: "Berkebinekaan global", checked: false },
  { label: "Bergotong royong", checked: false },
  { label: "Mandiri", checked: false },
  { label: "Bernalar kritis", checked: false },
  { label: "Kreatif", checked: false },
  { label: "Cinta lingkungan", checked: false },
  { label: "Sehat jasmani dan rohani", checked: false },
];

export const defaultRPP: RPPData = {
  identitas: {
    satuanPendidikan: "SMK",
    mataPelajaran: "",
    namaGuru: "",
    kelasSemester: "X / Gasal",
    alokasiWaktu: "1 X 3 JP x @45 menit",
  },
  identifikasi: {
    karakteristikPeserta: {
      kesiapanBelajar: { level: "Siap", deskripsi: "Murid memiliki keinginan belajar tentang materi yang akan dipelajari." },
      minat: { bidang: "Teknik", deskripsi: "Murid menunjukkan minat yang tinggi dalam kegiatan pembelajaran." },
      bakat: { bidang: "Teknik", deskripsi: "Murid menunjukkan ketertarikan yang tinggi dalam mempelajari materi." },
      profilBelajar: { gaya: "Kinestetik", deskripsi: "Murid memiliki profil belajar/gaya belajar kinestetik." },
    },
    karakteristikMapel: {
      jenisPengetahuan: ["Pengetahuan faktual", "Pengetahuan konseptual", "Pengetahuan prosedural"],
      relevansi: ["Relevansi dengan kehidupan nyata", "Relevansi dengan dunia kerja"],
      tingkatKesulitan: "Sedang",
      strukturMateri: "Terstruktur",
      integrasiNilai: ["Nilai agama dan budi pekerti", "Berpikir kritis", "Berkomunikasi", "Berkolaborasi"],
    },
    dimensiProfilLulusan: JSON.parse(JSON.stringify(defaultDPL)),
  },
  desain: {
    capaianPembelajaran: "",
    lintasDisiplin: "",
    tujuanPembelajaran: [""],
    topik: "",
    modelPembelajaran: "Pembelajaran Berbasis Proyek (PjBL)",
    metodePembelajaran: "Diskusi Kelompok, Praktek, Presentasi",
    kemitraan: { sekolah: "", luarSekolah: "", masyarakat: "" },
    lingkungan: { budaya: "", fisik: "", virtual: "" },
    digital: { perencanaan: "", pelaksanaan: "", asesmen: "" },
  },
  pengalaman: {
    awal: { mindful: false, meaningful: false, joyful: false, langkah: [""] },
    inti: { memahami: [""], mengaplikasi: [""], merefleksi: [""] },
    penutup: { mindful: false, meaningful: false, joyful: false, langkah: [""] },
  },
  asesmen: { awal: "", proses: "", akhir: "" },
  lampiran: {
    rubrikSikap: [
      { aspek: "Kesadaran diri", indikator: "Mengenali emosi & kondisi", skor4: "Sangat baik", skor3: "Baik", skor2: "Cukup", skor1: "Perlu bimbingan" },
      { aspek: "Pengelolaan diri", indikator: "Mengatur emosi & tindakan", skor4: "Sangat baik", skor3: "Baik", skor2: "Cukup", skor1: "Perlu bimbingan" },
      { aspek: "Kesadaran sosial", indikator: "Empati & kepedulian", skor4: "Sangat baik", skor3: "Baik", skor2: "Cukup", skor1: "Perlu bimbingan" },
      { aspek: "Keterampilan berelasi", indikator: "Bekerja sama & komunikasi", skor4: "Sangat baik", skor3: "Baik", skor2: "Cukup", skor1: "Perlu bimbingan" },
      { aspek: "Pengambilan keputusan", indikator: "Menyikapi situasi", skor4: "Sangat baik", skor3: "Baik", skor2: "Cukup", skor1: "Perlu bimbingan" },
    ],
    jobsheet: "",
    rubrikPresentasi: { group: [], individual: [], campaign: [] },
    penandatangan: { kepalaSekolah: "", nipKepalaSekolah: "", kurikulum: "", nipKurikulum: "", guru: "", nipGuru: "" },
  },
  tanggal: "",
  tempat: "",
};

export function migrateRPPData(raw: any): RPPData {
  if (!raw || typeof raw !== "object") return defaultRPP;

  const data: any = { ...defaultRPP, ...raw };

  if (data.identifikasi?.dimensiProfilLulusan) {
    const dpl = data.identifikasi.dimensiProfilLulusan;
    if (Array.isArray(dpl)) {
      if (dpl.length === 0) {
        data.identifikasi.dimensiProfilLulusan = JSON.parse(JSON.stringify(defaultDPL));
      } else if (typeof dpl[0] === "string") {
        const checkedSet = new Set(dpl as string[]);
        data.identifikasi.dimensiProfilLulusan = defaultDPL.map(item => ({
          label: item.label,
          checked: checkedSet.has(item.label),
        }));
      } else if (typeof dpl[0] === "object") {
        const oldLabels = new Map(dpl.map((d: any) => [d.label || d, d.checked]));
        data.identifikasi.dimensiProfilLulusan = defaultDPL.map(defaultItem => {
          if (oldLabels.has(defaultItem.label)) {
            return { label: defaultItem.label, checked: oldLabels.get(defaultItem.label) };
          }
          for (const [oldLabel, checked] of oldLabels.entries()) {
            if (typeof oldLabel === "string" && oldLabel.includes("Tuhan")) {
              return { label: defaultItem.label, checked: !!checked };
            }
          }
          return { label: defaultItem.label, checked: false };
        });
      }
    } else {
      data.identifikasi.dimensiProfilLulusan = JSON.parse(JSON.stringify(defaultDPL));
    }
  } else {
    data.identifikasi = { ...data.identifikasi, dimensiProfilLulusan: JSON.parse(JSON.stringify(defaultDPL)) };
  }

  if (!data.identifikasi.karakteristikPeserta) {
    data.identifikasi.karakteristikPeserta = defaultRPP.identifikasi.karakteristikPeserta;
  }
  if (!data.identifikasi.karakteristikMapel) {
    data.identifikasi.karakteristikMapel = defaultRPP.identifikasi.karakteristikMapel;
  }
  if (!data.lampiran) data.lampiran = defaultRPP.lampiran;
  if (!data.lampiran.rubrikSikap || !Array.isArray(data.lampiran.rubrikSikap)) {
    data.lampiran.rubrikSikap = defaultRPP.lampiran.rubrikSikap;
  }
  if (!data.lampiran.rubrikPresentasi) data.lampiran.rubrikPresentasi = defaultRPP.lampiran.rubrikPresentasi;
  if (!data.lampiran.penandatangan) data.lampiran.penandatangan = defaultRPP.lampiran.penandatangan;

  // Migrate old penandatangan format (without NIP)
  if (data.lampiran.penandatangan && !data.lampiran.penandatangan.nipKepalaSekolah) {
    data.lampiran.penandatangan.nipKepalaSekolah = "";
    data.lampiran.penandatangan.nipKurikulum = "";
    data.lampiran.penandatangan.nipGuru = "";
  }

  return data as RPPData;
}
