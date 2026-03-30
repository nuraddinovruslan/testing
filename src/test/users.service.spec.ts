import { getRepositoryToken } from "@nestjs/typeorm"
import { User } from "src/users/entities/user.entity"
import { UsersService } from "src/users/users.service"
import {Test} from "@nestjs/testing"
const mockRepo = () => ({
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
})

describe("UserService", () => {
    let service: UsersService
    let repo: any

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UsersService,
                {provide: getRepositoryToken(User), useFactory: mockRepo}
            ]
        }).compile()

        service = module.get(UsersService)
        repo = (await module).get(getRepositoryToken(User))
    })
})