import Joi from "joi"; // Menggunakan import untuk Joi

export const PostBeasiswaPayloadSchema = Joi.object({
  judul: Joi.string()
    .max(255)
    .required()
    .example("Beasiswa Unggulan Mahasiswa Indonesia"),
  penyelenggara: Joi.string().max(255).required().example("Kemendikbudristek"),
  deskripsi: Joi.string()
    .required()
    .example("Beasiswa untuk mahasiswa berprestasi di seluruh Indonesia."),
  tingkat_pendidikan: Joi.array()
    .items(Joi.string().example("S1"))
    .required()
    .min(1),
  bidang_studi: Joi.array()
    .items(Joi.string().example("Teknik Informatika"))
    .required()
    .min(1),
  jenis_beasiswa: Joi.string().max(255).required().example("Beasiswa Penuh"),
  lokasi: Joi.array()
    .items(Joi.string().example("Indonesia"))
    .required()
    .min(1),
  durasi: Joi.string().max(255).required().example("4 tahun"),
  cakupan: Joi.array()
    .items(Joi.string().example("Uang Kuliah"))
    .required()
    .min(1),
  syarat_ketentuan: Joi.array()
    .items(Joi.string().example("IPK minimal 3.5"))
    .required()
    .min(1),
  dokumen_dibutuhkan: Joi.array()
    .items(Joi.string().example("KTP, Transkrip Nilai"))
    .required()
    .min(1),
  status: Joi.string().max(255).required().example("Dibuka"),
  link_pendaftaran: Joi.string()
    .uri()
    .max(255)
    .required()
    .example("https://beasiswa.kemdikbud.go.id"),
  jumlah_pendaftar: Joi.number().integer().min(0).required().example(100),

  timeline: Joi.object({
    pendaftaran_mulai: Joi.string()
      .isoDate()
      .required()
      .example("2025-08-01"),
    pendaftaran_berakhir: Joi.string()
      .isoDate()
      .required()
      .example("2025-09-01"),
  }).required(),

  kontak: Joi.object({
    email: Joi.string().email().required().example("kontak@beasiswa.id"),
    telepon: Joi.string().required().example("+6281234567890"),
  }).required(),
});

export const PutBeasiswaPayloadSchema = Joi.object({
  judul: Joi.string().max(255).example("Beasiswa Perubahan Judul"),
  penyelenggara: Joi.string().max(255).example("Lembaga Baru"),
  deskripsi: Joi.string().example("Deskripsi telah diperbarui."),
  tingkat_pendidikan: Joi.array().items(Joi.string().example("S2")),
  bidang_studi: Joi.array().items(Joi.string().example("Manajemen")),
  jenis_beasiswa: Joi.string().max(255).example("Beasiswa Parsial"),
  lokasi: Joi.array().items(Joi.string().example("Jepang")),
  durasi: Joi.string().max(255).example("2 tahun"),
  cakupan: Joi.array().items(Joi.string().example("Akomodasi")),
  syarat_ketentuan: Joi.array().items(Joi.string().example("IPK minimal 3.0")),
  dokumen_dibutuhkan: Joi.array().items(Joi.string().example("Paspor, Ijazah")),
  status: Joi.string().max(255).example("Ditutup"),
  link_pendaftaran: Joi.string()
    .uri()
    .max(255)
    .example("https://beasiswa.lainnya.id"),
  jumlah_pendaftar: Joi.number().integer().min(0).example(200),

  timeline: Joi.object({
    pendaftaran_mulai: Joi.string()
      .isoDate()
      .example("2025-10-01"),
    pendaftaran_berakhir: Joi.string()
      .isoDate()
      .example("2025-11-01"),
  }).optional(),

  kontak: Joi.object({
    email: Joi.string().email().example("update@beasiswa.id"),
    telepon: Joi.string().example("+6282222222222"),
  }).optional(),
}).min(1);
