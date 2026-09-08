import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, Max } from "class-validator";

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
    @Min(-90)
    @Max(90)
    lat:number;

    @IsNotEmpty()
    @IsNumber()
    @Min(-180)
    @Max(180)
    lon:number;

    @IsOptional()
    @IsNumber()
    zoom?:number;
}
