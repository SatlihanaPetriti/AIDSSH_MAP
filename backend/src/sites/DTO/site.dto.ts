import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

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
    lat:number;

    @IsNotEmpty()
    @IsNumber()
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
