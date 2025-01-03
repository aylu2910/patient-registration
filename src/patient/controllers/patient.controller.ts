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
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { NotificationContext } from '../../notifications/notification.context';
import { EmailNotificationStrategy } from '../../notifications/strategy/impl/email-notification.strategy';

@Controller('patients')
export class PatientController {
  private readonly context: NotificationContext;

  constructor(
    private readonly patientService: PatientService,
    private readonly emailNotificationStrategy: EmailNotificationStrategy,
  ) {
    this.context = new NotificationContext(this.emailNotificationStrategy);
  }

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    try {
      const result = await this.patientService.create(createPatientDto);

      if (result) {
        this.context
          .executeNotification(createPatientDto.email)
          .catch((error) => {
            console.error('Notification failed:', error.message);
          });
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
