-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "personalInformationId" INTEGER,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalInformation" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "street" TEXT NOT NULL,

    CONSTRAINT "PersonalInformation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_personalInformationId_fkey" FOREIGN KEY ("personalInformationId") REFERENCES "PersonalInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
