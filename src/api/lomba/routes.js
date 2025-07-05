const routes = (handler) => [
  {
    method: "GET",
    path: "/api/lomba",
    handler: handler.getCompetitionsHandler,
  },
  {
    method: "GET",
    path: "/api/lomba/{id}",
    handler: handler.getCompetitionByIdHandler,
  },
];

export default routes;
