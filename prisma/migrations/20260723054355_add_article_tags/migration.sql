-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "categoryId" TEXT NOT NULL,
    "categoryEn" TEXT NOT NULL,
    "titleId" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "excerptId" TEXT NOT NULL,
    "excerptEn" TEXT NOT NULL,
    "bodyId" TEXT NOT NULL,
    "bodyEn" TEXT NOT NULL,
    "tagsId" TEXT NOT NULL DEFAULT '',
    "tagsEn" TEXT NOT NULL DEFAULT '',
    "image" TEXT,
    "imageThumb" TEXT,
    "imageOg" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Article" ("bodyEn", "bodyId", "categoryEn", "categoryId", "createdAt", "date", "excerptEn", "excerptId", "featured", "id", "image", "imageOg", "imageThumb", "published", "slug", "titleEn", "titleId", "updatedAt") SELECT "bodyEn", "bodyId", "categoryEn", "categoryId", "createdAt", "date", "excerptEn", "excerptId", "featured", "id", "image", "imageOg", "imageThumb", "published", "slug", "titleEn", "titleId", "updatedAt" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
