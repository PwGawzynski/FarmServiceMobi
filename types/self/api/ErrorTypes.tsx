import { HttpStatusCode } from 'axios';

export type ErrorCause = {
  cause?: HttpStatusCode;
};
