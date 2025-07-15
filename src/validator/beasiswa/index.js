import { PostBeasiswaPayloadSchema, PutBeasiswaPayloadSchema } from './schema.js';
import ClientError from '../../exceptions/ClientError.js';

const BeasiswaValidator = {
  validatePostBeasiswaPayload: (payload) => {
    const validationResult = PostBeasiswaPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new ClientError(validationResult.error.message, 400);
    }
  },
  validatePutBeasiswaPayload: (payload) => {
    const validationResult = PutBeasiswaPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new ClientError(validationResult.error.message, 400);
    }
  },
};

export default BeasiswaValidator;
