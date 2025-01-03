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
    console.log('ejecutando test');
    expect(controller).toBeDefined();
  });
});
// import { Test, TestingModule } from '@nestjs/testing';
// import { PatientController } from './patient.controller';
// import { PatientService } from '../services/patient.service';
// import { CreatePatientDto } from '../dtos/create-patient.dto';
// import { UpdatePatientDto } from '../dtos/update-patient.dto';
// import { HttpException, HttpStatus } from '@nestjs/common';

// describe('PatientController', () => {
//   let controller: PatientController;
//   let service: PatientService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [PatientController],
//       providers: [
//         {
//           provide: PatientService,
//           useValue: {
//             create: jest.fn(),
//             findAll: jest.fn(),
//             findOne: jest.fn(),
//             update: jest.fn(),
//             remove: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     controller = module.get<PatientController>(PatientController);
//     service = module.get<PatientService>(PatientService);
//   });

// it('should be defined', () => {
//   expect(controller).toBeDefined();
// });

// describe('create', () => {
//   it('should create a patient successfully', async () => {
//     const createPatientDto: CreatePatientDto = {
//       name: 'John Doe',
//       email: 'Avenida@hotmail.com',
//       address: 'Avenida Siempre Viva 742',
//       phoneNumber: '+541166566299',
//       imageDocument: 'https://aws.cloud19357388dhg-5udtau1.com',
//     };
//     const result = { id: 1, ...createPatientDto };

//     jest.spyOn(service, 'create').mockResolvedValue(result);

//     expect(await controller.create(createPatientDto)).toEqual({
//       message: 'Patient registered successfully',
//       data: result,
//     });
//     expect(service.create).toHaveBeenCalledWith(createPatientDto);
//   });

//   it.skip('should throw an HttpException if service fails', async () => {
//     const createPatientDto: CreatePatientDto = {
//       name: 'John Doe',
//       email: 'john@example.com',
//       address: 'Avenida Siempre Viva 742',
//       phoneNumber: '123456789',
//       imageDocument: 'photo-url',
//     };

//     jest.spyOn(service, 'create').mockRejectedValue(new Error('Error'));

//     await expect(controller.create(createPatientDto)).rejects.toThrow(
//       new HttpException(
//         { message: 'Failed to register patient', error: 'Error' },
//         HttpStatus.INTERNAL_SERVER_ERROR,
//       ),
//     );
//   });
// });

// describe('findAll', () => {
//   it.skip('should return an array of patients', async () => {
//     const result = [{ id: 1, name: 'John Doe' }];

//     expect(await controller.findAll()).toEqual(result);
//   });
// });

// describe('findOne', () => {
//   it.skip('should return a patient by ID', async () => {
//     const result = { id: 1, name: 'John Doe' };

//     expect(await controller.findOne('1')).toEqual(result);
//   });

//   it('should throw an HttpException if patient is not found', async () => {
//     await expect(controller.findOne('1')).rejects.toThrow(
//       new HttpException('Patient not found', HttpStatus.NOT_FOUND),
//     );
//   });
// });

// describe('update', () => {
//   it.skip('should update a patient by ID', async () => {
//     const updatePatientDto: UpdatePatientDto = { name: 'Jane Doe' };
//     const result = { id: 1, ...updatePatientDto };

//     expect(await controller.update('1', updatePatientDto)).toEqual(result);
//     expect(service.update).toHaveBeenCalledWith(1, updatePatientDto);
//   });
// });

// describe('remove', () => {
//   it.skip('should remove a patient by ID', async () => {
//     const result = { message: 'Patient removed successfully' };

//     expect(await controller.remove('1')).toEqual(result);
//     expect(service.remove).toHaveBeenCalledWith(1);
//   });
// });
