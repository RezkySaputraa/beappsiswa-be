-- DropForeignKey
ALTER TABLE "beasiswa" DROP CONSTRAINT "beasiswa_kontak_id_fkey";

-- DropForeignKey
ALTER TABLE "beasiswa" DROP CONSTRAINT "beasiswa_timeline_id_fkey";

-- DropForeignKey
ALTER TABLE "lomba" DROP CONSTRAINT "lomba_kontak_id_fkey";

-- DropForeignKey
ALTER TABLE "lomba" DROP CONSTRAINT "lomba_timeline_id_fkey";

-- DropForeignKey
ALTER TABLE "lomba_hadiah" DROP CONSTRAINT "lomba_hadiah_lomba_id_fkey";

-- DropForeignKey
ALTER TABLE "lomba_media_promosi" DROP CONSTRAINT "lomba_media_promosi_lomba_id_fkey";

-- AddForeignKey
ALTER TABLE "beasiswa" ADD CONSTRAINT "beasiswa_timeline_id_fkey" FOREIGN KEY ("timeline_id") REFERENCES "beasiswa_timeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beasiswa" ADD CONSTRAINT "beasiswa_kontak_id_fkey" FOREIGN KEY ("kontak_id") REFERENCES "beasiswa_kontak"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lomba" ADD CONSTRAINT "lomba_timeline_id_fkey" FOREIGN KEY ("timeline_id") REFERENCES "lomba_timeline"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lomba" ADD CONSTRAINT "lomba_kontak_id_fkey" FOREIGN KEY ("kontak_id") REFERENCES "lomba_kontak"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lomba_hadiah" ADD CONSTRAINT "lomba_hadiah_lomba_id_fkey" FOREIGN KEY ("lomba_id") REFERENCES "lomba"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lomba_media_promosi" ADD CONSTRAINT "lomba_media_promosi_lomba_id_fkey" FOREIGN KEY ("lomba_id") REFERENCES "lomba"("id") ON DELETE CASCADE ON UPDATE CASCADE;
