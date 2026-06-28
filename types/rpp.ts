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
  kurikulum: string;
  guru: string;
}

// Official 8 DPL (Dimensi Profil Lulusan) for Deep Learning / Pembelajaran Mendalam
export const defaultDPL: DPLItem[] = [
  { label: "Keimanan dan Ketakwaan terhadap Tuhan Yang Maha Esa", checked: false },
  { label: "Kewargaan", checked: false },
  { label: "Penalaran Kritis", checked: false },
  { label: "Kreativitas", checked: false },
  { label: "Kolaborasi", checked: false },
  { label: "Kemandirian", checked: false },
  { label: "Kesehatan", checked: false },
  { label: "Komunikasi", checked: false },
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
      kesiapanBelajar: { level: "Siap", deskripsi: "Murid memiliki keinginan belajar tentang Kendaraan Ringan/Mobil." },
      minat: { bidang: "Teknik", deskripsi: "Murid menunjukkan minat yang tinggi dalam kegiatan pembelajaran kendaraan ringan/mobil." },
      bakat: { bidang: "Teknik", deskripsi: "Murid menunjukkan ketertarikan yang tinggi dalam mempelajari kendaraan ringan/mobil." },
      profilBelajar: { gaya: "Kinestetik", deskripsi: "Murid memiliki profil belajar/gaya belajar kinestetik." },
    },
    karakteristikMapel: {
      jenisPengetahuan: [
        "Pemahaman tentang konsep energi",
        "Pemahaman hubungan energi sampingan yang dihasilkan dengan potensi bahaya dan cara melindungi diri",
        "Pembelajaran tentang peralatan bertenaga (power tools)",
        "Pemahaman kepada murid tentang jenis, fungsi, dan penggunaan peralatan bertenaga (power tools)",
      ],
      relevansi: [
        "Energi yang terlibat pada penggunaan alat dapat memiliki potensi bahaya",
        "Memahami pentingnya penggunaan dan perawatan peralatan bertenaga (power tools) pada bidang otomotif",
        "Murid belajar bekerja terstruktur",
        "Belajar berkoordinasi dalam satu kelompok kerja",
        "Murid terbiasa mengikuti SOP, memahami pentingnya waktu, kualitas, dan keselamatan kerja.",
      ],
      tingkatKesulitan: "Tingkat kesulitan untuk mempelajari materi ini dalam rentang rendah sampai sedang",
      strukturMateri: "Struktur Materi",
      integrasiNilai: [
        "Nilai agama dan budi pekerti",
        "Berpikir kritis dan pemecahan masalah (critical thinking and problem solving)",
        "Berkomunikasi (communication)",
        "Berkolaborasi (collaboration)",
        "Safety / Keselamatan",
      ],
    },
    dimensiProfilLulusan: JSON.parse(JSON.stringify(defaultDPL)),
  },
  desain: {
    capaianPembelajaran: "Pada akhir fase E, murid mampu: melakukan menggunakan peralatan umum (general tools), alat perlengkapan bengkel (equipment tools), peralatan servis khusus (special service tools), alat ukur (measuring tools), dan alat diagnosis (diagnostic tools).",
    lintasDisiplin: "Teknik Otomotif, IPAS, dan Bahasa Inggris",
    tujuanPembelajaran: [
      "Mengidentifikasi perubahan energi pada berbagai alat rumah tangga",
      "Mengaitkan energi sampingan dengan potensi bahaya dan cara melindungi diri",
      "Memahami jenis peralatan bertenaga (power tools) di bidang otomotif",
      "Memahami fungsi peralatan bertenaga (power tools) di bidang otomotif",
      "Memahami pemahaman peralatan bertenaga (power tools) di bidang otomotif",
      "Memahami perawatan peralatan bertenaga (power tools) di bidang otomotif",
      "Memahami vocabulari untuk membuat prosedur penggunaan alat dalam bahasa Inggris",
      "Mampu mempresentasikan hasil diskusi tentang prosedur penggunaan alat.",
    ],
    topik: "Sistem Pemindah Tenaga Kendaraan Ringan",
    modelPembelajaran: "Pembelajaran Berbasis Proyek (PjBL)",
    metodePembelajaran: "Diskusi Kelompok, Wawancara, Praktek dan Presentasi",
    kemitraan: {
      sekolah: "Ruang kelas, Workshop Otomotif, Rekan sejawat guru",
      luarSekolah: "Dunia Industri Mitra sekolah",
      masyarakat: "Kelompok wirausaha/Komunitas usaha lokal, Orang tua",
    },
    lingkungan: {
      budaya: "Berkesadaran, Kolaborasi, Berfikir kritis",
      fisik: "Lingkungan Sekolah (workshop otomotif, perpustakaan)",
      virtual: "Platform pembelajaran berbasis games wayground",
    },
    digital: {
      perencanaan: "Google Doc",
      pelaksanaan: "Mentimeter, Canva, WhatsApp Application",
      asesmen: "Wayground",
    },
  },
  pengalaman: {
    awal: {
      mindful: true,
      meaningful: true,
      joyful: false,
      langkah: [
        "Guru membuka pelajaran dengan salam, doa bersama dan sapaan ramah untuk menciptakan suasana positif (Kesadaran diri)",
        "Guru dan murid melakukan safety talk dengan menunjuk logo roda gigi dengan mengucap 'KESELAMATAN ADALAH TANGGUNG JAWAB SAYA YES.'",
        "Guru menyapa murid dan melakukan pemeriksaan kehadiran bersama dengan guru dan menerapkan 5S di area kelas atau bengkel (Manajemen diri)",
        "Murid bersama dengan guru membahas tentang kesepakatan yang akan diterapkan dalam pembelajaran.",
        "Guru menyampaikan tujuan pembelajaran dan memberikan penjelasan bahwa selama pertemuan murid diharapkan mengikuti pembelajaran secara luring di lingkungan sekolah.",
        "Guru membangkitkan semangat dengan yel-yel SMK dan TKR untuk pemusatan konsentrasi murid.",
        "Guru menumbuhkan kesadaran murid bahwa kemampuan mengidentifikasi, memanfaatkan, dan merawat peralatan bertenaga merupakan modal yang sangat penting.",
        "Guru menyampaikan contoh-contoh ini, melalui berbagai media seperti video maupun artikel.",
        "Guru memberikan pertanyaan pemantik untuk menstimulasi kesadaran murid dalam mempelajari materi.",
      ],
    },
    inti: {
      memahami: [
        "Guru membawa benda nyata: senter, hairdryer, lem tembak, blender, kemudian mengajukan pertanyaan: Apa yang menyebabkan benda-benda ini bekerja?",
        "Berdiskusi, membaca artikel, eksplorasi sumber informasi pada buku, e-book, artikel, dan websites melalui internet tentang berbagai jenis energi dan aplikasinya pada berbagai alat",
        "Guru menyampaikan kegiatan yang harus diselesaikan murid secara mandiri (praktik penggunaan alat berkelompok)",
        "Murid menyalakan senter, hairdryer, lem tembak, blender",
        "Murid mengisi tabel hasil penggunaan alat pada lembar yang dibagikan",
        "Guru menjelaskan hubungan jika power tools yang digunakan pada di bengkel otomotif juga memiliki perubahan energi termasuk energi sampingan",
        "Membuat peta konsep tentang power tools",
        "Guru menjelaskan garis besar materi tentang power tools",
        "Guru memberikan materi tentang power tools melalui video pembelajaran",
      ],
      mengaplikasi: [
        "Guru membagi murid dalam 6 kelompok. Anggota kelompok ditentukan berdasarkan hasil identifikasi karakteristik murid yang diperoleh melalui asesmen awal.",
        "Murid mempraktikkan jobsheets yang telah disediakan",
        "Setelah mempraktikkan jobsheets dan mengumpulkan dokumentasi yang dibutuhkan, murid berdiskusi",
        "Dalam kegiatan diskusi, guru berperan sebagai fasilitator dan hadir untuk mengkonfirmasi pemahaman murid",
        "Guru membimbing masing-masing kelompok sesuai dengan kebutuhan mereka",
        "Hasil diskusi dikirimkan melalui GDrive. Masing-masing kelompok bebas memilih format yang digunakan",
        "Murid mempresentasikan hasil diskusi berupa prosedure penggunaan power tools dalam bahasa Inggris",
      ],
      merefleksi: [
        "Murid mendapatkan umpan balik dari teman dan guru",
        "Murid melakukan evaluasi diri terhadap pencapaian tujuan pembelajaran",
        "Guru membimbing murid melakukan refleksi pembelajaran, dengan menyampaikan perasaan selama pembelajaran",
      ],
    },
    penutup: {
      mindful: true,
      meaningful: true,
      joyful: true,
      langkah: [
        "Pendidik dan murid menyimpulkan pembelajaran.",
        "Pendidik mengajak murid merencanakan pembelajaran selanjutnya dan strategi belajar yang akan digunakan.",
        "Pendidik memuliakan murid dengan menghargai pencapaian proyeknya.",
        "Guru menyampaikan rencana kegiatan pembelajaran pada pertemuan berikutnya.",
        "Guru menyampaikan motivasi agar murid lebih menyadari akan pentingnya mempelajari materi power tools",
      ],
    },
  },
  asesmen: {
    awal: "Kuis singkat pengetahuan awal tentang power tools",
    proses: "Keterampilan, Observasi sikap, Laporan jobsheets, Presentasi laporan praktikum",
    akhir: "Tes tertulis",
  },
  lampiran: {
    rubrikSikap: [
      { aspek: "Kesadaran diri", indikator: "Mengenali emosi & kondisi saat praktik", skor4: "Murid tenang, percaya diri, fokus penuh", skor3: "Kadang gugup tapi bisa mengontrol diri", skor2: "Sering bingung, butuh arahan guru", skor1: "Mudah panik, tidak percaya diri, mengganggu praktik" },
      { aspek: "Pengelolaan diri", indikator: "Mengatur emosi & mengendalikan tindakan", skor4: "Selalu disiplin, mematuhi instruksi & SOP keselamatan", skor3: "Umumnya disiplin, hanya kadang lupa prosedur", skor2: "Sering lalai, perlu diingatkan berkali-kali", skor1: "Tidak mampu mengendalikan diri, berisiko bahaya" },
      { aspek: "Kesadaran sosial", indikator: "Menunjukkan empati & kepedulian", skor4: "Peka terhadap teman yang kesulitan, sigap membantu", skor3: "Menyadari kesulitan teman, kadang memberi dukungan", skor2: "Kurang peduli, hanya fokus pada dirinya sendiri", skor1: "Tidak peduli, bahkan mengabaikan keselamatan orang lain" },
      { aspek: "Keterampilan berelasi", indikator: "Bekerja sama & komunikasi", skor4: "Aktif bekerja sama, komunikasi jelas & sopan", skor3: "Bekerja sama cukup baik, komunikasi kadang kurang jelas", skor2: "Kerja sama terbatas, komunikasi kurang", skor1: "Sulit bekerja sama, komunikasi buruk / menyinggung" },
      { aspek: "Pengambilan keputusan bertanggung jawab", indikator: "Menyikapi situasi & keselamatan", skor4: "Selalu memilih langkah aman, menggunakan APD lengkap", skor3: "Umumnya memilih langkah aman, kadang terburu-buru", skor2: "Sering ceroboh, lupa APD", skor1: "Mengabaikan SOP, membahayakan diri & orang lain" },
    ],
    jobsheet: "https://drive.google.com/file/d/1L74tZCx6pqAKzDtwM53jSM8KZD0TS8xr/view?usp=sharing",
    rubrikPresentasi: {
      group: [
        { name: "General impression (G1)", criteria: ["Ability to control audience", "Style"] },
        { name: "Content (G2)", criteria: ["Topic", "Quality & quantity of ideas", "Organization", "Originality"] },
        { name: "Visual aids (G3)", criteria: ["Quality", "Use (effective & efficient)"] },
        { name: "Group work (G4)", criteria: ["Participation", "Handover"] },
        { name: "Question handling (G5)", criteria: ["Ability to handle questions"] },
      ],
      individual: [
        { name: "Delivery (I1)", criteria: ["Confidence", "Gesture", "Voice quality"] },
        { name: "Fluency (I2)", criteria: ["Intonation", "Pronunciation", "Hesitation handling"] },
        { name: "Accuracy (I3)", criteria: ["Grammar", "Vocabulary"] },
      ],
      campaign: [
        { name: "Campaign material (CM)", criteria: ["Attractive impression", "Quality", "Effective"] },
      ],
    },
    penandatangan: {
      kepalaSekolah: "",
      kurikulum: "",
      guru: "",
    },
  },
  tanggal: "02 Juni 2025",
  tempat: "Kota",
};

