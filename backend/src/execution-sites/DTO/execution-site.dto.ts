import { IsString, IsNotEmpty, IsNumber, IsOptional, IsIn, Min, Max } from "class-validator";

export class ExecutionSiteDto{

    @IsNotEmpty()
    @IsNumber()
    cityId:number;

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsIn(['ekzekutim_varrim', 'ekzekutim', 'varrim'])
    type:string;

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
    color:string;

    @IsNotEmpty()
    @IsString()
    description:string;

    @IsOptional()
    @IsNumber()
    fadeMaxRadius?:number;
}
