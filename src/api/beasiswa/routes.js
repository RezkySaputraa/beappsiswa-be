import { PostBeasiswaPayloadSchema, PutBeasiswaPayloadSchema } from '../../validator/beasiswa/schema.js';

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
  {
    method: "POST",
    path: "/api/beasiswa",
    handler: handler.postBeasiswaHandler, 
    options: {
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
      validate: {
        payload: PutBeasiswaPayloadSchema, 
      },
    },
  },
  {
    method: "DELETE",
    path: "/api/beasiswa/{id}",
    handler: handler.deleteBeasiswaHandler,
  }
];

export default routes;
