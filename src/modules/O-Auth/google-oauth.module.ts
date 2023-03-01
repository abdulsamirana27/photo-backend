import { GoogleOauthController } from '@modules/auth/google-oauth.controller';
import { GoogleOauthStrategy } from '@modules/shared/services/google-oauth.strategy';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [GoogleOauthController],
  providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}  