import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { SharedUtilServer } from '@cook-show/shared/util-server';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SharedUtilServer,
          useValue: {
            hash: jest.fn(),
            compare: jest.fn(),
          },
        },
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Authentication', () => {
    it('Should authenticate user with success', async () => {
      //Arrange
      const signInDtoMock = {
        email: 'teste@teste.com',
        senha: '123',
      };
      const userMock = {
        id: '5f329a2f-253d-4255-bf89-ce95c5726f48',
        usuario: 'teste',
        email: 'teste@teste.com',
        senha: '123',
        foto_perfil: 'https://google.com',
        created_at: new Date(),
        updated_at: new Date(),
      } as UserEntity;
      const spy = jest
        .spyOn(userService, 'findByEmail')
        .mockResolvedValueOnce(userMock);
      //Act
      const result = authService.signIn(signInDtoMock);
      //Asert
      expect(result).toBeDefined();
      expect(spy).toBeCalledTimes(1);
    });
  });
});
