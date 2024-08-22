import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export type UserDocument=user & Document;

@Schema()
export class user{

@Prop()
name:string

@Prop()
email:string

@Prop()
role:string


@Prop()
password:string

}

export const userSchemaFile=SchemaFactory.createForClass(user);