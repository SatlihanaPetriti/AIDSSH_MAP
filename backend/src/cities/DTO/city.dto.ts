import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CityDto{

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    slug:string;

    @IsOptional()
    @IsString()
    subtitle?:string;

    @IsNotEmpty()
    @IsNumber()
    lat:number;

    @IsNotEmpty()
    @IsNumber()
    lon:number;

    @IsOptional()
    @IsNumber()
    zoom?:number;
}
