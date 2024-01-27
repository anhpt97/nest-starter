import { BadRequestException, Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { ErrorCode, UserRole } from '~/common/enums';
import { UserRepository } from '~/repositories';
import { MailService } from '../mail/mail.service';
import {
  LoginDto,
  RefreshTokenDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from './auth.dto';
import { OtpService } from './otp.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService,
    private otpService: OtpService,
    private mailService: MailService,
  ) {}

  async login({ username, password }: LoginDto) {
    const user = await this.userRepository.findOne(
      {
        select: ['id', 'username', 'email', 'hashedPassword', 'role'],
        where: [{ username }, { email: username }],
      },
      true,
    );
    if (!compareSync(password, user.hashedPassword)) {
      throw new BadRequestException(ErrorCode.INVALID_PASSWORD);
    }
    if (user.role === UserRole.ADMIN) {
      return this.tokenService.create({
        id: user.id,
        username: user.username,
        role: user.role,
      });
    }
    return this.otpService.sendOtp(user.email, { username: user.username });
  }

  async verifyOtp({ username, otp }: VerifyOtpDto) {
    const user = await this.userRepository.findOne(
      {
        select: ['id', 'username', 'email', 'role'],
        where: [{ username }, { email: username }],
      },
      true,
    );
    await this.otpService.verifyOtp(user.email, otp);
    return this.tokenService.create({
      id: user.id,
      username: user.username,
      role: user.role,
    });
  }

  async refreshToken({ refreshToken }: RefreshTokenDto) {
    const { id } = await this.tokenService.verify(refreshToken);
    const user = await this.userRepository.findOne(
      { select: ['id', 'username', 'role'], where: { id } },
      true,
    );
    void this.tokenService.delete(refreshToken);
    return this.tokenService.create({
      id: user.id,
      username: user.username,
      role: user.role,
    });
  }

  async resetPassword({ email }: ResetPasswordDto) {
    const user = await this.userRepository.findOne(
      { select: ['id', 'username'], where: { email } },
      true,
    );
    const newPassword = '123456';
    await this.mailService.sendNewPassword(email, {
      username: user.username,
      newPassword,
    });
    void this.userRepository.update(
      { id: user.id },
      { hashedPassword: hashSync(newPassword, 10) },
    );
    return true;
  }
}
