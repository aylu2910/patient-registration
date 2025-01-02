import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { CreatePatientDto } from '../dtos/create-patient.dto';
import { UpdatePatientDto } from '../dtos/update-patient.dto';
import { NotificationContext } from '../notifications/notification.context';
import { EmailNotificationStrategy } from '../notifications/strategy/impl/email-notification.strategy';

@Controller('patients')
export class PatientController {
  emailStrategy = new EmailNotificationStrategy();
  context = new NotificationContext(this.emailStrategy);

  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    try {
      const result = await this.patientService.create(createPatientDto);
      //check if status is 201
      if (result) {
        await this.context.executeNotification(
          'ayluOre',
          'testing email strategy',
        );
      }
      return { message: 'Patient registered successfully', data: result };
    } catch (error) {
      throw new HttpException(
        { message: 'Failed to register patient', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    return await this.patientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const patient = await this.patientService.findOne(+id);
    if (!patient) {
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }
    return patient;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return await this.patientService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.patientService.remove(+id);
  }
}
