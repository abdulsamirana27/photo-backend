import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleOauthController } from './google-oauth.controller';

@Module({
  controllers: [AuthController, GoogleOauthController],
  providers: [AuthService]
})
export class AuthModule {}
