import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ErrorCode } from '~/common/enums';
import { AuthController } from './auth.controller';
import { LoginResponse } from './auth.model';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            resetPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = moduleRef.get(AuthController);
    authService = moduleRef.get(AuthService);
  });

  describe('login', () => {
    it('should return access token', async () => {
      const result: LoginResponse = {
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      };
      jest.spyOn(authService, 'login').mockResolvedValue(result);
      await expect(
        authController.login({
          username: 'superadmin',
          password: 'envy1362987212538',
        }),
      ).resolves.toEqual(result);
    });

    it('should throw incorrect password error', async () => {
      const error = new BadRequestException(ErrorCode.INCORRECT_PASSWORD);
      jest.spyOn(authService, 'login').mockRejectedValue(error);
      await expect(
        authController.login({
          username: 'superadmin',
          password: '123456',
        }),
      ).rejects.toThrow(error);
    });
  });
});
