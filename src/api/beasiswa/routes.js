const routes = (handler) => [
  {
    method: "GET",
    path: "/api/beasiswa",
    handler: handler.getScholarshipsHandler,
  },
  {
    method: "GET",
    path: "/api/beasiswa/{id}",
    handler: handler.getScholarshipByIdHandler,
  },
];

export default routes;
