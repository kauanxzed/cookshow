import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { isReadable } from 'stream';
import { validate } from 'class-validator';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity)
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    it('Should create a user', async () => {
      //Arange
      const userMock = {
        username: 'test',
        email: 'teste@teste.com',
        senha: '123',
        foto_perfil: 'https://google.com',
      };
      const userEntityMock = { ...userMock } as UserEntity;
      jest.spyOn(userRepository, 'create').mockReturnValueOnce(userEntityMock);
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(userEntityMock);
      //Act
      const result = await userService.create(userMock);
      //Assert
      expect(result).toBeUndefined();
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('created_at');
      expect(result).toHaveProperty('updated_at');
    });
  });
});
