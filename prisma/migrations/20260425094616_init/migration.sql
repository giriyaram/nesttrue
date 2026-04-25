-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "city" TEXT NOT NULL,
    "area" TEXT,
    "budget" TEXT,
    "timeline" TEXT,
    "purpose" TEXT,
    "waSessionId" TEXT,
    "lastMessageId" TEXT,
    "waStatus" TEXT NOT NULL DEFAULT 'pending',
    "rawMessages" JSONB NOT NULL DEFAULT '[]',
    "score" INTEGER,
    "scoreReason" TEXT,
    "qualified" BOOLEAN NOT NULL DEFAULT false,
    "converted" BOOLEAN NOT NULL DEFAULT false,
    "convertedAt" TIMESTAMP(3),
    "notes" TEXT,
    "assignedTo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_phone_key" ON "Lead"("phone");

-- CreateIndex
CREATE INDEX "Lead_city_idx" ON "Lead"("city");

-- CreateIndex
CREATE INDEX "Lead_waStatus_idx" ON "Lead"("waStatus");

-- CreateIndex
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");
