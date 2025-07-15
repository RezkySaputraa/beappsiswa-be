import NotFoundError from "../exceptions/NotFoundError.js"; 
import ClientError from "../exceptions/ClientError.js";     
import { prismaClient } from "../utils/prisma.js";          

class ScholarshipsService {
  async getScholarships() {
    const scholarships = await prismaClient.beasiswa.findMany({
      include: {
        timeline: true,
        kontak: true,
      },
    });

    if (!scholarships || scholarships.length === 0) {
      throw new NotFoundError("Beasiswa tidak ditemukan");
    }

    const result = scholarships.map((scholarship) => ({
      ...scholarship,
      tingkat_pendidikan: JSON.parse(scholarship.tingkat_pendidikan),
      bidang_studi: JSON.parse(scholarship.bidang_studi),
      lokasi: JSON.parse(scholarship.lokasi),
      cakupan: JSON.parse(scholarship.cakupan),
      syarat_ketentuan: JSON.parse(scholarship.syarat_ketentuan),
      dokumen_dibutuhkan: JSON.parse(scholarship.dokumen_dibutuhkan),
    }));

    return result;
  }

  async getScholarshipById(id) {
    const scholarship = await prismaClient.beasiswa.findUnique({
      where: {
        id: id,
      },
      include: {
        timeline: true,
        kontak: true,
      },
    });

    if (!scholarship) {
      throw new NotFoundError("Beasiswa tidak ditemukan");
    }

    const result = {
      ...scholarship,
      tingkat_pendidikan: JSON.parse(scholarship.tingkat_pendidikan),
      bidang_studi: JSON.parse(scholarship.bidang_studi),
      lokasi: JSON.parse(scholarship.lokasi),
      cakupan: JSON.parse(scholarship.cakupan),
      syarat_ketentuan: JSON.parse(scholarship.syarat_ketentuan),
      dokumen_dibutuhkan: JSON.parse(scholarship.dokumen_dibutuhkan),
    };

    return result;
  }

  async addBeasiswa(payload) {
    const {
      timeline,
      kontak,
      tingkat_pendidikan,
      bidang_studi,
      lokasi,
      cakupan,
      syarat_ketentuan,
      dokumen_dibutuhkan,
      ...otherBeasiswaData
    } = payload;

    const stringifiedTingkatPendidikan = JSON.stringify(tingkat_pendidikan || []);
    const stringifiedBidangStudi = JSON.stringify(bidang_studi || []);
    const stringifiedLokasi = JSON.stringify(lokasi || []);
    const stringifiedCakupan = JSON.stringify(cakupan || []);
    const stringifiedSyaratKetentuan = JSON.stringify(syarat_ketentuan || []);
    const stringifiedDokumenDibutuhkan = JSON.stringify(dokumen_dibutuhkan || []);

    const newBeasiswa = await prismaClient.beasiswa.create({
      data: {
        ...otherBeasiswaData,
        tingkat_pendidikan: stringifiedTingkatPendidikan,
        bidang_studi: stringifiedBidangStudi,
        lokasi: stringifiedLokasi,
        cakupan: stringifiedCakupan,
        syarat_ketentuan: stringifiedSyaratKetentuan,
        dokumen_dibutuhkan: stringifiedDokumenDibutuhkan,
        timeline: {
          create: {
            pendaftaran_mulai: new Date(timeline.pendaftaran_mulai),
            pendaftaran_berakhir: new Date(timeline.pendaftaran_berakhir),
          },
        },
        kontak: {
          create: {
            email: kontak.email,
            telepon: kontak.telepon,
          },
        },
      },
      include: {
        timeline: true,
        kontak: true,
      }
    });

    const result = {
      ...newBeasiswa,
      tingkat_pendidikan: JSON.parse(newBeasiswa.tingkat_pendidikan),
      bidang_studi: JSON.parse(newBeasiswa.bidang_studi),
      lokasi: JSON.parse(newBeasiswa.lokasi),
      cakupan: JSON.parse(newBeasiswa.cakupan),
      syarat_ketentuan: JSON.parse(newBeasiswa.syarat_ketentuan),
      dokumen_dibutuhkan: JSON.parse(newBeasiswa.dokumen_dibutuhkan),
    };

    return result;
  }

