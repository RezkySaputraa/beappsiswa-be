import Joi from "joi";

export const PostLombaPayloadSchema = Joi.object({
  judul: Joi.string()
    .max(255)
    .required()
    .example("Lomba Desain Poster Nasional 2025"),
  penyelenggara: Joi.string()
    .max(255)
    .required()
    .example("Universitas Indonesia"),
  deskripsi: Joi.string()
    .required()
    .example("Kompetisi desain poster untuk pelajar dan mahasiswa."),
  tema: Joi.string()
    .max(255)
    .allow(null, "")
    .example("Inovasi dan Kreativitas"),
  jenis_lomba: Joi.string().max(255).required().example("Desain"),
  kategori: Joi.array()
    .items(Joi.string())
    .required()
    .min(1)
    .example(["Poster", "Infografis"]),
  tingkat: Joi.string().max(255).required().example("Nasional"),
  batas_usia: Joi.string().max(255).allow(null, "").example("25 tahun"),
  target_peserta: Joi.string()
    .allow(null, "")
    .example("Mahasiswa dan pelajar SMA/SMK"),
  lokasi: Joi.string().max(255).allow(null, "").example("Online"),
  maksimal_anggota: Joi.number().integer().min(1).required().example(3),
  biaya_pendaftaran: Joi.number().integer().min(0).required().example(50000),
  syarat_ketentuan: Joi.array()
    .items(Joi.string())
    .required()
    .min(1)
    .example(["Karya orisinil", "Tidak pernah dipublikasikan sebelumnya"]),
  cara_mendaftar: Joi.array()
    .items(Joi.string())
    .required()
    .min(1)
    .example(["Isi formulir pendaftaran", "Unggah karya via Google Drive"]),
  link_pendaftaran: Joi.string()
    .uri()
    .max(255)
    .required()
    .example("https://bit.ly/daftar-lomba-desain-2025"),
  jumlah_pendaftar: Joi.number().integer().min(0).required().example(120),

  timeline: Joi.object({
    pendaftaran_mulai: Joi.string().isoDate().required().example("2025-08-01"),
    pendaftaran_selesai: Joi.string()
      .isoDate()
      .required()
      .example("2025-08-20"),
    pengumpulan_karya: Joi.string()
      .isoDate()
      .allow(null, "")
      .example("2025-08-25"),
    deadline_karya: Joi.string()
      .isoDate()
      .allow(null, "")
      .example("2025-08-31"),
    penjurian: Joi.string()
      .max(255)
      .allow(null, "")
      .example("2025-09-01 - 2025-09-05"),
    pengumuman: Joi.string().isoDate().allow(null, "").example("2025-09-10"),
  }).required(),

  kontak: Joi.object({
    email: Joi.string().email().required().example("info@lombadesain.id"),
    whatsapp: Joi.string().allow(null, "").example("081234567890"),
    instagram: Joi.string().allow(null, "").example("@lombadesainid"),
  }).required(),

  hadiah: Joi.array()
    .items(
      Joi.object({
        juara: Joi.string().required().example("Juara 1"),
        hadiah: Joi.string()
          .required()
          .example("Uang tunai Rp 5.000.000 + Sertifikat"),
      })
    )
    .min(0)
    .example([
      { juara: "Juara 1", hadiah: "Rp 5.000.000" },
      { juara: "Juara 2", hadiah: "Rp 3.000.000" },
    ]),

  media_promosi: Joi.array()
    .items(
      Joi.object({
        platform: Joi.string().required().example("Instagram"),
        link: Joi.string()
          .uri()
          .required()
          .example("https://instagram.com/lombadesainid"),
      })
    )
    .min(0)
    .example([
      { platform: "Instagram", link: "https://instagram.com/lombadesainid" },
      { platform: "Website", link: "https://lombadesain.id" },
    ]),
});

export const PutLombaPayloadSchema = Joi.object({
  judul: Joi.string().max(255).example("Kompetisi Inovasi Teknologi Mahasiswa"),
  penyelenggara: Joi.string()
    .max(255)
    .example("Kementerian Riset dan Teknologi"),
  deskripsi: Joi.string().example(
    "Kompetisi tahunan untuk mahasiswa yang memiliki inovasi teknologi."
  ),
  tema: Joi.string().max(255).allow(null, "").example("Inovasi untuk Negeri"),
  jenis_lomba: Joi.string().max(255).example("Individu"),
  kategori: Joi.array()
    .items(Joi.string())
    .example(["Teknologi", "Lingkungan"]),
  tingkat: Joi.string().max(255).example("Nasional"),
  batas_usia: Joi.string().max(255).allow(null, "").example("18-25"),
  target_peserta: Joi.string()
    .allow(null, "")
    .example("Mahasiswa aktif D3/D4/S1"),
  lokasi: Joi.string().max(255).allow(null, "").example("Jakarta"),
  maksimal_anggota: Joi.number().integer().min(1).example(3),
  biaya_pendaftaran: Joi.number().integer().min(0).example(50000),
  syarat_ketentuan: Joi.array()
    .items(Joi.string())
    .example(["Mahasiswa aktif", "Membawa KTM saat registrasi"]),
  cara_mendaftar: Joi.array()
    .items(Joi.string())
    .example([
      "Daftar di website resmi",
      "Upload proposal dan dokumen pendukung",
    ]),
  link_pendaftaran: Joi.string()
    .uri()
    .max(255)
    .example("https://kompetisiinovasi.id/daftar"),
  jumlah_pendaftar: Joi.number().integer().min(0).example(120),

  timeline: Joi.object({
    pendaftaran_mulai: Joi.string().isoDate().example("2025-08-01"),
    pendaftaran_selesai: Joi.string().isoDate().example("2025-08-31"),
    pengumpulan_karya: Joi.string()
      .isoDate()
      .allow(null, "")
      .example("2025-09-10"),
    deadline_karya: Joi.string()
      .isoDate()
      .allow(null, "")
      .example("2025-09-20"),
    penjurian: Joi.string()
      .max(255)
      .allow(null, "")
      .example("25-30 September 2025"),
    pengumuman: Joi.string().isoDate().allow(null, "").example("2025-10-01"),
  }).optional(),

  kontak: Joi.object({
    email: Joi.string().email().example("info@kompetisiinovasi.id"),
    whatsapp: Joi.string().allow(null, "").example("081234567890"),
    instagram: Joi.string().allow(null, "").example("@kompetisiinovasi"),
  }).optional(),

  hadiah: Joi.array()
    .items(
      Joi.object({
        juara: Joi.string().required().example("Juara 1"),
        hadiah: Joi.string().required().example("Rp10.000.000"),
      })
    )
    .min(0)
    .optional(),

  media_promosi: Joi.array()
    .items(
      Joi.object({
        platform: Joi.string().required().example("Instagram"),
        link: Joi.string()
          .uri()
          .required()
          .example("https://instagram.com/kompetisiinovasi"),
      })
    )
    .min(0)
    .optional(),
}).min(1);
