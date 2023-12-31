-- CreateTable
CREATE TABLE "student_semester_registration_courses" (
    "semesterRegistrationId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "offerdCourseId" TEXT NOT NULL,
    "offerdCourseSectionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_semester_registration_courses_pkey" PRIMARY KEY ("semesterRegistrationId","studentId","offerdCourseId")
);
