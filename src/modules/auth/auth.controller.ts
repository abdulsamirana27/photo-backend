import { Authenticate } from '@dtos/auth/authenticate.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    @Post('/authenticate')
    async authenticate(@Body() body:Authenticate) {
        return body;
    }
}
