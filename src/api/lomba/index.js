import CompetitionsHandler from "./handler.js"; 
import routes from "./routes.js";             

const lomba = { 
  name: "lomba",
  version: "1.0.0",
  register: async (server, options) => {
    const { service } = options;
    const competitionsHandler = new CompetitionsHandler(service);
    server.route(routes(competitionsHandler));
  },
};

export default lomba;
