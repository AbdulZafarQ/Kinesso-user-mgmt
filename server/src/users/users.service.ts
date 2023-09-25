import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private usersModal: Model<Users>) { }

    async findAll(): Promise<Users[]> {
        return this.usersModal.find().exec();
    }

    async create(createCustomersDto: CreateUserDto): Promise<any> {
        try {
            const checkEmail = await this.usersModal.findOne({ email: createCustomersDto.email })
            if (checkEmail) throw new Error('Email already exists');
            const res = await this.usersModal.create(createCustomersDto)
            return res
        }
        catch (error) {
            return {
                message: error.message,
            }
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
        return this.usersModal.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }

    async remove(id: string): Promise<any> {
        try {
            const res = await this.usersModal.findByIdAndRemove(id)
            if (!res) throw new Error('Not Found')
            return 'Deleted Successfully'
        } catch (error) {
            return {
                message: error.message,
            }
        }

    }
}
