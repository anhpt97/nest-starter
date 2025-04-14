import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { ErrorCode, UserRole, UserStatus } from '~/common/enums';
import { UserRepository } from '~/repositories';
import { MailService } from '../mail/mail.service';
import { LoginResponse } from './auth.model';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let jwtService: JwtService;
  let userRepository: UserRepository;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepository,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: MailService,
          useValue: {
            sendNewPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    jwtService = moduleRef.get(JwtService);
    userRepository = moduleRef.get(UserRepository);
    authService = moduleRef.get(AuthService);
  });

  describe('login', () => {
    it('should return access token', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: '1',
        username: 'superadmin',
        email: '',
        hashedPassword:
          '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC',
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      jest.spyOn(jwtService, 'sign').mockReturnValue(accessToken);
      await expect(
        authService.login({
          username: 'superadmin',
          password: 'envy1362987212538',
        }),
      ).resolves.toEqual<LoginResponse>({ accessToken });
    });

    it('should throw incorrect password error', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue({
        id: '1',
        username: 'superadmin',
        email: '',
        hashedPassword:
          '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqaG3vv1BD7WC',
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await expect(
        authService.login({
          username: 'superadmin',
          password: '123456',
        }),
      ).rejects.toThrow(new BadRequestException(ErrorCode.INCORRECT_PASSWORD));
    });
  });
});
