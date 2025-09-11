/*
  Warnings:

  - You are about to drop the column `location` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Property" DROP COLUMN "location",
ADD COLUMN     "aggregateRating" DOUBLE PRECISION,
ADD COLUMN     "checkinTime" TEXT,
ADD COLUMN     "checkoutTime" TEXT,
ADD COLUMN     "ratingCount" INTEGER,
ADD COLUMN     "totalRooms" INTEGER;
