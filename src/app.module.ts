import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientModule } from './patient/modules/patient.module';
import { Patient } from './patient/entities/patient.entity';
import { MailerModule } from './mailer/mailer.module';
import { MailerService } from './mailer/mailer.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3307,
      database: 'patients',
      entities: [Patient],
      username: 'testuser',
      password: 'testuser123',
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    PatientModule,
    MailerModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailerService],
})
export class AppModule {}
