import { Test, TestingModule } from '@nestjs/testing';
import { PatientService } from './patient.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from '../entities/patient.entity';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';

describe('PatientService', () => {
  let service: PatientService;
  let repository: Repository<Patient>;

  const mockPatientRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: getRepositoryToken(Patient),
          useValue: mockPatientRepository,
        },
      ],
    }).compile();

    service = module.get<PatientService>(PatientService);
    repository = module.get<Repository<Patient>>(getRepositoryToken(Patient));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should save a new patient', async () => {
      const createPatientDto: CreatePatientDto = {
        name: 'John Doe',
        email: 'Avenida@hotmail.com',
        address: 'Avenida Siempre Viva 742',
        phoneNumber: '+541166566299',
        imageDocument: 'https://aws.cloud19357388dhg-5udtau1.com',
      };

      const savedPatient = { id: 1, ...createPatientDto };
      mockPatientRepository.save.mockResolvedValue(savedPatient);

      const result = await service.create(createPatientDto);
      expect(result).toEqual(savedPatient);
      expect(mockPatientRepository.save).toHaveBeenCalledWith(createPatientDto);
    });
  });

  describe('findAll', () => {
    it('should return all patients', async () => {
      const patients = [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
      ];
      mockPatientRepository.find.mockResolvedValue(patients);

      const result = await service.findAll();
      expect(result).toEqual(patients);
      expect(mockPatientRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a patient by id', async () => {
      const patient = { id: 1, name: 'John Doe', email: 'johndoe@example.com' };
      mockPatientRepository.findOneBy.mockResolvedValue(patient);

      const result = await service.findOne(1);
      expect(result).toEqual(patient);
      expect(mockPatientRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    });

    it('should return null if no patient is found', async () => {
      mockPatientRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findOne(999);
      expect(result).toBeNull();
      expect(mockPatientRepository.findOneBy).toHaveBeenCalledWith({ id: 999 });
    });
  });

  describe('update', () => {
    it('should update a patient by id', async () => {
      const updatePatientDto: UpdatePatientDto = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      const updateResult = { affected: 1 };
      mockPatientRepository.update.mockResolvedValue(updateResult);

      const result = await service.update(1, updatePatientDto);
      expect(result).toEqual(updateResult);
      expect(mockPatientRepository.update).toHaveBeenCalledWith(
        1,
        updatePatientDto,
      );
    });
  });

  describe('remove', () => {
    it('should delete a patient by id', async () => {
      const deleteResult = { affected: 1 };
      mockPatientRepository.delete.mockResolvedValue(deleteResult);

      const result = await service.remove(1);
      expect(result).toEqual(deleteResult);
      expect(mockPatientRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
