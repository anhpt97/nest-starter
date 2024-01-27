import { JwtPayload as _JwtPayload } from 'jsonwebtoken';
import { UserRole } from '~/common/enums';

export interface JwtPayload extends _JwtPayload {
  id: number;
  username: string;
  role: UserRole;
}
