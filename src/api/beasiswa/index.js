import ScholarshipsHandler from "./handler.js";
import routes from "./routes.js";

export default {
  name: "scholarships",
  version: "1.0.0",
  register: async (server, { service }) => {
    const scholarshipsHandler = new ScholarshipsHandler(service);
    server.route(routes(scholarshipsHandler));
  },
};
