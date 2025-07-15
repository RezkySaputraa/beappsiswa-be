import Joi from '@hapi/joi';

export const PostLombaPayloadSchema = Joi.object({
  judul: Joi.string().max(255).required(),
  penyelenggara: Joi.string().max(255).required(),
  deskripsi: Joi.string().required(),
  tema: Joi.string().max(255).allow(null, ''), 
  jenis_lomba: Joi.string().max(255).required(),
  kategori: Joi.array().items(Joi.string()).required().min(1),
  tingkat: Joi.string().max(255).required(),
  batas_usia: Joi.string().max(255).allow(null, ''), 
  target_peserta: Joi.string().allow(null, ''), 
  lokasi: Joi.string().max(255).allow(null, ''), 
  maksimal_anggota: Joi.number().integer().min(1).required(),
  biaya_pendaftaran: Joi.number().integer().min(0).required(),
  syarat_ketentuan: Joi.array().items(Joi.string()).required().min(1),
  cara_mendaftar: Joi.array().items(Joi.string()).required().min(1),
  link_pendaftaran: Joi.string().uri().max(255).required(),
  jumlah_pendaftar: Joi.number().integer().min(0).required(),

  timeline: Joi.object({
    pendaftaran_mulai: Joi.string().isoDate().required(),
    pendaftaran_selesai: Joi.string().isoDate().required(),
    pengumpulan_karya: Joi.string().isoDate().allow(null, ''), 
    deadline_karya: Joi.string().isoDate().allow(null, ''),     
    penjurian: Joi.string().max(255).allow(null, ''),             
    pengumuman: Joi.string().isoDate().allow(null, ''),         
  }).required(),

  kontak: Joi.object({
    email: Joi.string().email().required(),
    whatsapp: Joi.string().allow(null, ''), 
    instagram: Joi.string().allow(null, ''), 
  }).required(),

  hadiah: Joi.array().items(Joi.object({
    juara: Joi.string().required(),
    hadiah: Joi.string().required(),
    rank: Joi.number().integer().min(1).optional(),
  })).min(0), 

  media_promosi: Joi.array().items(Joi.object({
    platform: Joi.string().required(),
    link: Joi.string().uri().required(),
  })).min(0),
});

export const PutLombaPayloadSchema = Joi.object({
  judul: Joi.string().max(255),
  penyelenggara: Joi.string().max(255),
  deskripsi: Joi.string(),
  tema: Joi.string().max(255).allow(null, ''),
  jenis_lomba: Joi.string().max(255),
  kategori: Joi.array().items(Joi.string()),
  tingkat: Joi.string().max(255),
  batas_usia: Joi.string().max(255).allow(null, ''),
  target_peserta: Joi.string().allow(null, ''),
  lokasi: Joi.string().max(255).allow(null, ''),
  maksimal_anggota: Joi.number().integer().min(1),
  biaya_pendaftaran: Joi.number().integer().min(0),
  syarat_ketentuan: Joi.array().items(Joi.string()),
  cara_mendaftar: Joi.array().items(Joi.string()),
  link_pendaftaran: Joi.string().uri().max(255),
  jumlah_pendaftar: Joi.number().integer().min(0),

  timeline: Joi.object({
    pendaftaran_mulai: Joi.string().isoDate(),
    pendaftaran_selesai: Joi.string().isoDate(),
    pengumpulan_karya: Joi.string().isoDate().allow(null, ''),
    deadline_karya: Joi.string().isoDate().allow(null, ''),
    penjurian: Joi.string().max(255).allow(null, ''),
    pengumuman: Joi.string().isoDate().allow(null, ''),
  }).optional(),

  kontak: Joi.object({
    email: Joi.string().email(),
    whatsapp: Joi.string().allow(null, ''),
    instagram: Joi.string().allow(null, ''),
  }).optional(),

  hadiah: Joi.array().items(Joi.object({
    juara: Joi.string().required(),
    hadiah: Joi.string().required(),
    rank: Joi.number().integer().min(1).optional(),
  })).min(0).optional(),

  media_promosi: Joi.array().items(Joi.object({
    platform: Joi.string().required(),
    link: Joi.string().uri().required(),
  })).min(0).optional(),

}).min(1);
