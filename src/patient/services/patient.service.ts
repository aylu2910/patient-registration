import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    console.log(`This action adds a new patient`);
    return this.patientRepository.save(createPatientDto);
  }

  async findAll() {
    console.log(`This action returns all patient`);
    return this.patientRepository.find();
  }

  async findOne(id: number) {
    console.log(`This action returns a #${id} patient`);
    return this.patientRepository.findOneBy({ id });
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    console.log(`This action updates a #${id} patient`);
    return this.patientRepository.update(id, updatePatientDto);
  }

  async remove(id: number) {
    console.log(`This action removes a #${id} patient`);
    return this.patientRepository.delete(id);
  }
}
