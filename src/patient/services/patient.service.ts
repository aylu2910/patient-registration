import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';
import { Repository } from 'typeorm';
import { EmailNotificationStrategy } from '../../notifications/strategy/impl/email-notification.strategy';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly emailNotificationStrategy: EmailNotificationStrategy,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    try {
      const patient = await this.patientRepository.save(createPatientDto);

      return patient;
    } catch (error) {
      throw new HttpException(
        'Failed to create patient' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    return this.patientRepository.find();
  }

  async findOne(id: number) {
    return this.patientRepository.findOneBy({ id });
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    return this.patientRepository.update(id, updatePatientDto);
  }

  async remove(id: number) {
    return this.patientRepository.delete(id);
  }
}
