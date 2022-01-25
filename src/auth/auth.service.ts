import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { config } from 'dotenv';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private httpService: HttpService){}

  async gerarAccessToken(createAuthDto: CreateAuthDto) {

    const parametrosAcesso = {
      'grant_type': 'client_credentials',
      'client_id': config().parsed['CLIENT_ID'],
      'client_secret': config().parsed['CLIENT_SECRET'],
      'username': config().parsed['CLIENT_USERNAME'],
      'password': config().parsed['CLIENT_PASSWORD'],
      'scope': config().parsed['CLIENT_SCOPE']
    }

    const dataAcesso = Object.keys(parametrosAcesso)
                .map((key) => `${key}=${encodeURIComponent(parametrosAcesso[key])}`)
                .join('&');

    const headers =  {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    }
    try {
      
      return await this.httpService.post(`${config().parsed['URL_HOST_AUTH']}${config().parsed['URL_PATH_AUTH']}/token`, dataAcesso , headers) .pipe(
        map((resp) => { return resp.data } ),
      ).toPromise();
    } catch (error) {
      return error;
    }
   
  }

}
