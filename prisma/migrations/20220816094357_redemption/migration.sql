-- CreateTable
CREATE TABLE "Redemption" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rewardId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Redemption_rewardId_key" ON "Redemption"("rewardId");

-- CreateIndex
CREATE UNIQUE INDEX "Redemption_action_key" ON "Redemption"("action");
