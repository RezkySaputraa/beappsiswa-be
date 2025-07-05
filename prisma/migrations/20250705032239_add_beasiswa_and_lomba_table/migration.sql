-- CreateTable
CREATE TABLE "beasiswa" (
    "id" VARCHAR(100) NOT NULL,
    "judul" VARCHAR(255) NOT NULL,
    "penyelenggara" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tingkat_pendidikan" TEXT NOT NULL,
    "bidang_studi" TEXT NOT NULL,
    "jenis_beasiswa" VARCHAR(255) NOT NULL,
    "lokasi" TEXT NOT NULL,
    "durasi" VARCHAR(255) NOT NULL,
    "cakupan" TEXT NOT NULL,
    "syarat_ketentuan" TEXT NOT NULL,
    "dokumen_dibutuhkan" TEXT NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "link_pendaftaran" VARCHAR(255) NOT NULL,
    "jumlah_pendaftar" INTEGER NOT NULL,
    "timeline_id" TEXT NOT NULL,
    "kontak_id" TEXT NOT NULL,

    CONSTRAINT "beasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beasiswa_timeline" (
    "id" TEXT NOT NULL,
    "pendaftaran_mulai" DATE NOT NULL,
    "pendaftaran_berakhir" DATE NOT NULL,

    CONSTRAINT "beasiswa_timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "beasiswa_kontak" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telepon" TEXT NOT NULL,

    CONSTRAINT "beasiswa_kontak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lomba" (
    "id" VARCHAR(100) NOT NULL,
    "judul" VARCHAR(255) NOT NULL,
    "penyelenggara" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "tema" VARCHAR(255) NOT NULL,
    "jenis_lomba" VARCHAR(255) NOT NULL,
    "kategori" TEXT NOT NULL,
    "tingkat" VARCHAR(255) NOT NULL,
    "batas_usia" VARCHAR(255) NOT NULL,
    "target_peserta" TEXT NOT NULL,
    "lokasi" VARCHAR(255) NOT NULL,
    "maksimal_anggota" INTEGER NOT NULL,
    "biaya_pendaftaran" INTEGER NOT NULL,
    "syarat_ketentuan" TEXT NOT NULL,
    "cara_mendaftar" TEXT NOT NULL,
    "link_pendaftaran" VARCHAR(255) NOT NULL,
    "jumlah_pendaftar" INTEGER NOT NULL,
    "timeline_id" TEXT NOT NULL,
    "kontak_id" TEXT NOT NULL,

    CONSTRAINT "lomba_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lomba_timeline" (
    "id" TEXT NOT NULL,
    "pendaftaran_mulai" DATE NOT NULL,
    "pendaftaran_selesai" DATE NOT NULL,
    "pengumpulan_karya" DATE NOT NULL,
    "deadline_karya" DATE NOT NULL,
    "penjurian" VARCHAR(255) NOT NULL,
    "pengumuman" DATE NOT NULL,

    CONSTRAINT "lomba_timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lomba_kontak" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "instagram" TEXT NOT NULL,

    CONSTRAINT "lomba_kontak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lomba_hadiah" (
    "id" TEXT NOT NULL,
    "lomba_id" TEXT NOT NULL,
    "juara" TEXT NOT NULL,
    "hadiah" TEXT NOT NULL,

    CONSTRAINT "lomba_hadiah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lomba_media_promosi" (
    "id" TEXT NOT NULL,
    "lomba_id" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "lomba_media_promosi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "beasiswa_timeline_id_key" ON "beasiswa"("timeline_id");

-- CreateIndex
CREATE UNIQUE INDEX "lomba_timeline_id_key" ON "lomba"("timeline_id");

-- AddForeignKey
ALTER TABLE "beasiswa" ADD CONSTRAINT "beasiswa_timeline_id_fkey" FOREIGN KEY ("timeline_id") REFERENCES "beasiswa_timeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beasiswa" ADD CONSTRAINT "beasiswa_kontak_id_fkey" FOREIGN KEY ("kontak_id") REFERENCES "beasiswa_kontak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lomba" ADD CONSTRAINT "lomba_timeline_id_fkey" FOREIGN KEY ("timeline_id") REFERENCES "lomba_timeline"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lomba" ADD CONSTRAINT "lomba_kontak_id_fkey" FOREIGN KEY ("kontak_id") REFERENCES "lomba_kontak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lomba_hadiah" ADD CONSTRAINT "lomba_hadiah_lomba_id_fkey" FOREIGN KEY ("lomba_id") REFERENCES "lomba"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lomba_media_promosi" ADD CONSTRAINT "lomba_media_promosi_lomba_id_fkey" FOREIGN KEY ("lomba_id") REFERENCES "lomba"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
