import { BadRequestException, Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { ErrorCode } from '~/common/enums';
import { JwtPayload } from '~/common/models';
import { UserRepository } from '~/repositories';
import { ChangePasswordDto } from './me.dto';

@Injectable()
export class MeService {
  constructor(private userRepository: UserRepository) {}

  whoAmI({ id }: JwtPayload) {
    return this.userRepository.findOne({ where: { id } }, true);
  }

  async changePassword(
    { id }: JwtPayload,
    { currentPassword, newPassword }: ChangePasswordDto,
  ) {
    if (newPassword === currentPassword) {
      throw new BadRequestException(
        ErrorCode.NEW_PASSWORD_SAME_AS_CURRENT_PASSWORD,
      );
    }
    const { hashedPassword } = await this.userRepository.findOne(
      { select: ['hashedPassword'], where: { id } },
      true,
    );
    if (!compareSync(currentPassword, hashedPassword)) {
      throw new BadRequestException(ErrorCode.INCORRECT_PASSWORD);
    }
    void this.userRepository.update(
      { id },
      { hashedPassword: hashSync(newPassword, 10) },
    );
  }
}
