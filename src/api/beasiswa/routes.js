import Joi from "joi";
import {
  PostBeasiswaPayloadSchema,
  PutBeasiswaPayloadSchema,
} from "../../validator/beasiswa/schema.js";

const routes = (handler) => [
  {
    method: "GET",
    path: "/api/beasiswa",
    handler: handler.getScholarshipsHandler,
    options: {
      tags: ["api", "Beasiswa"],
      description: "Get all beasiswa",
    },
  },
  {
    method: "GET",
    path: "/api/beasiswa/{id}",
    handler: handler.getScholarshipByIdHandler,
    options: {
      tags: ["api", "Beasiswa"],
      description: "Get a beasiswa by ID",
      validate: {
        params: Joi.object({
          id: Joi.string()
            .required()
            .description("ID beasiswa yang ingin diambil"),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/api/beasiswa",
    handler: handler.postBeasiswaHandler,
    options: {
      tags: ["api", "Beasiswa"],
      description: "Create a new beasiswa",
      validate: {
        payload: PostBeasiswaPayloadSchema,
      },
    },
  },
  {
    method: "PUT",
    path: "/api/beasiswa/{id}",
    handler: handler.putBeasiswaHandler,
    options: {
      tags: ["api", "Beasiswa"],
      description: "Update a beasiswa by ID",
      validate: {
        payload: PutBeasiswaPayloadSchema,
        params: Joi.object({
          id: Joi.string()
            .required()
            .description("ID beasiswa yang ingin diupdate"),
        }),
      },
    },
  },
  {
    method: "DELETE",
    path: "/api/beasiswa/{id}",
    handler: handler.deleteBeasiswaHandler,
    options: {
      tags: ["api", "Beasiswa"],
      description: "Delete a beasiswa by ID",
      validate: {
        params: Joi.object({
          id: Joi.string()
            .required()
            .description("ID beasiswa yang ingin dihapus"),
        }),
      },
    },
  },

  {
    method: "GET",
    path: "/",
    handler: handler.testingApi,
  },
];

export default routes;
