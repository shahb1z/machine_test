import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseFilters } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/itemDTO';
import { HttpExceptionFilter } from 'src/common/filters/exception.filter';

@Controller('items')
@UseFilters(HttpExceptionFilter)
export class ItemsController {
   
      constructor(private readonly itemsService: ItemsService) {}
    
      @Post()
     create(@Body('item') item: CreateItemDto){
        if (!item) {
          throw new HttpException('Item is required', HttpStatus.BAD_REQUEST);
        }
         return this.itemsService.create(item);
          
      }


      @Get()
      findAll():any {
        return this.itemsService.findAll();
      }
    
      @Get(':index')
      findOne(@Param('index') index: number): any {
        const item = this.itemsService.findOne(index);
        if (!item) {
          throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
        }
        return item;
      }
    
      @Delete(':index')
      delete(@Param('index') index: number): void {
        this.itemsService.delete(index);
      }
    }   
