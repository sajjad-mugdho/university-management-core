import express from 'express';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { facultyRoutes } from '../modules/faculty/faculty.router';
import { StudentRouter } from '../modules/students/student.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/academic-semester',
    route: AcademicSemesterRouter,
  },
  {
    path: '/students',
    route: StudentRouter,
  },
  {
    path: '/faculty',
    route: facultyRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
