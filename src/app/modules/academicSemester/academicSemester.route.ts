import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemisterController } from './academicSemester.controller';
import { SemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.get('/', AcademicSemisterController.getAllData);
router.get('/:id', AcademicSemisterController.getSingleSemester);
router.post(
  '/create-semester',
  validateRequest(SemesterValidation.createSemesterValidation),
  AcademicSemisterController.insertIntoDB
);

export const AcademicSemesterRouter = router;