  async updateBeasiswaById(id, payload) {
    const beasiswaToUpdate = await prismaClient.beasiswa.findUnique({
      where: { id },
      include: {
        timeline: true,
        kontak: true,
      }
    });

    if (!beasiswaToUpdate) {
      throw new NotFoundError('Beasiswa tidak ditemukan');
    }

    const {
      timeline,
      kontak,
      tingkat_pendidikan,
      bidang_studi,
      lokasi,
      cakupan,
      syarat_ketentuan,
      dokumen_dibutuhkan,
      ...otherBeasiswaData
    } = payload;

    const updateBeasiswaData = {};
    if (otherBeasiswaData.judul !== undefined) updateBeasiswaData.judul = otherBeasiswaData.judul;
    if (otherBeasiswaData.penyelenggara !== undefined) updateBeasiswaData.penyelenggara = otherBeasiswaData.penyelenggara;
    if (otherBeasiswaData.deskripsi !== undefined) updateBeasiswaData.deskripsi = otherBeasiswaData.deskripsi;
    if (otherBeasiswaData.jenis_beasiswa !== undefined) updateBeasiswaData.jenis_beasiswa = otherBeasiswaData.jenis_beasiswa;
    if (otherBeasiswaData.durasi !== undefined) updateBeasiswaData.durasi = otherBeasiswaData.durasi;
    if (otherBeasiswaData.status !== undefined) updateBeasiswaData.status = otherBeasiswaData.status;
    if (otherBeasiswaData.link_pendaftaran !== undefined) updateBeasiswaData.link_pendaftaran = otherBeasiswaData.link_pendaftaran;
    if (otherBeasiswaData.jumlah_pendaftar !== undefined) updateBeasiswaData.jumlah_pendaftar = otherBeasiswaData.jumlah_pendaftar;

    if (tingkat_pendidikan !== undefined) updateBeasiswaData.tingkat_pendidikan = JSON.stringify(tingkat_pendidikan);
    if (bidang_studi !== undefined) updateBeasiswaData.bidang_studi = JSON.stringify(bidang_studi);
    if (lokasi !== undefined) updateBeasiswaData.lokasi = JSON.stringify(lokasi);
    if (cakupan !== undefined) updateBeasiswaData.cakupan = JSON.stringify(cakupan);
    if (syarat_ketentuan !== undefined) updateBeasiswaData.syarat_ketentuan = JSON.stringify(syarat_ketentuan);
    if (dokumen_dibutuhkan !== undefined) updateBeasiswaData.dokumen_dibutuhkan = JSON.stringify(dokumen_dibutuhkan);

    const transactions = [
      prismaClient.beasiswa.update({
        where: { id },
        data: updateBeasiswaData,
      }),
    ];

    if (timeline && beasiswaToUpdate.timeline) {
      transactions.push(
        prismaClient.beasiswa_Timeline.update({
          where: { id: beasiswaToUpdate.timeline.id },
          data: {
            pendaftaran_mulai: timeline.pendaftaran_mulai ? new Date(timeline.pendaftaran_mulai) : undefined,
            pendaftaran_berakhir: timeline.pendaftaran_berakhir ? new Date(timeline.pendaftaran_berakhir) : undefined,
          },
        })
      );
    }

    if (kontak && beasiswaToUpdate.kontak) {
      transactions.push(
        prismaClient.beasiswa_Kontak.update({
          where: { id: beasiswaToUpdate.kontak.id },
          data: {
            email: kontak.email,
            telepon: kontak.telepon,
          },
        })
      );
    }

    await prismaClient.$transaction(transactions);
  }

  async deleteBeasiswaById(id) {
    const beasiswaToDelete = await prismaClient.beasiswa.findUnique({
      where: { id },
      include: {
        timeline: true,
        kontak: true,
      }
    });

    if (!beasiswaToDelete) {
      throw new NotFoundError('Beasiswa tidak ditemukan');
    }

    const transactions = [];

    if (beasiswaToDelete.timeline) {
      transactions.push(
        prismaClient.beasiswa_Timeline.delete({
          where: { id: beasiswaToDelete.timeline.id },
        })
      );
    }

    if (beasiswaToDelete.kontak) {
      transactions.push(
        prismaClient.beasiswa_Kontak.delete({
          where: { id: beasiswaToDelete.kontak.id },
        })
      );
    }

    transactions.push(
      prismaClient.beasiswa.delete({
        where: { id },
      })
    );

    await prismaClient.$transaction(transactions);
  }
}

export default ScholarshipsService;
