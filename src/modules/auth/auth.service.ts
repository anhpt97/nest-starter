import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { randomBytes } from 'crypto';
import { ErrorCode } from '~/common/enums';
import { JwtPayload } from '~/common/models';
import { UserRepository } from '~/repositories';
import { MailService } from '../mail/mail.service';
import { LoginDto, ResetPasswordDto } from './auth.dto';
import { LoginResponse } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private mailService: MailService,
  ) {}

  async login({ username, password }: LoginDto) {
    const { id, hashedPassword, role } = await this.userRepository.findOne(
      {
        select: ['id', 'hashedPassword', 'role'],
        where: [{ username }, { email: username }],
      },
      true,
    );
    if (!compareSync(password, hashedPassword)) {
      throw new BadRequestException(ErrorCode.INCORRECT_PASSWORD);
    }
    return new LoginResponse({
      accessToken: this.jwtService.sign({ id, role } as JwtPayload),
    });
  }

  async resetPassword({ email }: ResetPasswordDto) {
    const { id, username } = await this.userRepository.findOne(
      { select: ['id', 'username'], where: { email } },
      true,
    );
    const newPassword = randomBytes(6).toString('hex');
    await this.userRepository.update(
      { id },
      { hashedPassword: hashSync(newPassword, 10) },
    );
    void this.mailService.sendNewPasswordNotification(email, {
      username,
      newPassword,
    });
  }
}
