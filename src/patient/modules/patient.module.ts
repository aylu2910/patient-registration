import { Module } from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { PatientController } from '../controllers/patient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';
import { EmailNotificationStrategy } from '../../notifications/strategy/impl/email-notification.strategy';
import { MailerService } from '../../mailer/mailer.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientController],
  providers: [
    PatientService,
    EmailNotificationStrategy,
    MailerService,
    ConfigService,
  ],
})
export class PatientModule {}
