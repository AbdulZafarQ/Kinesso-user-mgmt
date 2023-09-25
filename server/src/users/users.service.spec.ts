import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { Users } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(Users.name),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userModel = module.get<Model<Users>>(getModelToken(Users.name));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [];

      jest.spyOn(userModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(result),
      } as any);

      expect(await usersService.findAll()).toBe(result);
    });
  });

  describe('create', () => {

    it('should throw an error if email already exists', async () => {
      const createUserDto: CreateUserDto = {
        // Define your DTO properties here
        name: 'test',
        email: 'test3@test.com',
        phone: '1234567890',
      };

      jest.spyOn(userModel, 'findOne').mockReturnValue(createUserDto.email as any);

      jest.spyOn(userModel, 'create').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(createUserDto),
      } as any);

      const result = await usersService.create(createUserDto);

      expect(result).toEqual({
        message: 'Email already exists',
      });

    });

    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        // Define your DTO properties here
        name: 'test',
        email: 'test3@test.com',
        phone: '1234567890',
      };

      jest.spyOn(userModel, 'findOne').mockReturnValue(null as any);

      jest.spyOn(userModel, 'create').mockReturnValue(createUserDto as any);

      const result = await usersService.create(createUserDto);

      expect(result).toEqual(createUserDto);


    });

    it('should throw an error if email already exists', async () => {
      const createUserDto: CreateUserDto = {
        // Define your DTO properties here
        name: 'test',
        email: 'test@test.com',
        phone: '1234567890',
      };


      try {
        await usersService.create(createUserDto);
      } catch (error) {
        expect(error.message).toBe('Email already exists');
      }
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const userId = '650f4dd5ddf56acc80f1eaed';
      const updateUserDto: UpdateUserDto = {
        // Define your DTO properties here
        name: 'test1',
        email: 'test@test.com',
        phone: '1234567890',
      };

      jest.spyOn(userModel, 'findByIdAndUpdate').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(updateUserDto),
      } as any);

      const result = await usersService.update(userId, updateUserDto);
      console.log(result)

      expect(result).toBe(updateUserDto);

    })

  })

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      const userId = '650f4dd5ddf56acc80f1eaed';

      jest.spyOn(userModel, 'findByIdAndRemove').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(true),
      } as any);

      expect(await usersService.remove(userId)).toBe('Deleted Successfully');

    });

    it('should throw an error if user not found', async () => {
      const userId = '650f4dd5ddf56acc80f1eaed';


      try {
        await usersService.remove(userId);
      } catch (error) {
        expect(error.message).toBe('Not Found');
      }
    });
  });
});
