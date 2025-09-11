-- DropForeignKey
ALTER TABLE "public"."PropertyService" DROP CONSTRAINT "PropertyService_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PropertyService" DROP CONSTRAINT "PropertyService_serviceId_fkey";

-- AddForeignKey
ALTER TABLE "public"."PropertyService" ADD CONSTRAINT "PropertyService_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "public"."Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PropertyService" ADD CONSTRAINT "PropertyService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "public"."AdditionalService"("id") ON DELETE CASCADE ON UPDATE CASCADE;
