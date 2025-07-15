import { PostLombaPayloadSchema, PutLombaPayloadSchema } from '../../validator/lomba/schema.js';

const routes = (handler) => [ 
  {
    method: "GET",
    path: "/api/lomba",
    handler: handler.getCompetitionsHandler, 
  },
  {
    method: "GET",
    path: "/api/lomba/{id}",
    handler: handler.getCompetitionByIdHandler, 
  },
  {
    method: "POST",
    path: "/api/lomba",
    handler: handler.postLombaHandler, 
    options: {
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
      validate: {
        payload: PutLombaPayloadSchema, 
      },
    },
  },
  {
    method: "DELETE",
    path: "/api/lomba/{id}",
    handler: handler.deleteLombaHandler, 
  }
];

export default routes;
