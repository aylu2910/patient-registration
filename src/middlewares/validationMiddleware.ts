// export const patientValidationRules = [
//   check('name').notEmpty().withMessage('Name is required'),
//   check('email').isEmail().withMessage('Invalid email address'),
//   check('phone').isMobilePhone('any').withMessage('Invalid phone number'),
//   check('documentPhoto').notEmpty().withMessage('Document photo is required'),
// ];

// export const validate = (req: Request, res: Response, next: NextFunction) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json('Please check your input');
//   }
//   next();
// };
