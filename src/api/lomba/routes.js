import Joi from "joi";
import {
  PostLombaPayloadSchema,
  PutLombaPayloadSchema,
} from "../../validator/lomba/schema.js";

const routes = (handler) => [
  {
    method: "GET",
    path: "/api/lomba",
    handler: handler.getCompetitionsHandler,
    options: {
      description: "Get all lomba",
      tags: ["api", "Lomba"],
    },
  },
  {
    method: "GET",
    path: "/api/lomba/{id}",
    handler: handler.getCompetitionByIdHandler,
    options: {
      description: "Get a lomba by ID",
      tags: ["api", "Lomba"],
      validate: {
        params: Joi.object({
          id: Joi.string()
            .required()
            .description("ID lomba yang ingin diambil"),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/api/lomba",
    handler: handler.postLombaHandler,
    options: {
      description: "Create a new lomba",
      tags: ["api", "Lomba"],
      validate: {
        payload: PostLombaPayloadSchema,
      },
    },
  },
  {
    method: "PUT",
    path: "/api/lomba/{id}",
    handler: handler.putLombaHandler,
    options: {
      description: "Update a lomba by ID",
      tags: ["api", "Lomba"],
      validate: {
        payload: PutLombaPayloadSchema,
        params: Joi.object({
          id: Joi.string()
            .required()
            .description("ID lomba yang ingin diupdate"),
        }),
      },
    },
  },
  {
    method: "DELETE",
    path: "/api/lomba/{id}",
    handler: handler.deleteLombaHandler,
    options: {
      description: "Delete a lomba by ID",
      tags: ["api", "Lomba"],
      validate: {
        params: Joi.object({
          id: Joi.string()
            .required()
            .description("ID lomba yang ingin dihapus"),
        }),
      },
    },
  },
];

export default routes;
