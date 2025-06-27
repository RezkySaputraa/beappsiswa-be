const routes = (handler) => [
  {
    method: "GET",
    path: "/lomba",
    handler: handler.getCompetitionsHandler,
  },
  {
    method: "GET",
    path: "/lomba/{id}",
    handler: handler.getCompetitionByIdHandler,
  },
];

export default routes;
