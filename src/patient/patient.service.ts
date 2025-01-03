import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from '../patient/dto/create-patient.dto';
import { UpdatePatientDto } from '../patient/dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    return this.patientRepository.save(createPatientDto);
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
