import NotFoundError from "../exceptions/NotFoundError.js";
import { prismaClient } from "../utils/prisma.js";

class ScholarshipsService {
  async getScholarships() {
    const scholarships = await prismaClient.beasiswa.findMany({
      include: {
        timeline: true,
        kontak: true,
      },
    });

    if (!scholarships) {
      throw NotFoundError("Beasiswa tidak ditemukan");
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
      throw NotFoundError("Beasiswa tidak ditemukan");
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
}

export default ScholarshipsService;
