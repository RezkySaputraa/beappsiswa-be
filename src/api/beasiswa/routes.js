const routes = (handler) => [
  {
    method: "GET",
    path: "/beasiswa",
    handler: handler.getScholarshipsHandler,
  },
  {
    method: "GET",
    path: "/beasiswa/{id}",
    handler: handler.getScholarshipByIdHandler,
  },
];

export default routes;
