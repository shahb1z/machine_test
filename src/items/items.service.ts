import {  LoggerService } from '../common/services/logger.service';
import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from './item.schema';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/itemDTO';




@Injectable()
export class ItemsService {
  private readonly items: string[] = []; // Simple array to store items
 
  constructor(  @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
  private readonly logger: LoggerService){}

  // Method to add a new item
  async create(item: any) {
    try{
    this.logger.log(`Creating item with name: ${CreateItemDto.name}`);
    const createdItem = new this.itemModel(item);
    const result = await createdItem.save();
    this.logger.log(`Item created with ID: ${result._id}`);
    return result;
    }catch(error){
        if (error.code === 11000) { 
            throw new Error('Item name must be unique.');
          }

    }
   }
 
  
  async findAll():Promise<any> {
    return await this.itemModel.find();
  }

  
  async findOne(index: number):Promise<any> {
    return await this.itemModel.findById(index);
  }

  async delete(index: number):Promise<any> {
    this.logger.log(`Deleting item with ID: ${index}`);
    const deletedItem = await this.itemModel.findByIdAndDelete(index).exec();
      if (deletedItem) {
        this.logger.log(`Item deleted with ID: ${index}`);
        return deletedItem;
      } else {
        this.logger.warn(`Item with ID: ${index} not found`);
        return null;
      }}
}