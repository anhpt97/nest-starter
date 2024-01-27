import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXP_TIME, JWT_SECRET_KEY } from '~/common/constants';
import { MailModule } from '../mail/mail.module';
import { RedisModule } from '../redis/redis.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OtpService } from './otp.service';
import { TokenService } from './token.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: JWT_EXP_TIME },
      secret: JWT_SECRET_KEY,
    }),
    MailModule,
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, OtpService, TokenService],
})
export class AuthModule {}
