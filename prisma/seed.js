import { prismaClient } from "../src/utils/prisma.js";

async function main() {
  // === SEED TIMELINE BEASISWA ===
  const beasiswaTimeline1 = await prismaClient.beasiswa_Timeline.create({
    data: {
      pendaftaran_mulai: new Date("2025-01-10"),
      pendaftaran_berakhir: new Date("2025-03-31"),
    },
  });

  const beasiswaTimeline2 = await prismaClient.beasiswa_Timeline.create({
    data: {
      pendaftaran_mulai: new Date("2025-04-01"),
      pendaftaran_berakhir: new Date("2025-06-30"),
    },
  });

  // === SEED KONTAK BEASISWA ===
  const beasiswaKontak1 = await prismaClient.beasiswa_Kontak.create({
    data: {
      email: "info@lpdp.kemenkeu.go.id",
      telepon: "+62211500123",
    },
  });

  const beasiswaKontak2 = await prismaClient.beasiswa_Kontak.create({
    data: {
      email: "beasiswa@dikti.go.id",
      telepon: "+622167891234",
    },
  });

  // === SEED BEASISWA ===
  await prismaClient.beasiswa.createMany({
    data: [
      {
        id: "beasiswa-001",
        judul: "Beasiswa LPDP 2025",
        penyelenggara: "Kemenkeu RI",
        deskripsi: "Beasiswa LPDP pembiayaan penuh...",
        tingkat_pendidikan: JSON.stringify(["S2", "S3"]),
        bidang_studi: JSON.stringify(["Teknik", "Ekonomi"]),
        jenis_beasiswa: "Penuh",
        lokasi: JSON.stringify(["Dalam Negeri", "Luar Negeri"]),
        durasi: "2 tahun",
        cakupan: JSON.stringify(["Biaya kuliah", "Biaya hidup"]),
        syarat_ketentuan: JSON.stringify(["WNI", "IPK minimal 3.0"]),
        dokumen_dibutuhkan: JSON.stringify(["KTP", "Transkrip"]),
        status: "pendaftaran",
        link_pendaftaran: "https://lpdp.kemenkeu.go.id",
        jumlah_pendaftar: 3500,
        timeline_id: beasiswaTimeline1.id,
        kontak_id: beasiswaKontak1.id,
      },
      {
        id: "beasiswa-002",
        judul: "Beasiswa Dikti Unggulan",
        penyelenggara: "Kemdikbud RI",
        deskripsi: "Beasiswa untuk dosen/peneliti...",
        tingkat_pendidikan: JSON.stringify(["S3"]),
        bidang_studi: JSON.stringify(["Pendidikan", "Sains"]),
        jenis_beasiswa: "Parsial",
        lokasi: JSON.stringify(["Dalam Negeri"]),
        durasi: "4 tahun",
        cakupan: JSON.stringify(["Biaya kuliah"]),
        syarat_ketentuan: JSON.stringify(["WNI", "Usia maks 40"]),
        dokumen_dibutuhkan: JSON.stringify(["KTP", "Proposal"]),
        status: "pendaftaran",
        link_pendaftaran: "https://beasiswa.dikti.go.id",
        jumlah_pendaftar: 1200,
        timeline_id: beasiswaTimeline2.id,
        kontak_id: beasiswaKontak2.id,
      },
    ],
  });

  // === SEED TIMELINE LOMBA ===
  const lombaTimeline1 = await prismaClient.lomba_Timeline.create({
    data: {
      pendaftaran_mulai: new Date("2025-07-01"),
      pendaftaran_selesai: new Date("2025-07-30"),
      pengumpulan_karya: new Date("2025-08-01"),
      deadline_karya: new Date("2025-08-15"),
      penjurian: "2025-08-16 - 2025-08-20",
      pengumuman: new Date("2025-08-21"),
    },
  });

  const lombaTimeline2 = await prismaClient.lomba_Timeline.create({
    data: {
      pendaftaran_mulai: new Date("2025-05-24"),
      pendaftaran_selesai: new Date("2025-08-13"),
      pengumpulan_karya: new Date("2025-09-01"),
      deadline_karya: new Date("2025-09-15"),
      penjurian: "2025-08-16 - 2025-09-20",
      pengumuman: new Date("2025-09-21"),
    },
  });

  const lombaKontak1 = await prismaClient.lomba_Kontak.create({
    data: {
      email: "lomba@xyz.ac.id",
      whatsapp: "+6281234567890",
      instagram: "@lomba.xyz",
    },
  });

  const lombaKontak2 = await prismaClient.lomba_Kontak.create({
    data: {
      email: "dicoding@xyz.ac.id",
      whatsapp: "+6285362355520",
      instagram: "@dicoding.xyz",
    },
  });

  // === SEED LOMBA ===
  const lomba1 = await prismaClient.lomba.create({
    data: {
      id: "lomba-001",
      judul: "Lomba Desain Poster Nasional",
      penyelenggara: "Universitas XYZ",
      deskripsi: "Lomba poster tema lingkungan...",
      tema: "Hijaukan Bumi",
      jenis_lomba: "Desain Grafis",
      kategori: JSON.stringify(["Pelajar", "Mahasiswa"]),
      tingkat: "Nasional",
      batas_usia: "Max 25 tahun",
      target_peserta: "Siswa dan Mahasiswa se-Indonesia",
      lokasi: "Jakarta",
      maksimal_anggota: 3,
      biaya_pendaftaran: 25000,
      syarat_ketentuan: JSON.stringify(["Karya orisinal", "Format JPG"]),
      cara_mendaftar: JSON.stringify(["Isi form", "Upload bukti bayar"]),
      link_pendaftaran: "https://lomba-xyz.ac.id/daftar",
      jumlah_pendaftar: 428,
      timeline_id: lombaTimeline1.id,
      kontak_id: lombaKontak1.id,
    },
  });

  const lomba2 = await prismaClient.lomba.create({
    data: {
      id: "lomba-002",
      judul: "Hackathon Permikomnas",
      penyelenggara: "Permikomnas RI",
      deskripsi: "Lomba future techonology",
      tema: "Goverment Tech",
      jenis_lomba: "Software Development",
      kategori: JSON.stringify(["Umum", "Mahasiswa"]),
      tingkat: "Nasional",
      batas_usia: "Max 25 tahun",
      target_peserta: "Umum dan Mahasiswa se-Indonesia",
      lokasi: "Jakarta",
      maksimal_anggota: 5,
      biaya_pendaftaran: 50000,
      syarat_ketentuan: JSON.stringify(["Karya orisinal", " No AI"]),
      cara_mendaftar: JSON.stringify(["Isi form", "Upload bukti bayar"]),
      link_pendaftaran: "https://hackathon-xyz.ac.id/daftar",
      jumlah_pendaftar: 3023,
      timeline_id: lombaTimeline2.id,
      kontak_id: lombaKontak2.id,
    },
  });

  // === SEED HADIAH LOMBA ===
  await prismaClient.lomba_Hadiah.createMany({
    data: [
      {
        lomba_id: lomba1.id,
        juara: "Juara 1",
        hadiah: "Rp 5.000.000 + Sertifikat",
      },
      { lomba_id: lomba1.id, juara: "Juara 2", hadiah: "Rp 3.000.000" },
      { lomba_id: lomba1.id, juara: "Juara 3", hadiah: "Rp 1.500.000" },
      {
        lomba_id: lomba2.id,
        juara: "Juara 1",
        hadiah: "Rp 50.000.000 + Sertifikat",
      },
      { lomba_id: lomba2.id, juara: "Juara 2", hadiah: "Rp 30.000.000" },
      { lomba_id: lomba2.id, juara: "Juara 3", hadiah: "Rp 15.000.000" },
    ],
  });

  // === SEED MEDIA PROMOSI ===
  await prismaClient.lomba_MediaPromosi.createMany({
    data: [
      {
        lomba_id: lomba1.id,
        platform: "Instagram",
        link: "https://instagram.com/lomba.xyz",
      },
      {
        lomba_id: lomba1.id,
        platform: "Tiktok",
        link: "https://tiktok.com/@lomba.xyz",
      },
      {
        lomba_id: lomba1.id,
        platform: "Youtube",
        link: "https://youtube.com/lomba_xyz",
      },
      {
        lomba_id: lomba2.id,
        platform: "Instagram",
        link: "https://instagram.com/hackathon.xyz",
      },
      {
        lomba_id: lomba2.id,
        platform: "Tiktok",
        link: "https://tiktok.com/@hackathon.xyz",
      },
      {
        lomba_id: lomba2.id,
        platform: "Youtube",
        link: "https://youtube.com/hackathon_xyz",
      },
    ],
  });
}

main()
  .then(() => {
    console.log("Seed data berhasil");
    return prismaClient.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prismaClient.$disconnect();
    process.exit(1);
  });
