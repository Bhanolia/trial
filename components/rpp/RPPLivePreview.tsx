"use client";

import { RPPData } from "@/types/rpp";

export function RPPLivePreview({ data }: { data: RPPData }) {
  const allDPL = data.identifikasi.dimensiProfilLulusan;

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 text-sm text-gray-800 rpp-preview">
      <style jsx>{`
        .rpp-preview h2 { font-size: 1.1rem; font-weight: 700; text-align: center; margin-bottom: 0.25rem; }
        .rpp-preview h3 { font-size: 0.95rem; font-weight: 700; text-align: center; margin-bottom: 1rem; color: #1e3a5f; }
        .rpp-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
        .rpp-table th, .rpp-table td { border: 1px solid #333; padding: 4px 6px; vertical-align: top; }
        .rpp-table th { background: #e0e7ff; font-weight: 600; text-align: center; }
        .rpp-table .shaded { background: #f3f4f6; }
        .rpp-table .center { text-align: center; }
        .rpp-table .bold { font-weight: 700; }
        .rpp-table .dpl-check { display: inline-block; width: 1.2em; text-align: center; font-size: 1.2em; }
        .rpp-table .dpl-checked { color: #16a34a; font-weight: 700; }
        .rpp-table .dpl-unchecked { color: #9ca3af; }
        .rpp-table ul { margin: 0; padding-left: 1.2em; }
        .rpp-table li { margin-bottom: 2px; }
        .signature-row { margin-top: 2rem; display: flex; justify-content: space-between; text-align: center; }
        .signature-col { width: 30%; }
        .signature-line { border-top: 1px solid #333; margin-top: 3rem; padding-top: 4px; font-weight: 600; }
      `}</style>

      <h2>RENCANA PELAKSANAAN PEMBELAJARAN</h2>
      <h3>DEEP LEARNING</h3>

      <table className="rpp-table">
        <tbody>
          {/* IDENTITAS */}
          <tr>
            <td rowSpan={5} className="shaded bold center">IDENTITAS</td>
            <td colSpan={3}>Nama Satuan Pendidikan</td>
            <td colSpan={2} className="center">:</td>
            <td colSpan={8}>{data.identitas.satuanPendidikan}</td>
          </tr>
          <tr><td colSpan={3}>Mata Pelajaran</td><td colSpan={2} className="center">:</td><td colSpan={8}>{data.identitas.mataPelajaran}</td></tr>
          <tr><td colSpan={3}>Nama Guru</td><td colSpan={2} className="center">:</td><td colSpan={8}>{data.identitas.namaGuru}</td></tr>
          <tr><td colSpan={3}>Kelas/ semester</td><td colSpan={2} className="center">:</td><td colSpan={8}>{data.identitas.kelasSemester}</td></tr>
          <tr><td colSpan={3}>Alokasi Waktu</td><td colSpan={2} className="center"></td><td colSpan={8}>{data.identitas.alokasiWaktu}</td></tr>

          {/* IDENTIFIKASI */}
          <tr>
            <td rowSpan={19} className="shaded bold center">IDENTIFIKASI</td>
            <td colSpan={13} className="bold center" style={{background:'#e0e7ff'}}>KARAKTERISTIK PESERTA DIDIK</td>
          </tr>
          <tr>
            <td rowSpan={2}>Kesiapan Belajar</td>
            <td colSpan={6}>Belum Siap</td>
            <td colSpan={5}>Siap</td>
            <td>Sangat Siap</td>
          </tr>
          <tr><td colSpan={6}></td><td colSpan={5}>{data.identifikasi.karakteristikPeserta.kesiapanBelajar.deskripsi}</td><td>.</td></tr>
          <tr>
            <td rowSpan={2}>Minat</td>
            <td colSpan={6}>Teknik</td>
            <td colSpan={5}>Sains/Kedokteran</td>
            <td>Humaniora</td>
          </tr>
          <tr><td colSpan={6}>{data.identifikasi.karakteristikPeserta.minat.deskripsi}</td><td colSpan={5}></td><td></td></tr>
          <tr>
            <td rowSpan={2}>Bakat</td>
            <td colSpan={6}></td>
            <td colSpan={5}></td>
            <td></td>
          </tr>
          <tr><td colSpan={6}></td><td colSpan={5}>{data.identifikasi.karakteristikPeserta.bakat.deskripsi}</td><td></td></tr>
          <tr>
            <td rowSpan={2}>Profil Belajar</td>
            <td colSpan={6}>Visual</td>
            <td colSpan={5}>Auditori</td>
            <td>Kinestetik</td>
          </tr>
          <tr><td colSpan={6}></td><td colSpan={5}></td><td>{data.identifikasi.karakteristikPeserta.profilBelajar.deskripsi}</td></tr>

          <tr><td colSpan={13} className="bold center" style={{background:'#e0e7ff'}}>KARAKTERISTIK MATA PELAJARAN</td></tr>
          <tr>
            <td colSpan={1}>Jenis pengetahuan yang akan dicapai</td>
            <td colSpan={12}>
              <ul>{data.identifikasi.karakteristikMapel.jenisPengetahuan.map((p, i) => <li key={i}>{i+1}. {p}</li>)}</ul>
            </td>
          </tr>
          <tr>
            <td colSpan={1}>Relevansi dengan kehidupan nyata peserta didik</td>
            <td colSpan={12}>
              <ul>{data.identifikasi.karakteristikMapel.relevansi.map((r, i) => <li key={i}>{i+1}. {r}</li>)}</ul>
            </td>
          </tr>
          <tr><td colSpan={1}>Tingkat kesulitan</td><td colSpan={12}>{data.identifikasi.karakteristikMapel.tingkatKesulitan}</td></tr>
          <tr><td colSpan={1}>Struktur Materi</td><td colSpan={12}>{data.identifikasi.karakteristikMapel.strukturMateri}</td></tr>
          <tr>
            <td colSpan={1}>Integrasi Nilai dan karakter</td>
            <td colSpan={12}>
              <ul>{data.identifikasi.karakteristikMapel.integrasiNilai.map((n, i) => <li key={i}>{i+1}. {n}</li>)}</ul>
            </td>
          </tr>

          {/* DPL */}
          <tr>
            <td rowSpan={4} className="bold shaded">Dimensi Profil Lulusan</td>
            <td></td>
            <td colSpan={8}>DPL 1<br/>{allDPL[0]?.label}</td>
            <td className="center">{allDPL[0]?.checked ? <span className="dpl-check dpl-checked">√</span> : <span className="dpl-check dpl-unchecked">-</span>}</td>
            <td colSpan={3}>DPL 5<br/>{allDPL[4]?.label}</td>
          </tr>
          <tr>
            <td></td>
            <td colSpan={8}>DPL 2<br/>{allDPL[1]?.label}</td>
            <td className="center">{allDPL[1]?.checked ? <span className="dpl-check dpl-checked">√</span> : <span className="dpl-check dpl-unchecked">-</span>}</td>
            <td colSpan={3}>DPL 6<br/>{allDPL[5]?.label}</td>
          </tr>
          <tr>
            <td></td>
            <td colSpan={8}>DPL 3<br/>{allDPL[2]?.label}</td>
            <td className="center">{allDPL[2]?.checked ? <span className="dpl-check dpl-checked">√</span> : <span className="dpl-check dpl-unchecked">-</span>}</td>
            <td colSpan={3}>DPL 7<br/>{allDPL[6]?.label}</td>
          </tr>
          <tr>
            <td></td>
            <td colSpan={8}>DPL 4<br/>{allDPL[3]?.label}</td>
            <td className="center">{allDPL[3]?.checked ? <span className="dpl-check dpl-checked">√</span> : <span className="dpl-check dpl-unchecked">-</span>}</td>
            <td colSpan={3}>DPL 8<br/>{allDPL[7]?.label}</td>
          </tr>

          {/* DESAIN PEMBELAJARAN */}
          <tr>
            <td rowSpan={15} className="shaded bold center">DESAIN PEMBELAJARAN</td>
            <td colSpan={1}>Capaian Pembelajaran</td>
            <td colSpan={12}>{data.desain.capaianPembelajaran}</td>
          </tr>
          <tr><td colSpan={1}>Lintas Disiplin Ilmu</td><td colSpan={12}>{data.desain.lintasDisiplin}</td></tr>
          <tr>
            <td colSpan={1}>Tujuan Pembelajaran</td>
            <td colSpan={12}><ul>{data.desain.tujuanPembelajaran.map((t, i) => <li key={i}>{i+1}. {t}</li>)}</ul></td>
          </tr>
          <tr><td colSpan={1}>Topik Pembelajaran</td><td colSpan={12}>{data.desain.topik}</td></tr>
          <tr>
            <td rowSpan={2}>Praktik Pedagogis</td>
            <td colSpan={5}>Model Pembelajaran</td>
            <td colSpan={7}>{data.desain.modelPembelajaran}</td>
          </tr>
          <tr><td colSpan={5}>Metode Pembelajaran</td><td colSpan={7}>{data.desain.metodePembelajaran}</td></tr>
          <tr>
            <td rowSpan={3}>Kemitraan Pembelajaran</td>
            <td colSpan={5}>Lingkungan Sekolah</td>
            <td colSpan={7}>{data.desain.kemitraan.sekolah}</td>
          </tr>
          <tr><td colSpan={5}>Lingkungan Luar Sekolah</td><td colSpan={7}>{data.desain.kemitraan.luarSekolah}</td></tr>
          <tr><td colSpan={5}>Masyarakat</td><td colSpan={7}>{data.desain.kemitraan.masyarakat}</td></tr>
          <tr>
            <td rowSpan={3}>Lingkungan Pembelajaran</td>
            <td colSpan={5}>Budaya Belajar</td>
            <td colSpan={7}>{data.desain.lingkungan.budaya}</td>
          </tr>
          <tr><td colSpan={5}>Optimalisasi Ruang Fisik</td><td colSpan={7}>{data.desain.lingkungan.fisik}</td></tr>
          <tr><td colSpan={5}>Pemanfaatan Ruang Virtual</td><td colSpan={7}>{data.desain.lingkungan.virtual}</td></tr>
          <tr>
            <td rowSpan={3}>Pemanfaatan Digital</td>
            <td colSpan={5}>Perencanaan Pembelajaran</td>
            <td colSpan={7}>{data.desain.digital.perencanaan}</td>
          </tr>
          <tr><td colSpan={5}>Pelaksanaan Pembelajaran</td><td colSpan={7}>{data.desain.digital.pelaksanaan}</td></tr>
          <tr><td colSpan={5}>Asesmen Pembelajaran</td><td colSpan={7}>{data.desain.digital.asesmen}</td></tr>

          {/* PENGALAMAN BELAJAR */}
          <tr>
            <td rowSpan={10} className="shaded bold center">PENGALAMAN BELAJAR</td>
            <td colSpan={13} className="bold center" style={{background:'#e0e7ff'}}>Langkah Pembelajaran</td>
          </tr>
          <tr>
            <td rowSpan={3}>Awal</td>
            <td rowSpan={2} colSpan={3}>Prinsip Pembelajaran</td>
            <td colSpan={5}>Mindful<br/>(Berkesadaran)</td>
            <td colSpan={3}>Meaningful<br/>(Bermakna)</td>
            <td>Joyful<br/>(Menyenangkan)</td>
          </tr>
          <tr>
            <td colSpan={5} className="center">{data.pengalaman.awal.mindful ? "V" : ""}</td>
            <td colSpan={3} className="center">{data.pengalaman.awal.meaningful ? "V" : ""}</td>
            <td className="center">{data.pengalaman.awal.joyful ? "V" : ""}</td>
          </tr>
          <tr><td colSpan={12}><ul>{data.pengalaman.awal.langkah.map((l, i) => <li key={i}>{i+1}. {l}</li>)}</ul></td></tr>
          <tr>
            <td rowSpan={3}>Inti</td>
            <td colSpan={3}>Memahami</td>
            <td colSpan={9}><ul>{data.pengalaman.inti.memahami.map((l, i) => <li key={i}>{i+1}. {l}</li>)}</ul></td>
          </tr>
          <tr><td colSpan={3}>Mengaplikasi</td><td colSpan={9}><ul>{data.pengalaman.inti.mengaplikasi.map((l, i) => <li key={i}>{i+1}. {l}</li>)}</ul></td></tr>
          <tr><td colSpan={3}>Merefleksi</td><td colSpan={9}><ul>{data.pengalaman.inti.merefleksi.map((l, i) => <li key={i}>{i+1}. {l}</li>)}</ul></td></tr>
          <tr>
            <td rowSpan={3}>Penutup</td>
            <td rowSpan={2} colSpan={3}>Prinsip Pembelajaran</td>
            <td colSpan={4}>Mindful<br/>(Berkesadaran)</td>
            <td colSpan={4}>Meaningful<br/>(Bermakna)</td>
            <td>Joyful<br/>(Menyenangkan)</td>
          </tr>
          <tr>
            <td colSpan={4} className="center">{data.pengalaman.penutup.mindful ? "V" : ""}</td>
            <td colSpan={4} className="center">{data.pengalaman.penutup.meaningful ? "V" : ""}</td>
            <td className="center">{data.pengalaman.penutup.joyful ? "V" : ""}</td>
          </tr>
          <tr><td colSpan={12}><ul>{data.pengalaman.penutup.langkah.map((l, i) => <li key={i}>{i+1}. {l}</li>)}</ul></td></tr>

          {/* ASESMEN */}
          <tr>
            <td rowSpan={3} className="shaded bold center">ASESMEN</td>
            <td colSpan={1}>Asesmen pada Awal Pembelajaran</td>
            <td colSpan={12}>{data.asesmen.awal}</td>
          </tr>
          <tr><td colSpan={1}>Asesmen pada Proses Pembelajaran</td><td colSpan={12}>{data.asesmen.proses}</td></tr>
          <tr><td colSpan={1}>Asesmen pada Akhir Pembelajaran</td><td colSpan={12}>{data.asesmen.akhir}</td></tr>
        </tbody>
      </table>

      <div style={{marginTop: '2rem'}}>
        <p><strong>Lampiran</strong></p>
        <p>1. <strong>Rubrik penilaian observasi sikap selama proses diskusi dan mengerjakan tugas praktik</strong></p>
        <table className="rpp-table" style={{marginTop: '0.5rem'}}>
          <thead>
            <tr>
              <th>Aspek</th>
              <th>Indikator</th>
              <th>Skor 4 (Sangat Baik)</th>
              <th>Skor 3 (Baik)</th>
              <th>Skor 2 (Cukup)</th>
              <th>Skor 1 (Perlu Bimbingan)</th>
            </tr>
          </thead>
          <tbody>
            {data.lampiran.rubrikSikap.map((r, i) => (
              <tr key={i}>
                <td className="bold">{r.aspek}</td>
                <td>{r.indikator}</td>
                <td>{r.skor4}</td>
                <td>{r.skor3}</td>
                <td>{r.skor2}</td>
                <td>{r.skor1}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p style={{marginTop: '1rem'}}>2. Joobsheet: {data.lampiran.jobsheet}</p>
        <p>3. <strong>Rubrik penilaian presentasi penggunaan alat</strong></p>
      </div>

      <div style={{marginTop: '2rem', textAlign: 'right'}}>
        <p>{data.tempat}, {data.tanggal}</p>
      </div>

      <div className="signature-row">
        <div className="signature-col">
          <p>Kepala Sekolah</p>
          <div className="signature-line">{data.lampiran.penandatangan.kepalaSekolah || "_________________"}</div>
        </div>
        <div className="signature-col">
          <p>Kurikulum</p>
          <div className="signature-line">{data.lampiran.penandatangan.kurikulum || "_________________"}</div>
        </div>
        <div className="signature-col">
          <p>Guru</p>
          <div className="signature-line">{data.lampiran.penandatangan.guru || "_________________"}</div>
        </div>
      </div>
    </div>
  );
}