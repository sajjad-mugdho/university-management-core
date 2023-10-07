import { Prisma, Students } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import {
  IStudentFiltersRequest,
  studentRelationalFields,
  studentRelationalFieldsMapper,
  studentSearchableFields,
} from './student.constant';

const insertIntoDB = async (data: Students): Promise<Students> => {
  const result = await prisma.students.create({
    data,
  });

  return result;
};

const getAllFromDB = async (
  filters: IStudentFiltersRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Students[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: studentSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (studentRelationalFields.includes(key)) {
          return {
            [studentRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.StudentsWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.students.findMany({
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemiser: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.students.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Students | null> => {
  const result = await prisma.students.findUnique({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemiser: true,
    },
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Students>
): Promise<Students> => {
  const result = await prisma.students.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};
const deleteFormDB = async (id: string): Promise<Students | null> => {
  const result = await prisma.students.delete({
    where: {
      id,
    },
    include: {
      academicFaculty: true,
      academicDepartment: true,
      academicSemiser: true,
    },
  });
  return result;
};

const myCourses = async (
  authUserId: string,
  filter: {
    courseId?: string | undefined;
    academicSemesterId?: string | undefined;
  }
) => {
  if (!filter.academicSemesterId) {
    const currentSemester = await prisma.academicSemester.findFirst({
      where: {
        isCurrent: true,
      },
    });
    filter.academicSemesterId = currentSemester?.id;
  }

  const result = await prisma.studentEnrolledCourse.findMany({
    where: {
      student: {
        studentId: authUserId,
      },
      ...filter,
    },
    include: {
      course: true,
    },
  });

  return result;
};

export const StudentService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFormDB,
  myCourses,
};
