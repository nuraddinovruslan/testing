import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';

const mockRepo = () => ({
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let repo: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockRepo, 
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });


it("create user", async () => {
  const dto = {name: "ali", email: "ali@gmail.com"}

  repo.create.mockReturnValue(dto)
  repo.save.mockResolvedValue({id: 1, ...dto})

  expect(await service.create(dto)).toEqual({id: 1, ...dto})
})

it("find all user", async () => {
  const users = [{id: 1, name: "ali", email: "ali@gmail.com"}]

  repo.find.mockResolvedValue(users)

  expect(await service.findAll()).toHaveLength(1)
})

it("find one user", async () => {
  const user = {id: 1, name: "ali", email: "ali@gmail.com"}

  repo.findOne.mockResolvedValue(user)
  expect(await service.findOne(1)).toEqual(user)
})

it("throw error", async () => {
  repo.findOne.mockResolvedValue(null)

  await expect(service.findOne(999)).rejects.toThrow(NotFoundException)
})

it("update user", async () => {
  const exist = {id: 1, name: "ali", email: "ali@gmail.com"}
  const updated = {id: 1, name: "vali", email: "ali@gmail.com"}

  repo.findOne.mockResolvedValue(exist)
  repo.save.mockResolvedValue(updated)

  expect(await service.update(1, {name: "vali"})).toEqual(updated)
})

it("delete user", async () => {
  const exist = {id: 1, name: "ali", email: "ali@gmail.com"}

  repo.findOne.mockResolvedValue(exist)
  repo.remove.mockResolvedValue(exist)

  expect(await service.remove(1)).toEqual(exist)
})

})