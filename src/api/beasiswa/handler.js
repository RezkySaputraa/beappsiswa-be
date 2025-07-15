import ClientError from "../../exceptions/ClientError.js";

class ScholarshipsHandler { 
  constructor(service) {
    this.service = service;
  }

  getScholarshipsHandler = async (request, h) => { 
    try {
      const scholarships = await this.service.getScholarships(); 
      return h.response({
        status: "success",
        data: {
          scholarships,
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

  getScholarshipByIdHandler = async (request, h) => { 
    try {
      const { id } = request.params;
      const scholarship = await this.service.getScholarshipById(id); 
      return h.response({
        status: "success",
        data: {
          scholarship,
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

  postBeasiswaHandler = async (request, h) => { 
    try {
      const payload = request.payload;
      const beasiswa = await this.service.addBeasiswa(payload); 

      return h.response({
        status: 'success',
        message: 'Beasiswa berhasil ditambahkan',
        data: {
          beasiswa,
        },
      }).code(201);
    } catch (error) {
      console.error(error);
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }
      return h.response({
        status: 'error',
        message: 'Terjadi kegagalan pada server kami.',
      }).code(500);
    }
  };

  putBeasiswaHandler = async (request, h) => { 
    try {
      const { id } = request.params;
      const payload = request.payload;

      await this.service.updateBeasiswaById(id, payload); 

      return h.response({
        status: 'success',
        message: 'Beasiswa berhasil diperbarui',
      }).code(200);
    } catch (error) {
      console.error(error);
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }
      return h.response({
        status: 'error',
        message: 'Terjadi kegagalan pada server kami.',
      }).code(500);
    }
  };

  deleteBeasiswaHandler = async (request, h) => { 
    try {
      const { id } = request.params;

      await this.service.deleteBeasiswaById(id); 

      return h.response({
        status: 'success',
        message: 'Beasiswa berhasil dihapus',
      }).code(200);
    } catch (error) {
      console.error(error);
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }
      return h.response({
        status: 'error',
        message: 'Terjadi kegagalan pada server kami.',
      }).code(500);
    }
  };
}

export default ScholarshipsHandler;
