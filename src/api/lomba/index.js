import CompetitionsHandler from "./handler.js";
import routes from "./routes.js";

export default {
  name: "competitions",
  version: "1.0.0",
  register: async (server, { service }) => {
    const competitionsHandler = new CompetitionsHandler(service);
    server.route(routes(competitionsHandler));
  },
};
