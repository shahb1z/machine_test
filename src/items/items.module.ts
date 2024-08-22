import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './item.schema';
import { LoggerService } from 'src/common/services/logger.service';

@Module({
  imports:[ MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }])],
  controllers: [ItemsController],
  providers: [ItemsService,LoggerService]
})
export class ItemsModule {}
