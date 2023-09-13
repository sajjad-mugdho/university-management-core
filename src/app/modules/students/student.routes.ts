import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentsController } from './student.controller';
import { StudentValidation } from './student.validation';
const router = express.Router();

router.get('/', StudentsController.getAllFromDB);

router.get('/:id', StudentsController.getByIdFromDB);

router.post(
  '/',
  validateRequest(StudentValidation.create),
  StudentsController.insertIntoDB
);

export const StudentRouter = router;
