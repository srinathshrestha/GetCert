-- CreateTable
CREATE TABLE "interns" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "college" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "certificateKey" TEXT,

    CONSTRAINT "interns_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "interns_email_key" ON "interns"("email");
