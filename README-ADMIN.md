# Admin Panel — Deployment & Operations

Panel admin untuk "Berita & Kegiatan" (SQLite + Prisma + NextAuth). Dokumen ini
mencakup deploy ke VPS maupun cPanel, backup, pembuatan akun admin pertama,
dan aturan penanganan secret.

## Arsitektur singkat

- Database: SQLite di `data/gps.db` (path dari `DATABASE_URL` di `.env`).
- Upload gambar: disimpan di disk lokal, `public/uploads/news/`.
- Auth: NextAuth Credentials provider, satu akun admin, JWT session.
- Rendering: seluruh situs tetap statis (SSG) kecuali `/news`, `/news/[slug]`,
  dan `/sitemap.xml`, yang membaca DB per-request dan di-refresh otomatis
  lewat `revalidatePath()` setiap kali admin menyimpan/menghapus artikel —
  **tidak perlu rebuild manual** untuk perubahan konten.
- `next.config.mjs` punya `output: "standalone"` — `npm run build` juga
  menjalankan `postbuild` (`scripts/copy-standalone-assets.js`) yang menyalin
  `public/` dan `.next/static/` ke `.next/standalone/`, supaya
  `.next/standalone/server.js` jadi satu paket lengkap yang bisa dijalankan
  langsung — dipakai khusus untuk deploy cPanel (lihat di bawah). Deploy VPS
  tetap pakai `next start` seperti biasa, tidak menyentuh folder ini.

## ⚠️ `DATABASE_URL` relatif vs absolut — beda perilaku per jenis hosting

`DATABASE_URL="file:../data/gps.db"` (relatif terhadap `prisma/schema.prisma`)
bekerja untuk **dev lokal** dan **VPS via `next start`** karena working
directory proses tidak pernah berubah. Tapi `.next/standalone/server.js`
(dipakai di deploy cPanel — lihat di bawah) memanggil `process.chdir(__dirname)`
saat start, sehingga path relatif diam-diam menunjuk ke lokasi yang salah dan
login akan gagal dengan error Prisma "Unable to open the database file" atau
"table does not exist". **Di hosting cPanel/Passenger, `DATABASE_URL` WAJIB
path absolut**, misalnya:

```
DATABASE_URL="file:/home/username/gpsfood/data/gps.db"
```

Ini sudah diverifikasi langsung (build standalone lokal → jalankan
`server.js` → path relatif gagal login, path absolut berhasil) sebelum
dipakai untuk deploy sungguhan.

## ⚠️ Yang TIDAK BOLEH dihapus saat deploy

Dua path ini menyimpan data nyata (bukan artefak build) dan **wajib** tetap
ada di server sepanjang siklus deploy:

- `data/` — file database SQLite (`data/gps.db`).
- `public/uploads/` — semua gambar yang diunggah lewat admin panel.

Kedua path ini di-gitignore secara sengaja (lihat `.gitignore`) supaya tidak
tertimpa saat `git pull`/`git checkout` — tapi proses deploy manual apa pun
(`rm -rf`, rsync dengan `--delete`, dsb.) tetap bisa menghapusnya kalau
menyertakan path ini secara eksplisit. **Jangan pernah menjalankan perintah
destruktif yang menyentuh `data/` atau `public/uploads/` di server produksi.**

## Deploy ke VPS (proses normal)

Situs berjalan lewat systemd sebagai service `cv-gps` (`next start -p 3007`,
lihat script `start:vps` di `package.json`). Tidak perlu akses `sudo` untuk
alur deploy sehari-hari.

```bash
git pull
npm install          # menjalankan `prisma generate` otomatis lewat postinstall
npm run db:migrate   # prisma migrate deploy — menerapkan migrasi baru ke data/gps.db
npm run build
```

Setelah build selesai, restart proses Node yang sedang berjalan supaya build
baru terpakai:

```bash
pkill -f "next-server" || pkill -f "next start"
```

Service systemd (`Restart=always`) akan otomatis menyalakan ulang proses dari
`start:vps`, menyajikan build baru di port 3007.

**Jangan** gunakan PM2 atau tool process-manager lain di VPS ini — service
sudah dikelola lewat systemd. **Jangan** jalankan `npm audit fix` di server
produksi (bisa mengganti versi dependency tanpa diuji lebih dulu) — jalankan
audit/upgrade di lingkungan dev, uji `npm run build`, baru commit perubahan
`package-lock.json`.

## Deploy ke cPanel (Setup Node.js App / Passenger)

Hosting cPanel dengan fitur "Setup Node.js App" menjalankan aplikasi lewat
Phusion Passenger, bukan systemd — Passenger butuh file startup polos yang
`listen()` di `process.env.PORT`, bukan perintah CLI seperti `next start`.
Karena itu proyek ini pakai `output: "standalone"` (lihat di atas) supaya ada
`.next/standalone/server.js` yang cocok dengan model Passenger.

1. **Buat aplikasi Node.js di cPanel** (menu "Setup Node.js App" → Create
   Application):
   - Node.js version: pilih versi terbaru yang tersedia (20 atau 22).
   - Application mode: `Production`.
   - Application root: folder tempat repo akan di-clone, mis. `gpsfood`.
   - Application URL: domain (`gpsfood.id`).
   - Application startup file: **isi ini belakangan**, setelah build pertama
     ada (langkah 5) — nilainya `.next/standalone/server.js`.
   - Setelah dibuat, cPanel menampilkan perintah "Enter to the virtual
     environment", bentuknya seperti:
     ```bash
     source /home/username/nodevenv/gpsfood/20/bin/activate && cd /home/username/gpsfood
     ```
     Simpan perintah ini — dipakai di setiap langkah terminal berikutnya,
     supaya `node`/`npm`/`npx` yang terpakai adalah versi yang cPanel
     siapkan untuk aplikasi ini (bukan `node` sistem).

