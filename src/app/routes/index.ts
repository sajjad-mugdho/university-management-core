import express from 'express';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { AcademicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { BuildingRoutes } from '../modules/building/building.route';
import { CourseRoutes } from '../modules/courses/course.route';
import { facultyRoutes } from '../modules/faculty/faculty.router';
import { RoomRoutes } from '../modules/room/room.route';
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
  {
    path: '/academic-faculty',
    route: academicFacultyRoutes,
  },
  {
    path: '/building',
    route: BuildingRoutes,
  },

  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/rooms',
    route: RoomRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
