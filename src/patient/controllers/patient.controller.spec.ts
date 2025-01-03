import { Test, TestingModule } from '@nestjs/testing';
import { PatientController } from './patient.controller';
import { PatientService } from '../services/patient.service';
import { EmailNotificationStrategy } from '../../notifications/strategy/impl/email-notification.strategy';
import { NotificationContext } from '../../notifications/notification.context';
import { HttpStatus } from '@nestjs/common/enums/http-status.enum';
import { HttpException } from '@nestjs/common';

describe('PatientController', () => {
  let controller: PatientController;
  let service: PatientService;

  const createPatientDto = {
    name: 'John oa',
    email: 'no-reply-recipient@hotmail.com',
    address: 'Avenida Siempre Viva 742',
    phoneNumber: '+541166566143',
    imageDocument: 'https://aws.asldjfhasdu44l.com.ar',
  };

  const mockPatientService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockNotificationContext = {
    executeNotification: jest.fn(),
  };

  const mockEmailNotificationStrategy = {
    notify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientController],
      providers: [
        {
          provide: PatientService,
          useValue: mockPatientService,
        },
        {
          provide: EmailNotificationStrategy,
          useValue: mockEmailNotificationStrategy,
        },
        {
          provide: NotificationContext,
          useValue: mockNotificationContext,
        },
      ],
    }).compile();

    controller = module.get<PatientController>(PatientController);
    service = module.get<PatientService>(PatientService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a patient and send a notification', async () => {
      const result = { id: 1, ...createPatientDto };

      mockPatientService.create.mockResolvedValue(result);

      expect(await controller.create(createPatientDto)).toEqual({
        message: 'Patient registered successfully',
        data: result,
      });
      expect(mockPatientService.create).toHaveBeenCalledWith(createPatientDto);
    });
  });

  describe('create - valid input', () => {
    it('should return error message when creating a patient with no valid values', async () => {
      const createPatientDtoError = {
        name: 'John oa',
        email: 'no-thotmail.com',
        address: 'Avenida Siempre Viva 742',
        phoneNumber: '+541166566143',
        imageDocument: 'https://aws.asldjfhasdu44l.com.ar',
      };
      const errorResponse = {
        message: ['email must be an email'],
        error: 'Bad Request',
      };

      mockPatientService.create.mockImplementation(() => {
        throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST);
      });

      try {
        await controller.create(createPatientDtoError);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });
  });
});
