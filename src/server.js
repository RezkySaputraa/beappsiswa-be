import Hapi from "@hapi/hapi";
import ClientError from "./exceptions/ClientError.js";
import dotenv from "dotenv";
import ScholarshipsService from "./services/ScholarshipsService.js";
import CompetitionsService from "./services/CompetitionsService.js";
import scholarships from "./api/beasiswa/index.js";
import competitions from "./api/lomba/index.js";
dotenv.config();

const init = async () => {
  const scholarshipsService = new ScholarshipsService();
  const competitionsService = new CompetitionsService();

  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register([
    {
      plugin: scholarships,
      options: {
        service: scholarshipsService,
      },
    },
    {
      plugin: competitions,
      options: {
        service: competitionsService,
      },
    },
  ]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    if (response.isBoom) {
      const newResponse = h.response({
        status: "error",
        message: "Maaf, terjadi kegagalan pada server kami.",
      });
      newResponse.code(500);
      return newResponse;
    }
    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
