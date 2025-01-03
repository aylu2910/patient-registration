import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from '../controllers/patient.controller';
import { PatientService } from '../services/patient.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PatientModule } from '../modules/patient.module';
import { Patient } from '../entities/patient.entity';
import { NotificationContext } from '../../notifications/notification.context';
import { EmailNotificationStrategy } from '../../notifications/strategy/impl/email-notification.strategy';

describe('PatientController', () => {
  let controller: PatientController;
  let service: PatientService;
  let notificationContext: NotificationContext;

  const mockPatientResponse = {
    message: 'Patient registered successfully',
    data: {
      name: 'John oa',
      email: 'Avenida@sex234.com',
      address: 'Avenida Siempre Viva 742',
      phoneNumber: '+541166566143',
      imageDocument: 'https://Avenida.com.ar',
      id: 1,
    },
  };

  const mockPatientService = {
    create: jest.fn().mockResolvedValue(mockPatientResponse),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockNotificationContext = {
    executeNotification: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: mockPatientService,
        },
      ],
    })
      .overrideProvider(NotificationContext)
      .useValue(mockNotificationContext)
      .compile();

    controller = module.get<PatientController>(PatientController);
    service = module.get<PatientService>(PatientService);
    notificationContext = new NotificationContext(
      new EmailNotificationStrategy(),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a patient and send a notification', async () => {
      const createPatientDto: CreatePatientDto = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        documentPhoto: 'photo.jpg',
      };
      const createdPatient = { id: 1, ...createPatientDto };

      mockPatientService.create.mockResolvedValue(createdPatient);
      mockNotificationContext.executeNotification.mockResolvedValue(null);

      const result = await controller.create(createPatientDto);

      expect(result).toEqual({
        message: 'Patient registered successfully',
        data: createdPatient,
      });
      expect(mockPatientService.create).toHaveBeenCalledWith(createPatientDto);
      expect(mockNotificationContext.executeNotification).toHaveBeenCalledWith(
        'ayluOre',
        'testing email strategy',
      );
    });

    it('should handle service errors gracefully', async () => {
      const createPatientDto = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phoneNumber: '1234567890',
        imageDocument: 'photo.jpg',
      };

      mockPatientService.create.mockRejectedValue(new Error('Service error'));

      await expect(controller.create(createPatientDto)).rejects.toThrow(
        new HttpException(
          { message: 'Failed to register patient', error: 'Service error' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
      expect(mockPatientService.create).toHaveBeenCalledWith(createPatientDto);
    });
  });
});
