import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, Max } from "class-validator";

export class SiteDto{

    @IsNotEmpty()
    @IsNumber()
    cityId:number;

    @IsNotEmpty()
    @IsString()
    dosja:string;

    @IsNotEmpty()
    @IsString()
    objekti:string;

    @IsNotEmpty()
    @IsString()
    tipiRaw:string;

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

    @IsNotEmpty()
    @IsString()
    fondi:string;

    @IsOptional()
    @IsString()
    dataHapjes?:string;

    @IsOptional()
    @IsString()
    dataMbylljes?:string;
}
