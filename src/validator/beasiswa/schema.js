import Joi from '@hapi/joi'; // Menggunakan import untuk Joi

export const PostBeasiswaPayloadSchema = Joi.object({ 
  judul: Joi.string().max(255).required(),
  penyelenggara: Joi.string().max(255).required(),
  deskripsi: Joi.string().required(),
  tingkat_pendidikan: Joi.array().items(Joi.string()).required().min(1),
  bidang_studi: Joi.array().items(Joi.string()).required().min(1),
  jenis_beasiswa: Joi.string().max(255).required(),
  lokasi: Joi.array().items(Joi.string()).required().min(1),
  durasi: Joi.string().max(255).required(),
  cakupan: Joi.array().items(Joi.string()).required().min(1),
  syarat_ketentuan: Joi.array().items(Joi.string()).required().min(1),
  dokumen_dibutuhkan: Joi.array().items(Joi.string()).required().min(1),
  status: Joi.string().max(255).required(),
  link_pendaftaran: Joi.string().uri().max(255).required(),
  jumlah_pendaftar: Joi.number().integer().min(0).required(),

  timeline: Joi.object({
    pendaftaran_mulai: Joi.string().isoDate().required(),
    pendaftaran_berakhir: Joi.string().isoDate().required(),
  }).required(),

  kontak: Joi.object({
    email: Joi.string().email().required(),
    telepon: Joi.string().required(),
  }).required(),
});

export const PutBeasiswaPayloadSchema = Joi.object({ 
  judul: Joi.string().max(255),
  penyelenggara: Joi.string().max(255),
  deskripsi: Joi.string(),
  tingkat_pendidikan: Joi.array().items(Joi.string()),
  bidang_studi: Joi.array().items(Joi.string()),
  jenis_beasiswa: Joi.string().max(255),
  lokasi: Joi.array().items(Joi.string()),
  durasi: Joi.string().max(255),
  cakupan: Joi.array().items(Joi.string()),
  syarat_ketentuan: Joi.array().items(Joi.string()),
  dokumen_dibutuhkan: Joi.array().items(Joi.string()),
  status: Joi.string().max(255),
  link_pendaftaran: Joi.string().uri().max(255),
  jumlah_pendaftar: Joi.number().integer().min(0),

  timeline: Joi.object({
    pendaftaran_mulai: Joi.string().isoDate(),
    pendaftaran_berakhir: Joi.string().isoDate(),
  }).optional(),

  kontak: Joi.object({
    email: Joi.string().email(),
    telepon: Joi.string(),
  }).optional(),

}).min(1);
