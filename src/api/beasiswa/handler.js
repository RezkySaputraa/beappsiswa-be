class ScholarshipsHandler {
  constructor(service) {
    this.service = service;
  }

  getScholarshipsHandler = async () => {
    const scholarships = await this.service.getScholarships();
    return {
      status: "success",
      data: {
        scholarships,
      },
    };
  };

  getScholarshipByIdHandler = async (request) => {
    const { id } = request.params;
    const scholarship = await this.service.getScholarshipById(id);
    return {
      status: "success",
      data: {
        scholarship,
      },
    };
  };
}

export default ScholarshipsHandler;
