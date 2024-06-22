import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { ErrorCode } from '~/common/enums';
import { UserRepository } from '~/repositories';
import { MailService } from '../mail/mail.service';
import { LoginDto, ResetPasswordDto } from './auth.dto';
import { LoginResponse } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
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
    return new LoginResponse({
      accessToken: this.jwtService.sign({
        id: user.id,
        username: user.username,
        role: user.role,
      }),
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
