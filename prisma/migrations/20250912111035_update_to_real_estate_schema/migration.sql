/*
  Warnings:

  - You are about to drop the column `bookingNotice` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `checkinTime` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `checkoutTime` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `longStayDiscounts` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `maxGuests` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `maxStayDuration` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `minStayDuration` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerNight` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `seasonalPricing` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."MatterportStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_guestId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Review" DROP CONSTRAINT "Review_propertyId_fkey";

-- AlterTable
ALTER TABLE "public"."Property" DROP COLUMN "bookingNotice",
DROP COLUMN "checkinTime",
DROP COLUMN "checkoutTime",
DROP COLUMN "longStayDiscounts",
DROP COLUMN "maxGuests",
DROP COLUMN "maxStayDuration",
DROP COLUMN "minStayDuration",
DROP COLUMN "pricePerNight",
DROP COLUMN "seasonalPricing",
ADD COLUMN     "basePrice" DOUBLE PRECISION,
ADD COLUMN     "estimatedPrice" DOUBLE PRECISION,
ADD COLUMN     "matterportScan" JSONB,
ADD COLUMN     "matterportStatus" "public"."MatterportStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "matterportUrl" TEXT,
ADD COLUMN     "propertySize" DOUBLE PRECISION;

-- DropTable
DROP TABLE "public"."Booking";

-- DropTable
DROP TABLE "public"."Payment";

-- DropTable
DROP TABLE "public"."Review";
