import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { RedisCacheService } from '../redis/rediscache.service';
import * as uuid from 'uuid';

@Injectable()
export class CustomersService {

  constructor(
    @InjectRedis() private readonly redisCacheService: RedisCacheService,
 
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const _uuid = uuid.v4();
    const customerData = { id: _uuid, ...createCustomerDto };

    await this.redisCacheService.set(`customer:${_uuid}`, `${JSON.stringify(customerData)}` )

    return { status: true , message: "Customer salvo com sucesso.", customerData: customerData  }
  }

  async findOne(id: string) {
    
    const redisData = await this.redisCacheService.get(`customer:${id}`);
    if(redisData !== null){
      return { status: true , message: "" , customerData: JSON.parse(String(redisData)) }
    }
    
    return { status: false, message: "Nenhuma informação encontrada." }
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    
    if(Object.keys(updateCustomerDto).length>0){

      const redisData = await this.redisCacheService.get(`customer:${id}`);
      let data = JSON.parse(String(redisData))
      const newCustomerData = { ...data, ...updateCustomerDto }

      await this.redisCacheService.set(`customer:${id}`, `${JSON.stringify(newCustomerData)}` )

      return { status: true , message: "Informações atualizadas com sucesso.", customerData: newCustomerData }
      
    }else{
      return { status: false , message: "Nenhuma informação atualizada."  }
    }
    
    
  }

}
