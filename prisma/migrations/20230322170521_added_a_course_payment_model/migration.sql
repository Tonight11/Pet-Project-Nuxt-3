-- CreateTable
CREATE TABLE "CoursePayment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courseId" INTEGER NOT NULL,
    "verifed" BOOLEAN NOT NULL DEFAULT false,
    "email" TEXT NOT NULL,
    "paymentId" INTEGER NOT NULL,

    CONSTRAINT "CoursePayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CoursePayment_paymentId_key" ON "CoursePayment"("paymentId");

-- AddForeignKey
ALTER TABLE "CoursePayment" ADD CONSTRAINT "CoursePayment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
