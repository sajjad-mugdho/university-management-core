import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { StudentsController } from './student.controller';
import { StudentValidation } from './student.validation';
const router = express.Router();

router.get('/', StudentsController.getAllFromDB);

router.get(
  '/my-courses',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentsController.myCourses
);

router.get(
  '/my-course-schedules',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentsController.getMyCourseSchedules
);
router.get(
  '/my-academic-info',
  auth(ENUM_USER_ROLE.STUDENT),
  StudentsController.myAcademicInfo
);

router.get('/:id', StudentsController.getByIdFromDB);

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(StudentValidation.create),
  StudentsController.insertIntoDB
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(StudentValidation.update),
  StudentsController.updateIntoDB
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  StudentsController.deleteFormDB
);

export const StudentRouter = router;
