import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { user, userSchemaFile } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: user.name, schema: userSchemaFile }]),
  ],
  controllers: [ UserController],
  providers: [UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,  // Apply globally or as needed
    }, ],
})
export class UserModule {}
