import NotFoundError from "../exceptions/NotFoundError.js";
import { prismaClient } from "../utils/prisma.js";

class CompetitionsService {
  async getCompetitions() {
    const competitions = await prismaClient.lomba.findMany({
      include: {
        timeline: true,
        kontak: true,
        hadiah: true,
        media_promosi: true,
      },
    });

    if (!competitions) {
      throw NotFoundError("Lomba tidak ditemukan");
    }

    const result = competitions.map((competition) => ({
      ...competition,
      kategori: JSON.parse(competition.kategori),
      syarat_ketentuan: JSON.parse(competition.syarat_ketentuan),
      cara_mendaftar: JSON.parse(competition.cara_mendaftar),
    }));

    return result;
  }

  async getCompetitionById(id) {
    const competition = await prismaClient.lomba.findUnique({
      where: {
        id: id,
      },
      include: {
        timeline: true,
        kontak: true,
        hadiah: true,
        media_promosi: true,
      },
    });

    if (!competition) {
      throw NotFoundError("Lomba tidak ditemukan");
    }

    const result = {
      ...competition,
      kategori: JSON.parse(competition.kategori),
      syarat_ketentuan: JSON.parse(competition.syarat_ketentuan),
      cara_mendaftar: JSON.parse(competition.cara_mendaftar),
    };

    return result;
  }
}

export default CompetitionsService;