/** Migrate old localStorage data to current format */
export function migrateRPPData(raw: any): RPPData {
  if (!raw || typeof raw !== "object") return defaultRPP;

  const data: any = { ...defaultRPP, ...raw };

  // Fix DPL: old format was string[] or objects without label
  if (data.identifikasi?.dimensiProfilLulusan) {
    const dpl = data.identifikasi.dimensiProfilLulusan;
    if (Array.isArray(dpl)) {
      if (dpl.length === 0) {
        data.identifikasi.dimensiProfilLulusan = JSON.parse(JSON.stringify(defaultDPL));
      } else if (typeof dpl[0] === "string") {
        // Old format: array of strings
        const checkedSet = new Set(dpl as string[]);
        data.identifikasi.dimensiProfilLulusan = defaultDPL.map(item => ({
          label: item.label,
          checked: checkedSet.has(item.label),
        }));
      } else if (typeof dpl[0] === "object") {
        // Object format, but may have missing labels or old labels
        data.identifikasi.dimensiProfilLulusan = defaultDPL.map((defaultItem) => {
          const saved = dpl.find((d: any) => d.label === defaultItem.label);
          if (saved && typeof saved === "object" && saved.label) {
            return { label: saved.label, checked: !!saved.checked };
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

  // Ensure all nested objects exist
  if (!data.identifikasi.karakteristikPeserta) {
    data.identifikasi.karakteristikPeserta = defaultRPP.identifikasi.karakteristikPeserta;
  }
  if (!data.identifikasi.karakteristikMapel) {
    data.identifikasi.karakteristikMapel = defaultRPP.identifikasi.karakteristikMapel;
  }
  if (!data.lampiran) {
    data.lampiran = defaultRPP.lampiran;
  }
  if (!data.lampiran.rubrikSikap || !Array.isArray(data.lampiran.rubrikSikap)) {
    data.lampiran.rubrikSikap = defaultRPP.lampiran.rubrikSikap;
  }
  if (!data.lampiran.rubrikPresentasi) {
    data.lampiran.rubrikPresentasi = defaultRPP.lampiran.rubrikPresentasi;
  }
  if (!data.lampiran.penandatangan) {
    data.lampiran.penandatangan = defaultRPP.lampiran.penandatangan;
  }

  return data as RPPData;
}
