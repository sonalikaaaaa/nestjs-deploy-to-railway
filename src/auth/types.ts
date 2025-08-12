// src/auth/types.ts or src/types/user-request.interface.ts

import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    email: string;
  };
}

export interface PayloadType {
    email: string;
    userId: number;
    artistId?: number;
}

export type Enable2FAType = {
  secret: string;
};
