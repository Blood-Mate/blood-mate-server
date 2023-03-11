import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ContactModule } from 'src/contact/contact.module';
import { Contact } from 'src/entities/contact.entity';
import { Guardian } from 'src/entities/guardian.entity';
import { PrivatePostShare } from 'src/entities/private-post-share.entity';
import { PrivatePost } from 'src/entities/private-post.entity';
import { PublicPost } from 'src/entities/public-post.entity';
import { User } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        Contact,
        PublicPost,
        PrivatePost,
        PrivatePostShare,
        Guardian,
      ],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    ContactModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
