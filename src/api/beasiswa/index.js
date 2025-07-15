import ScholarshipsHandler from "./handler.js"; 
import routes from "./routes.js";             

const beasiswa = {
  name: "beasiswa",
  version: "1.0.0",
  register: async (server, options) => {
    const { service } = options;
    const scholarshipsHandler = new ScholarshipsHandler(service);
    server.route(routes(scholarshipsHandler));
  },
};

export default beasiswa;
