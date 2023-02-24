import { AuthModule } from '@modules/auth/auth.module';
import { SharedModule } from '@modules/shared/shared.module';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ConfigService } from '@services/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ErrorFilter } from './filters/exception.filters';
import { HttpInterceptor } from './interceptor/http.interceptor';

const modules = [
  AuthModule,
  SharedModule,
  TypeOrmModule.forRootAsync({
    useFactory: (configService: ConfigService) =>
      configService.typeOrmConfig,
    inject: [ConfigService],
  }),
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get("JWT_SECRET_KEY"),
      signOptions: { expiresIn: configService.get('JWT_EXPIRE') }
    }),
  }),
]
const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: HttpInterceptor,
  }
]
const filters = [
  {
    provide: APP_FILTER,
    useClass: ErrorFilter,
  },
]
@Module({
  imports: [...modules],
  controllers: [AppController],
  providers: [AppService,...interceptors,...filters],
})
export class AppModule {}
