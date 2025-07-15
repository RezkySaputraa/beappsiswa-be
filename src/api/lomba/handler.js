import ClientError from "../../exceptions/ClientError.js";

class CompetitionsHandler {
  constructor(service) {
    this.service = service;
  }

  getCompetitionsHandler = async (request, h) => { 
    try {
      const competitions = await this.service.getCompetitions();
      return h.response({
        status: "success",
        data: {
          competitions,
        },
      }).code(200);
    } catch (error) {
      console.error(error);
      if (error instanceof ClientError) {
        return h.response({
          status: "fail",
          message: error.message,
        }).code(error.statusCode);
      }
      return h.response({
        status: "error",
        message: "Terjadi kegagalan pada server kami.",
      }).code(500);
    }
  };

  getCompetitionByIdHandler = async (request, h) => { 
    try {
      const { id } = request.params;
      const competition = await this.service.getCompetitionById(id);
      return h.response({
        status: "success",
        data: {
          competition,
        },
      }).code(200);
    } catch (error) {
      console.error(error);
      if (error instanceof ClientError) {
        return h.response({
          status: "fail",
          message: error.message,
        }).code(error.statusCode);
      }
      return h.response({
        status: "error",
        message: "Terjadi kegagalan pada server kami.",
      }).code(500);
    }
  };

  postLombaHandler = async (request, h) => {
    try {
      const payload = request.payload;

      if (payload.timeline) {
          if (payload.timeline.pendaftaran_mulai) payload.timeline.pendaftaran_mulai = new Date(payload.timeline.pendaftaran_mulai);
          if (payload.timeline.pendaftaran_selesai) payload.timeline.pendaftaran_selesai = new Date(payload.timeline.pendaftaran_selesai);
          if (payload.timeline.pengumpulan_karya) payload.timeline.pengumpulan_karya = new Date(payload.timeline.pengumpulan_karya);
          if (payload.timeline.deadline_karya) payload.timeline.deadline_karya = new Date(payload.timeline.deadline_karya);
          if (payload.timeline.pengumuman) payload.timeline.pengumuman = new Date(payload.timeline.pengumuman);
      }

      const lomba = await this.service.addLomba(payload);

      return h.response({
        status: "success",
        message: "Lomba berhasil ditambahkan",
        data: {
          lomba,
        },
      }).code(201);
    } catch (error) {
      console.error(error);
      if (error instanceof ClientError) {
        return h.response({
          status: "fail",
          message: error.message,
        }).code(error.statusCode);
      }
      return h.response({
        status: "error",
        message: "Terjadi kegagalan pada server kami.",
      }).code(500);
    }
  };

  putLombaHandler = async (request, h) => {
    try {
      const { id } = request.params;
      const payload = request.payload;

      if (payload.timeline) {
          if (payload.timeline.pendaftaran_mulai) payload.timeline.pendaftaran_mulai = new Date(payload.timeline.pendaftaran_mulai);
          if (payload.timeline.pendaftaran_selesai) payload.timeline.pendaftaran_selesai = new Date(payload.timeline.pendaftaran_selesai);
          if (payload.timeline.pengumpulan_karya) payload.timeline.pengumpulan_karya = new Date(payload.timeline.pengumpulan_karya);
          if (payload.timeline.deadline_karya) payload.timeline.deadline_karya = new Date(payload.timeline.deadline_karya);
          if (payload.timeline.pengumuman) payload.timeline.pengumuman = new Date(payload.timeline.pengumuman);
      }

      await this.service.updateLombaById(id, payload);

      return h.response({
        status: "success",
        message: "Lomba berhasil diperbarui",
      }).code(200);
    } catch (error) {
      console.error(error);
      if (error instanceof ClientError) {
        return h.response({
          status: "fail",
          message: error.message,
        }).code(error.statusCode);
      }
      return h.response({
        status: "error",
        message: "Terjadi kegagalan pada server kami.",
      }).code(500);
    }
  };

  deleteLombaHandler = async (request, h) => { 
    try {
      const { id } = request.params;

      await this.service.deleteLombaById(id);

      return h.response({
        status: "success",
        message: "Lomba berhasil dihapus",
      }).code(200);
    } catch (error) {
      console.error(error);
      if (error instanceof ClientError) {
        return h.response({
          status: "fail",
          message: error.message,
        }).code(error.statusCode);
      }
      return h.response({
        status: "error",
        message: "Terjadi kegagalan pada server kami.",
      }).code(500);
    }
  };
}

export default CompetitionsHandler;
