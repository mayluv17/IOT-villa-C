-- CreateTable
CREATE TABLE "SensorData" (
    "id" SERIAL NOT NULL,
    "moisture" INTEGER NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SensorData_pkey" PRIMARY KEY ("id")
);
