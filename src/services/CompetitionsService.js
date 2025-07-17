import NotFoundError from "../exceptions/NotFoundError.js";
import ClientError from "../exceptions/ClientError.js";
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

    if (!competitions || competitions.length === 0) {
      throw new NotFoundError("Lomba tidak ditemukan");
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
      throw new NotFoundError("Lomba tidak ditemukan");
    }

    const result = {
      ...competition,
      kategori: JSON.parse(competition.kategori),
      syarat_ketentuan: JSON.parse(competition.syarat_ketentuan),
      cara_mendaftar: JSON.parse(competition.cara_mendaftar),
    };

    return result;
  }

  async addLomba(payload) {
    const {
      timeline,
      kontak,
      hadiah,
      media_promosi,
      kategori,
      syarat_ketentuan,
      cara_mendaftar,
      ...otherLombaData
    } = payload;

    const stringifiedKategori = JSON.stringify(kategori || []);
    const stringifiedSyaratKetentuan = JSON.stringify(syarat_ketentuan || []);
    const stringifiedCaraMendaftar = JSON.stringify(cara_mendaftar || []);

    const newLomba = await prismaClient.lomba.create({
      data: {
        ...otherLombaData,
        kategori: stringifiedKategori,
        syarat_ketentuan: stringifiedSyaratKetentuan,
        cara_mendaftar: stringifiedCaraMendaftar,
        timeline: {
          create: {
            pendaftaran_mulai: new Date(timeline.pendaftaran_mulai),
            pendaftaran_selesai: new Date(timeline.pendaftaran_selesai),
            ...(timeline.pengumpulan_karya && {
              pengumpulan_karya: new Date(timeline.pengumpulan_karya),
            }),
            ...(timeline.deadline_karya && {
              deadline_karya: new Date(timeline.deadline_karya),
            }),
            ...(timeline.penjurian && { penjurian: timeline.penjurian }),
            ...(timeline.pengumuman && {
              pengumuman: new Date(timeline.pengumuman),
            }),
          },
        },
        kontak: {
          create: {
            email: kontak.email,
            ...(kontak.whatsapp && { whatsapp: kontak.whatsapp }),
            ...(kontak.instagram && { instagram: kontak.instagram }),
          },
        },
        ...(hadiah &&
          hadiah.length > 0 && {
            hadiah: {
              create: hadiah,
            },
          }),
        ...(media_promosi &&
          media_promosi.length > 0 && {
            media_promosi: {
              create: media_promosi,
            },
          }),
      },
      include: {
        timeline: true,
        kontak: true,
        hadiah: true,
        media_promosi: true,
      },
    });

    const result = {
      ...newLomba,
      kategori: JSON.parse(newLomba.kategori),
      syarat_ketentuan: JSON.parse(newLomba.syarat_ketentuan),
      cara_mendaftar: JSON.parse(newLomba.cara_mendaftar),
    };

    return result;
  }

  async updateLombaById(id, payload) {
    const lombaToUpdate = await prismaClient.lomba.findUnique({
      where: { id },
      include: {
        timeline: true,
        kontak: true,
        hadiah: true,
        media_promosi: true,
      },
    });

    if (!lombaToUpdate) {
      throw new NotFoundError("Lomba tidak ditemukan");
    }

    const {
      timeline,
      kontak,
      hadiah,
      media_promosi,
      kategori,
      syarat_ketentuan,
      cara_mendaftar,
      ...otherLombaData
    } = payload;

    const transactions = [];

    const updateLombaData = {};
    if (otherLombaData.judul !== undefined)
      updateLombaData.judul = otherLombaData.judul;
    if (otherLombaData.penyelenggara !== undefined)
      updateLombaData.penyelenggara = otherLombaData.penyelenggara;
    if (otherLombaData.deskripsi !== undefined)
      updateLombaData.deskripsi = otherLombaData.deskripsi;
    if (otherLombaData.tema !== undefined)
      updateLombaData.tema = otherLombaData.tema;
    if (otherLombaData.jenis_lomba !== undefined)
      updateLombaData.jenis_lomba = otherLombaData.jenis_lomba;
    if (otherLombaData.tingkat !== undefined)
      updateLombaData.tingkat = otherLombaData.tingkat;
    if (otherLombaData.batas_usia !== undefined)
      updateLombaData.batas_usia = otherLombaData.batas_usia;
    if (otherLombaData.target_peserta !== undefined)
      updateLombaData.target_peserta = otherLombaData.target_peserta;
    if (otherLombaData.lokasi !== undefined)
      updateLombaData.lokasi = otherLombaData.lokasi;
    if (otherLombaData.maksimal_anggota !== undefined)
      updateLombaData.maksimal_anggota = otherLombaData.maksimal_anggota;
    if (otherLombaData.biaya_pendaftaran !== undefined)
      updateLombaData.biaya_pendaftaran = otherLombaData.biaya_pendaftaran;
    if (otherLombaData.link_pendaftaran !== undefined)
      updateLombaData.link_pendaftaran = otherLombaData.link_pendaftaran;
    if (otherLombaData.jumlah_pendaftar !== undefined)
      updateLombaData.jumlah_pendaftar = otherLombaData.jumlah_pendaftar;

    if (kategori !== undefined)
      updateLombaData.kategori = JSON.stringify(kategori);
    if (syarat_ketentuan !== undefined)
      updateLombaData.syarat_ketentuan = JSON.stringify(syarat_ketentuan);
    if (cara_mendaftar !== undefined)
      updateLombaData.cara_mendaftar = JSON.stringify(cara_mendaftar);

    transactions.push(
      prismaClient.lomba.update({
        where: { id },
        data: updateLombaData,
      })
    );

    if (timeline && lombaToUpdate.timeline) {
      transactions.push(
        prismaClient.lomba_Timeline.update({
          where: { id: lombaToUpdate.timeline.id },
          data: {
            pendaftaran_mulai: timeline.pendaftaran_mulai
              ? new Date(timeline.pendaftaran_mulai)
              : undefined,
            pendaftaran_selesai: timeline.pendaftaran_selesai
              ? new Date(timeline.pendaftaran_selesai)
              : undefined,
            ...(timeline.pengumpulan_karya !== undefined && {
              pengumpulan_karya: timeline.pengumpulan_karya
                ? new Date(timeline.pengumpulan_karya)
                : null,
            }),
            ...(timeline.deadline_karya !== undefined && {
              deadline_karya: timeline.deadline_karya
                ? new Date(timeline.deadline_karya)
                : null,
            }),
            ...(timeline.penjurian !== undefined && {
              penjurian: timeline.penjurian,
            }),
            ...(timeline.pengumuman !== undefined && {
              pengumuman: timeline.pengumuman
                ? new Date(timeline.pengumuman)
                : null,
            }),
          },
        })
      );
    }

    if (kontak && lombaToUpdate.kontak) {
      transactions.push(
        prismaClient.lomba_Kontak.update({
          where: { id: lombaToUpdate.kontak.id },
          data: {
            email: kontak.email,
            ...(kontak.whatsapp !== undefined && { whatsapp: kontak.whatsapp }),
            ...(kontak.instagram !== undefined && {
              instagram: kontak.instagram,
            }),
          },
        })
      );
    }

    if (hadiah !== undefined) {
      transactions.push(
        prismaClient.lomba_Hadiah.deleteMany({ where: { lomba_id: id } })
      );
      if (hadiah.length > 0) {
        transactions.push(
          prismaClient.lomba_Hadiah.createMany({
            data: hadiah.map((h) => ({ ...h, lomba_id: id })),
          })
        );
      }
    }

    if (media_promosi !== undefined) {
      transactions.push(
        prismaClient.lomba_MediaPromosi.deleteMany({ where: { lomba_id: id } })
      );
      if (media_promosi.length > 0) {
        transactions.push(
          prismaClient.lomba_MediaPromosi.createMany({
            data: media_promosi.map((mp) => ({ ...mp, lomba_id: id })),
          })
        );
      }
    }

    await prismaClient.$transaction(transactions);
  }

  async deleteLombaById(id) {
    const lombaToDelete = await prismaClient.lomba.findUnique({
      where: { id },
    });

    if (!lombaToDelete) {
      throw new NotFoundError("Lomba tidak ditemukan");
    }

    await prismaClient.lomba.delete({
      where: { id },
    });
  }
}

export default CompetitionsService;
