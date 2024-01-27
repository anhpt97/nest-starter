import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { OTP_LENGTH, OTP_RESEND_TIME, OTP_TTL } from '~/common/constants';
import { ErrorCode } from '~/common/enums';
import { MailService } from '../mail/mail.service';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class OtpService {
  constructor(
    private redisService: RedisService,
    private mailService: MailService,
  ) {}

  async sendOtp(email: string, payload: { username: string }) {
    const remainingTtl = await this.redisService.ttl(email);
    if (OTP_TTL - remainingTtl <= OTP_RESEND_TIME) {
      throw new HttpException(
        { message: ErrorCode.OTP_LIMIT_REACHED },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    const otp = Math.random()
      .toString()
      .slice(2, 2 + OTP_LENGTH);
    await this.mailService.sendOtp(email, {
      username: payload.username,
      otp,
    });
    void this.redisService.set(email, otp, OTP_TTL);
    return true;
  }

  async verifyOtp(email: string, otp: string) {
    const storedOtp = await this.redisService.get(email);
    if (otp !== storedOtp) {
      throw new BadRequestException(ErrorCode.INVALID_OTP);
    }
    void this.redisService.del(email);
  }
}
