import { CreateUserDto } from './UserDto/userDTO';
import { user, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from 'src/items/item.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(  @InjectModel(user.name) private readonly  userModel: Model<UserDocument>){}

    async create(createUserDto:any) {
        const createdItem = new this.userModel(createUserDto);
        const result = await createdItem.save();
        return result;
      }
  
  
      async findAll():Promise<any> {
        return await this.userModel.find();
      }

      async findOne(email: string):Promise<any> {
        return await this.userModel.findById(email);
      }

      async delete(index: number):Promise<any> {
        const deletedItem = await this.userModel.findByIdAndDelete(index).exec();
          if (deletedItem) {
            return deletedItem;
          } else {
            return null;
          }}
}
