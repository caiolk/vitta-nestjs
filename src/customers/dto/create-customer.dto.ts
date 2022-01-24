import { IsString } from "class-validator";

export class CreateCustomerDto {
    
    @IsString({ each: true })
    readonly document: string;

    @IsString({ each: true })
    readonly name: string;
}
