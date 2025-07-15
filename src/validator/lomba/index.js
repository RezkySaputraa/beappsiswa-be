import { PostLombaPayloadSchema, PutLombaPayloadSchema } from './schema.js';
import ClientError from '../../exceptions/ClientError.js';

const LombaValidator = {
  validatePostLombaPayload: (payload) => {
    const validationResult = PostLombaPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new ClientError(validationResult.error.message, 400);
    }
  },
  validatePutLombaPayload: (payload) => {
    const validationResult = PutLombaPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new ClientError(validationResult.error.message, 400);
    }
  },
};

export default LombaValidator;
