class CompetitionsHandler {
  constructor(service) {
    this.service = service;
  }

  getCompetitionsHandler = async () => {
    const competitions = await this.service.getCompetitions();
    return {
      status: "success",
      data: {
        competitions,
      },
    };
  };

  getCompetitionByIdHandler = async (request) => {
    const { id } = request.params;
    const competition = await this.service.getCompetitionById(id);
    return {
      status: "success",
      data: {
        competition,
      },
    };
  };
}

export default CompetitionsHandler;
