-- CreateTable
CREATE TABLE "Beasiswa" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "educationLevels" TEXT[],
    "studyFields" TEXT[],
    "scholarshipType" TEXT NOT NULL,
    "locations" TEXT[],
    "duration" TEXT,
    "coverage" TEXT[],
    "termsAndConditions" TEXT[],
    "requiredDocuments" TEXT[],
    "registrationStartDate" TIMESTAMP(3) NOT NULL,
    "registrationEndDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "registrationLink" TEXT,
    "contact" JSONB,
    "applicantCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Beasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lomba" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "organizer" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "theme" TEXT,
    "competitionType" TEXT NOT NULL,
    "categories" TEXT[],
    "level" TEXT NOT NULL,
    "ageLimit" TEXT,
    "targetParticipants" TEXT,
    "location" TEXT,
    "registrationStartDate" TIMESTAMP(3) NOT NULL,
    "registrationEndDate" TIMESTAMP(3) NOT NULL,
    "submissionDate" TIMESTAMP(3),
    "submissionDeadline" TIMESTAMP(3),
    "judgingEndDate" TIMESTAMP(3),
    "announcementDate" TIMESTAMP(3),
    "termsAndConditions" TEXT[],
    "maxMembers" INTEGER,
    "registrationFee" TEXT,
    "howToRegister" TEXT[],
    "registrationLink" TEXT,
    "contact" JSONB,
    "promoMedia" JSONB,
    "applicantCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lomba_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LombaPrize" (
    "id" TEXT NOT NULL,
    "lombaId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rank" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LombaPrize_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LombaPrize_lombaId_title_key" ON "LombaPrize"("lombaId", "title");

-- AddForeignKey
ALTER TABLE "LombaPrize" ADD CONSTRAINT "LombaPrize_lombaId_fkey" FOREIGN KEY ("lombaId") REFERENCES "Lomba"("id") ON DELETE CASCADE ON UPDATE CASCADE;
