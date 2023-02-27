import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@modules/shared/services/config.service";
import { JwtStrategy } from "@modules/shared/services/jwt.strategy";
import { QueryService } from "@modules/shared/services/query.service";

const providers =[
    ConfigService,
    JwtStrategy,
    JwtService,
    QueryService
]
@Global()
@Module({
    imports: [],
    providers: [...providers],
    exports:[...providers],
})
export class SharedModule {}
