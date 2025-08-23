import { Injectable } from '@nestjs/common';
import { Post } from '@nestjs/common'
@Injectable({})
export class AuthService {
// test(){}

signup() {

     return {msg: 'I have signed up'}
}
   
signin() {
    return { msg: 'i have signed in'}
   }
   
}




