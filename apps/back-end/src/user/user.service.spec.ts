import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SharedUtilServer } from '@cook-show/shared/util-server';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;
  let sharedUtilServer: SharedUtilServer;

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
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    sharedUtilServer = module.get<SharedUtilServer>(SharedUtilServer);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  const userEntityMock = {
    usuario: 'test',
    email: 'teste@teste.com',
    senha: '123',
    foto_perfil: 'https://google.com',
    id: '2d3c89ad-a920-47a7-ba5d-e7c4b67bb710',
    created_at: new Date(),
    updated_at: new Date(),
  } as UserEntity;

  describe('Create', () => {
    it('Should create a user', async () => {
      //Arange
      const userMock = {
        usuario: 'test',
        email: 'teste@teste.com',
        senha: '123',
        foto_perfil: 'https://google.com',
      };

      jest.spyOn(sharedUtilServer, 'hash').mockResolvedValueOnce('123');
      jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValueOnce({
        insert: jest.fn().mockReturnThis(),
        values: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValueOnce({ raw: [userEntityMock] }),
      } as unknown as SelectQueryBuilder<UserEntity>);
      //Act
      const result = await userService.create(userMock);
      //Assert
      expect(result).toBeDefined();
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('created_at');
      expect(result).toHaveProperty('updated_at');
    });
  });

  describe('database requests', () => {
    it('should find a user by id', async () => {
      //Arrange
      const id = '2d3c89ad-a920-47a7-ba5d-e7c4b67bb710';
      const queryBuilder = {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValueOnce(userEntityMock),
      } as unknown as SelectQueryBuilder<UserEntity>;
      jest
        .spyOn(userRepository, 'createQueryBuilder')
        .mockReturnValueOnce(queryBuilder);
      //Act
      const result = await userService.findById(id);
      //Assert
      expect(result).toEqual(userEntityMock);
    });
  });
});
