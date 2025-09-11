-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."PropertyType" ADD VALUE 'CHAMBREPRIVE';
ALTER TYPE "public"."PropertyType" ADD VALUE 'CABANE';

-- AlterTable
ALTER TABLE "public"."Property" ADD COLUMN     "bathrooms" DOUBLE PRECISION,
ADD COLUMN     "bedrooms" INTEGER,
ADD COLUMN     "beds" INTEGER,
ADD COLUMN     "bookingNotice" TEXT,
ADD COLUMN     "longStayDiscounts" BOOLEAN,
ADD COLUMN     "maxGuests" INTEGER,
ADD COLUMN     "maxStayDuration" INTEGER,
ADD COLUMN     "minStayDuration" INTEGER,
ADD COLUMN     "seasonalPricing" BOOLEAN,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "pricePerNight" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "country" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;
