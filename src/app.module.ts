import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { UrlModule } from './modules/url/url.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI', 'mongodb+srv://jacksoncheriyan05:mkp0xbCe7X0PrAyh@cluster0.tmxrmw1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true'),
      }),
    }), 
    AuthModule,
    UserModule,
    UrlModule,
  ],
})
export class AppModule {}
