import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class EraDto{

    @IsNotEmpty()
    @IsNumber()
    cityId:number;

    @IsNotEmpty()
    @IsString()
    label:string;

    @IsNotEmpty()
    @IsNumber()
    startYear:number;

    @IsNotEmpty()
    @IsNumber()
    endYear:number;
}
