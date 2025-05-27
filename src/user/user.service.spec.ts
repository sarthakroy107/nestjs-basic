/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './repositories/user.repository';
import { UserRoleEnum } from './user.model';

const mockUserRepository = () => ({
  find: jest.fn(),
});

const mockUser = {
  id: 'randomId',
  name: 'Sarthak',
  email: 'sarthak@gmail.com',
  age: 21,
  role: UserRoleEnum.ADMIN,
  password: '12345678',
};

describe('User Service Tests', () => {
  let userService: UserService;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    userService = await module.get(UserService);
    userRepository = await module.get(UserRepository);
  });

  describe('findAllUsers', () => {
    it('Get all saved users', async () => {
      expect(userRepository.find).not.toHaveBeenCalled();
      userRepository.find.mockResolvedValue([mockUser]);
      const result = await userService.findAllUsers({});
      // console.log(result);

      expect(result).toEqual([
        {
          age: 21,
          email: 'sarthak@gmail.com',
          id: 'randomId',
          name: 'Sarthak',
          password: '12345678',
          role: 'ADMIN',
        },
      ]);
    });
  });

  describe('findAllUsers and filter using role', () => {
    it('Get all saved users', async () => {
      expect(userRepository.find).not.toHaveBeenCalled();
      userRepository.find.mockResolvedValue([mockUser]);
      const result = await userService.findAllUsers({
        role: UserRoleEnum.EMPLOYEE,
      });
      // console.log(result);

      expect(result).toEqual([]);
    });
  });
});
