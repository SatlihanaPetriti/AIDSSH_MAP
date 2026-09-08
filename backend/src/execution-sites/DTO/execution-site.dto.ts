import { IsString, IsNotEmpty, IsNumber, IsOptional, IsIn } from "class-validator";

export class ExecutionSiteDto{

    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsIn(['ekzekutim_varrim', 'ekzekutim', 'varrim'])
    type:string;

    @IsNotEmpty()
    @IsNumber()
    lat:number;

    @IsNotEmpty()
    @IsNumber()
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
