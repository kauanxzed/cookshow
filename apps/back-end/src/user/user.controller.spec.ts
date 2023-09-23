import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Create user', () => {
    it('Should create a new user with success', async () => {
      //Arange
      const userMock = {
        usuario: 'test',
        email: 'teste@teste.com',
        senha: '123',
        foto_perfil: 'https://google.com',
      };
      const userEntityMock = { ...userMock } as UserEntity;
      jest.spyOn(userService, 'create').mockResolvedValueOnce(userEntityMock);
      //Act
      const result = await userController.create(userMock);
      //Assert
      expect(result).toBeDefined();
    });
  });
});
