import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res, BadRequestException, NotFoundException } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';


@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customersService.create(createCustomerDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  
  async findOne(@Param('id') id: string) {
    const costumer = await this.customersService.findOne(id);

    if(costumer.status === false){
      throw new NotFoundException('Customer não encontrado');
    }
    return this.customersService.findOne(id);

  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    const costumer = await this.customersService.findOne(id);

    if(costumer.status === false){
      throw new NotFoundException('Customer não encontrado');
    }
    return await this.customersService.update(id, updateCustomerDto);
  }

}
