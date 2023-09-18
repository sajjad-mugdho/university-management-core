-- AlterTable
ALTER TABLE "semster_registrations" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'UPCOMEING';