2. **Clone repo lewat Terminal SSH** (masuk ke virtual environment dulu,
   lihat langkah 1):
   ```bash
   git clone https://github.com/bynueman/cv-gps.git .
   ```
   (Application root sudah dibuat cPanel; `.` supaya clone langsung ke
   folder itu, bukan bikin subfolder baru.)

3. **Install dependencies & buat `.env`:**
   ```bash
   npm install   # menjalankan `prisma generate` otomatis lewat postinstall
   ```
   Buat `.env` (isi manual, jangan copy dari `.env` lokal — generate secret
   baru):
   ```
   DATABASE_URL="file:/home/username/gpsfood/data/gps.db"
   NEXTAUTH_SECRET="<hasil: openssl rand -base64 32>"
   NEXTAUTH_URL="https://gpsfood.id"
   NEXT_PUBLIC_SITE_URL="https://gpsfood.id"
   ```
   Ingat: `DATABASE_URL` **harus path absolut** (lihat peringatan di atas),
   sesuaikan `/home/username/gpsfood` dengan Application root sungguhan.

4. **Migrasi database & build:**
   ```bash
   npx prisma migrate deploy
   npm run build   # next build, lalu postbuild menyalin public/ + .next/static/
   ```

5. **Set startup file di cPanel** (kembali ke "Setup Node.js App" → edit
   aplikasi): isi "Application startup file" dengan `.next/standalone/server.js`,
   lalu klik **Restart**.

6. **Buat akun admin pertama:**
   ```bash
   npm run db:seed-admin -- admin@gpsfood.id "PasswordKuatMinimal8Karakter"
   ```

7. **Verifikasi:** buka `https://gpsfood.id/admin/login`, login, pastikan
   sesi tersimpan dan artikel bisa dibuat.

### Redeploy (setelah `git pull` berikutnya)

```bash
git pull
npm install
npx prisma migrate deploy
npm run build
touch tmp/restart.txt   # trik Passenger: sentuh file ini untuk trigger restart
```
`tmp/restart.txt` adalah konvensi Passenger — begitu file di dalam
Application root ini disentuh (`touch`), request berikutnya otomatis
me-restart proses Node dengan build baru, tanpa perlu buka panel cPanel.
Alternatifnya, klik tombol **Restart** di "Setup Node.js App" seperti langkah 5.

### SSL & domain

Karena domain dan hosting dibeli di provider yang sama, DNS biasanya sudah
otomatis terarah ke akun hosting ini — cek di cPanel bahwa domain
`gpsfood.id` sudah muncul sebagai domain utama/addon dengan document root
yang benar. SSL: aktifkan **AutoSSL** (cPanel → SSL/TLS Status) supaya
Let's Encrypt terpasang otomatis untuk domain ini; biasanya berjalan tanpa
konfigurasi tambahan begitu DNS domain sudah menunjuk ke akun tersebut.

## Backup

### Database (harian, via cron)

```bash
# crontab -e
0 2 * * * sqlite3 /path/to/gsp/data/gps.db ".backup /path/to/backups/gps-$(date +\%Y\%m\%d).db"
```

Simpan beberapa hari terakhir saja (rotasi manual atau `find ... -mtime +14
-delete` pada direktori backup) supaya tidak memenuhi disk.

### Gambar upload (harian, via rsync)

```bash
# crontab -e
30 2 * * * rsync -a /path/to/gsp/public/uploads/ /path/to/backups/uploads/
```

Jalankan backup database dan upload di jam yang sama (dini hari, lalu lintas
rendah) tapi dengan jeda beberapa menit supaya tidak membebani I/O bersamaan.

## Membuat akun admin pertama

Akun admin dibuat lewat CLI, bukan lewat UI (tidak ada halaman "sign up" yang
publik-facing — ini disengaja, satu akun admin per instalasi):

```bash
npm run db:seed-admin -- admin@gpsfood.id "PasswordKuatMinimal8Karakter"
```

Script (`scripts/create-admin.js`) melakukan **upsert**: menjalankan ulang
perintah yang sama dengan email yang sama akan mengganti password akun
tersebut — berguna untuk reset password tanpa perlu masuk ke database
langsung. Password di-hash dengan bcrypt (cost factor 12) sebelum disimpan;
tidak pernah disimpan dalam bentuk plain text di mana pun.

## Aturan secret

- Semua secret (`NEXTAUTH_SECRET`, `DATABASE_URL`, dst.) hidup **hanya** di
  file `.env` milik server — file ini **tidak pernah** di-commit ke git
  (lihat `.gitignore`). `.env.example` yang di-commit hanya berisi nama
  variabel, tanpa nilai asli.
- Generate `NEXTAUTH_SECRET` baru untuk produksi (jangan pakai nilai dev):
  ```bash
  openssl rand -base64 32
  ```
- Jika secret pernah tidak sengaja ter-commit, anggap sudah bocor —
  regenerate nilainya (jangan hanya menghapus commit-nya), lalu update
  `.env` di server.
