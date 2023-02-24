import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Helmet helps you secure your Express apps by setting various HTTP headers.
  app.use((req,res,next)=>{
    if(req.secure){
      return helmet()
    }
    next()
  }); 
  app.enableCors({
    allowedHeaders: '*',
    origin:'*',
    credentials: true,
  });
  //not extra parameter use this 
  app.useGlobalPipes(new ValidationPipe({ transform: true , whitelist:true, forbidNonWhitelisted:true  }));
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('Photo backend')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app
    .listen(process.env.PORT)
    .then(() => console.log('Server is running on port ' + process.env.PORT))
    .catch((err) => console.log(err));
}
bootstrap();
