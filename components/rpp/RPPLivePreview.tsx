"use client";

import { RPPData } from "@/types/rpp";

export function RPPLivePreview({ data }: { data: RPPData }) {
  const checkedDPL = data.identifikasi.dimensiProfilLulusan.filter(d => d.checked);
  const uncheckedDPL = data.identifikasi.dimensiProfilLulusan.filter(d => !d.checked);

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
        .rpp-table .dpl-check { display: inline-block; width: 1.2em; text-align: center; }
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
          <tr>
            <td rowSpan={5} className="shaded bold center">IDENTITAS</td>
            <td>Nama Satuan Pendidikan</td>
            <td className="center">:</td>
            <td colSpan={8}>{data.identitas.satuanPendidikan}</td>
          </tr>
          <tr><td>Mata Pelajaran</td><td className="center">:</td><td colSpan={8}>{data.identitas.mataPelajaran}</td></tr>
          <tr><td>Nama Guru</td><td className="center">:</td><td colSpan={8}>{data.identitas.namaGuru}</td></tr>
          <tr><td>Kelas/ semester</td><td className="center">:</td><td colSpan={8}>{data.identitas.kelasSemester}</td></tr>
          <tr><td>Alokasi Waktu</td><td className="center"></td><td colSpan={8}>{data.identitas.alokasiWaktu}</td></tr>

          <tr>
            <td rowSpan={19} className="shaded bold center">IDENTIFIKASI</td>
            <td colSpan={10} className="bold center" style={{background:'#e0e7ff'}}>KARAKTERISTIK PESERTA DIDIK</td>
          </tr>
          <tr><td rowSpan={2}>Kesiapan Belajar</td><td colSpan={4} className="center">Belum Siap</td><td colSpan={4} className="center">Siap</td><td className="center">Sangat Siap</td></tr>
          <tr><td colSpan={4}></td><td colSpan={4}>{data.identifikasi.karakteristikPeserta.kesiapanBelajar.deskripsi}</td><td className="center">.</td></tr>
          <tr><td rowSpan={2}>Minat</td><td colSpan={4} className="center">Teknik</td><td colSpan={4} className="center">Sains/Kedokteran</td><td className="center">Humaniora</td></tr>
          <tr><td colSpan={4}>{data.identifikasi.karakteristikPeserta.minat.deskripsi}</td><td colSpan={4}></td><td></td></tr>
          <tr><td rowSpan={2}>Bakat</td><td colSpan={4}></td><td colSpan={4}></td><td></td></tr>
          <tr><td colSpan={4}></td><td colSpan={4}>{data.identifikasi.karakteristikPeserta.bakat.deskripsi}</td><td></td></tr>
          <tr><td rowSpan={2}>Profil Belajar</td><td colSpan={4} className="center">Visual</td><td colSpan={4} className="center">Auditori</td><td className="center">Kinestetik</td></tr>
          <tr><td colSpan={4}></td><td colSpan={4}></td><td>{data.identifikasi.karakteristikPeserta.profilBelajar.deskripsi}</td></tr>

          <tr><td colSpan={10} className="bold center" style={{background:'#e0e7ff'}}>KARAKTERISTIK MATA PELAJARAN</td></tr>
          <tr><td>Jenis pengetahuan</td><td colSpan={9}><ul>{data.identifikasi.karakteristikMapel.jenisPengetahuan.map((p,i)=><li key={i}>{i+1}. {p}</li>)}</ul></td></tr>
          <tr><td>Relevansi</td><td colSpan={9}><ul>{data.identifikasi.karakteristikMapel.relevansi.map((r,i)=><li key={i}>{i+1}. {r}</li>)}</ul></td></tr>
          <tr><td>Tingkat kesulitan</td><td colSpan={9}>{data.identifikasi.karakteristikMapel.tingkatKesulitan}</td></tr>
          <tr><td>Struktur Materi</td><td colSpan={9}>{data.identifikasi.karakteristikMapel.strukturMateri}</td></tr>
          <tr><td>Integrasi Nilai</td><td colSpan={9}><ul>{data.identifikasi.karakteristikMapel.integrasiNilai.map((n,i)=><li key={i}>{i+1}. {n}</li>)}</ul></td></tr>

          <tr>
            <td rowSpan={Math.max(4, 1 + Math.ceil(checkedDPL.length/2) + (uncheckedDPL.length>0 ? 1+Math.ceil(uncheckedDPL.length/2) : 0))} className="bold">Dimensi Profil Lulusan</td>
            <td colSpan={9} className="bold" style={{background:'#e0e7ff'}}>DPL yang dicapai:</td>
          </tr>
          {checkedDPL.length > 0 ? (
            Array.from({length: Math.ceil(checkedDPL.length/2)}).map((_, rowIdx) => (
              <tr key={`dpl-c-${rowIdx}`}>
                <td colSpan={4}><span className="dpl-check dpl-checked">[v]</span> {checkedDPL[rowIdx*2]?.label}</td>
                <td colSpan={5}><span className="dpl-check dpl-checked">[v]</span> {checkedDPL[rowIdx*2+1]?.label || ''}</td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={9} className="center">(Tidak ada DPL yang dicentang)</td></tr>
          )}
          {uncheckedDPL.length > 0 && (
            <>
              <tr><td colSpan={9} className="bold" style={{background:'#f3f4f6'}}>DPL lainnya:</td></tr>
              {Array.from({length: Math.ceil(uncheckedDPL.length/2)}).map((_, rowIdx) => (
                <tr key={`dpl-u-${rowIdx}`}>
                  <td colSpan={4}><span className="dpl-check dpl-unchecked">[ ]</span> {uncheckedDPL[rowIdx*2]?.label}</td>
                  <td colSpan={5}><span className="dpl-check dpl-unchecked">[ ]</span> {uncheckedDPL[rowIdx*2+1]?.label || ''}</td>
                </tr>
              ))}
            </>
          )}

          <tr>
            <td rowSpan={15} className="shaded bold center">DESAIN PEMBELAJARAN</td>
            <td>Capaian Pembelajaran</td><td colSpan={9}>{data.desain.capaianPembelajaran}</td>
          </tr>
          <tr><td>Lintas Disiplin Ilmu</td><td colSpan={9}>{data.desain.lintasDisiplin}</td></tr>
          <tr><td>Tujuan Pembelajaran</td><td colSpan={9}><ul>{data.desain.tujuanPembelajaran.map((t,i)=><li key={i}>{i+1}. {t}</li>)}</ul></td></tr>
          <tr><td>Topik Pembelajaran</td><td colSpan={9}>{data.desain.topik}</td></tr>
          <tr><td colSpan={5}>Model Pembelajaran</td><td colSpan={5}>{data.desain.modelPembelajaran}</td></tr>
          <tr><td colSpan={5}>Metode Pembelajaran</td><td colSpan={5}>{data.desain.metodePembelajaran}</td></tr>
          <tr><td rowSpan={3}>Kemitraan</td><td colSpan={5}>Lingkungan Sekolah</td><td colSpan={4}>{data.desain.kemitraan.sekolah}</td></tr>
          <tr><td colSpan={5}>Lingkungan Luar Sekolah</td><td colSpan={4}>{data.desain.kemitraan.luarSekolah}</td></tr>
          <tr><td colSpan={5}>Masyarakat</td><td colSpan={4}>{data.desain.kemitraan.masyarakat}</td></tr>
          <tr><td rowSpan={3}>Lingkungan</td><td colSpan={5}>Budaya Belajar</td><td colSpan={4}>{data.desain.lingkungan.budaya}</td></tr>
          <tr><td colSpan={5}>Optimalisasi Ruang Fisik</td><td colSpan={4}>{data.desain.lingkungan.fisik}</td></tr>
          <tr><td colSpan={5}>Pemanfaatan Ruang Virtual</td><td colSpan={4}>{data.desain.lingkungan.virtual}</td></tr>
          <tr><td rowSpan={3}>Digital</td><td colSpan={5}>Perencanaan</td><td colSpan={4}>{data.desain.digital.perencanaan}</td></tr>
          <tr><td colSpan={5}>Pelaksanaan</td><td colSpan={4}>{data.desain.digital.pelaksanaan}</td></tr>
          <tr><td colSpan={5}>Asesmen</td><td colSpan={4}>{data.desain.digital.asesmen}</td></tr>

          <tr>
            <td rowSpan={10} className="shaded bold center">PENGALAMAN BELAJAR</td>
            <td colSpan={10} className="bold center" style={{background:'#e0e7ff'}}>Langkah Pembelajaran</td>
          </tr>
          <tr><td rowSpan={3}>Awal</td><td rowSpan={2}>Prinsip</td><td colSpan={3}>Mindful</td><td colSpan={3}>Meaningful</td><td>Joyful</td></tr>
          <tr><td colSpan={3} className="center">{data.pengalaman.awal.mindful ? "V" : ""}</td><td colSpan={3} className="center">{data.pengalaman.awal.meaningful ? "V" : ""}</td><td className="center">{data.pengalaman.awal.joyful ? "V" : ""}</td></tr>
          <tr><td colSpan={10}><ul>{data.pengalaman.awal.langkah.map((l,i)=><li key={i}>{i+1}. {l}</li>)}</ul></td></tr>
          <tr><td rowSpan={3}>Inti</td><td>Memahami</td><td colSpan={9}><ul>{data.pengalaman.inti.memahami.map((l,i)=><li key={i}>{i+1}. {l}</li>)}</ul></td></tr>
          <tr><td>Mengaplikasi</td><td colSpan={9}><ul>{data.pengalaman.inti.mengaplikasi.map((l,i)=><li key={i}>{i+1}. {l}</li>)}</ul></td></tr>
          <tr><td>Merefleksi</td><td colSpan={9}><ul>{data.pengalaman.inti.merefleksi.map((l,i)=><li key={i}>{i+1}. {l}</li>)}</ul></td></tr>
          <tr><td rowSpan={3}>Penutup</td><td rowSpan={2}>Prinsip</td><td colSpan={3}>Mindful</td><td colSpan={3}>Meaningful</td><td>Joyful</td></tr>
          <tr><td colSpan={3} className="center">{data.pengalaman.penutup.mindful ? "V" : ""}</td><td colSpan={3} className="center">{data.pengalaman.penutup.meaningful ? "V" : ""}</td><td className="center">{data.pengalaman.penutup.joyful ? "V" : ""}</td></tr>
          <tr><td colSpan={10}><ul>{data.pengalaman.penutup.langkah.map((l,i)=><li key={i}>{i+1}. {l}</li>)}</ul></td></tr>

          <tr>
            <td rowSpan={3} className="shaded bold center">ASESMEN</td>
            <td>Asesmen Awal</td><td colSpan={9}>{data.asesmen.awal}</td>
          </tr>
          <tr><td>Asesmen Proses</td><td colSpan={9}>{data.asesmen.proses}</td></tr>
          <tr><td>Asesmen Akhir</td><td colSpan={9}>{data.asesmen.akhir}</td></tr>
        </tbody>
      </table>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Lampiran</h3>
        <p className="font-bold mb-2">1. Rubrik penilaian observasi sikap</p>
        <table className="rpp-table mb-4">
          <thead>
            <tr>
              <th>Aspek</th><th>Indikator</th><th>Skor 4</th><th>Skor 3</th><th>Skor 2</th><th>Skor 1</th>
            </tr>
          </thead>
          <tbody>
            {data.lampiran.rubrikSikap.map((r, i) => (
              <tr key={i}><td className="bold">{r.aspek}</td><td>{r.indikator}</td><td>{r.skor4}</td><td>{r.skor3}</td><td>{r.skor2}</td><td>{r.skor1}</td></tr>
            ))}
          </tbody>
        </table>
        <p className="font-bold mb-2">2. Jobsheet: {data.lampiran.jobsheet}</p>
        <p className="font-bold mb-2">3. Rubrik penilaian presentasi</p>
      </div>

      <div className="mt-8 text-right">
        <p>{data.tempat}, {data.tanggal}</p>
      </div>

      <div className="signature-row mt-8">
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
