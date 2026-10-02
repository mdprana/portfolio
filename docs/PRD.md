# PRD — Portfolio Prana (v0, draft)

Referensi: https://collinscole.framer.website (template Framer "Collins").
Tahap 1: desain di Figma (file `Portofolio`, key `Vfa2sw0KvmhagP7jjrZBJ6`). Tahap 2 (nanti): build web.

## 1. Problem statement
Prana (S1 Informatika Udayana, Data Science/ML, intern GoTo) belum punya satu tempat yang menunjukkan kemampuan + hasil kerja secara meyakinkan. CV/LinkedIn tidak memperlihatkan kualitas project, cara berpikir, dan selera visual. Recruiter & klien menilai dalam <30 detik; tanpa portfolio yang kuat, project bagus tidak terlihat.

## 2. Target user + persona
- **Rani, Tech Recruiter (startup/unicorn)** — scan cepat: siapa, bisa apa, project apa, cara kontak. Buka dari LinkedIn di laptop, kadang HP.
- **Dimas, Hiring Manager / Lead DS** — buka 1–2 project detail, cari masalah → pendekatan → hasil (metrik), stack, link repo/demo.
- (Sekunder) klien freelance web/IoT.

## 3. Goals / non-goals
**Goals**
- Replika struktur, tata letak, tipografi, dan motion referensi, diisi konten Prana.
- Recruiter paham "siapa + bisa apa" dalam 1 layar pertama.
- Tiap project punya halaman detail berformat case study.
- Spesifikasi motion cukup detail untuk dibangun 1:1 di web.

**Non-goals**
- Tidak menyalin copywriting, foto, logo, atau aset referensi — hanya struktur & motion.
- Belum ada CMS, blog, multi-bahasa, dark/light toggle (v2+).
- Figma tidak dipakai sebagai output final animasi scroll (lihat §6.8).

## 4. User stories
- Sebagai recruiter, saya ingin melihat nama, role, dan ringkasan di hero, supaya tahu relevansi dalam 5 detik.
- Sebagai recruiter, saya ingin tombol kontak/email selalu mudah dijangkau, supaya bisa langsung menghubungi.
- Sebagai hiring manager, saya ingin membuka project dan membaca problem → approach → result, supaya bisa menilai kedalaman teknis.
- Sebagai hiring manager, saya ingin tahu stack & peran Prana di tiap project, supaya tahu kontribusi nyata.
- Sebagai pengunjung mobile, saya ingin layout tetap rapi dan ringan, supaya nyaman dibaca di HP.

## 5. Feature list
**MVP (Figma, tahap ini)**
1. Design tokens (warna, tipe, spacing, radius) + komponen dasar.
2. Home — Desktop 1440: Nav, Hero, Featured Projects, About, Services/Capabilities, Proven Results, Footer/Contact.
3. Project Detail (1 template, diisi 1 project contoh).
4. Projects index, About, Contact page.
5. Mobile 390 untuk Home + Project Detail.
6. Motion spec page (anotasi tiap animasi) + prototype Smart Animate untuk hover & transisi halaman.

**v2**: Tablet 810, semua halaman mobile, versi Bahasa Indonesia, halaman detail untuk semua project.
**Later**: build web (Next.js/Framer), CMS project, blog/notes, analytics.

## 6. Functional requirements (MVP)
Hasil inspeksi referensi pada viewport 1280px, tinggi halaman Home ±7040px, latar `#000`, font Inter Display.

### 6.1 Nav (tinggi 79)
- Kiri: wordmark `PRANA`. Tengah/kanan: PROJECTS · ABOUT · CONTACT (16px, regular, uppercase, putih).
- Kanan: `LOCAL /` (abu `#B3B3B3`) + jam live `HH:MM:SS` → diganti zona **WITA**.
- Motion: nav fade/slide-in saat load.

### 6.2 Hero (±1300)
- Headline nama raksasa `prana` lowercase — Inter Display Bold ±433px, letter-spacing −5%, line-height 0.8, full width.
- Copy 40px bold abu `#B3B3B3`, tracking −4%, maks ±3 baris.
- Hero image full width ±700px tinggi.
- Motion: headline + copy appear saat load (stagger); **hero image scroll-scale 1.25 → 1.0** dengan perspective(1200px), selesai ±800px scroll (terukur: 0px=1.25, 300px=1.18, 700px=1.03).

### 6.3 Featured Projects (±1800)
- Judul raksasa "Featured Projects" (±156px, tracking −5%).
- Grid 2 kolom, 4 Work Card (±573×685): gambar cover + nama project + tahun/kategori.
- Tombol "View all projects".
- Motion: card reveal saat masuk viewport; hover card (zoom gambar/cursor label — **perlu verifikasi**).

### 6.4 About (±2080)
- Judul "About Prana" (±207px).
- Kiri: foto potret 275×300 **sticky** saat scroll. Kanan: 4 paragraf 40px bold (putih) ±662px lebar.
- Motion: paragraf reveal per baris/opacity saat scroll (**perlu verifikasi**).

### 6.5 Services → Capabilities (±700)
- List baris 91px, divider, hover state. Isi: Machine Learning, Data Science & Analytics, NLP / Local Language, IoT, Web Development.
- Link "Read more" ke About.

### 6.6 Highlights (ganti Proven Results — tidak ada testimoni)
- Judul raksasa "Highlights"; 4 stat (count-up saat in view) + list Awards & Certifications (ikon ↳, title, issuer, year).
- About diganti: intro + **Experience timeline** vertikal (dot + garis), reveal per item saat scroll (garis draw top→bottom, dot terisi, konten fade-up).
- Ikon referensi (SVG asli): ↳ list, → link, ↑ back-to-top. Work Card hover: cursor badge (lingkaran putih ↗ + pill blur "VIEW PROJECT").

### 6.7 Footer / Contact (±740)
- "Get in touch" raksasa (±238px) → mailto.
- Kolom (Navigate), (Social), "Back to Top", email.
- Wordmark bawah besar (referensi: `COLE` 80px).

### 6.8 Motion di Figma — batasan
Figma prototype bisa: Smart Animate (hover, transisi halaman, appear on load via after-delay), sticky/fixed on scroll.
Figma **tidak bisa**: scroll-linked scale/parallax, live clock, text reveal per-scroll. Ini didokumentasikan di halaman **Motion Spec** (trigger, properti, from→to, durasi, easing) untuk tahap build web.

### 6.9 Struktur file Figma
Pages: `Cover` · `Tokens & Components` · `Desktop` · `Mobile` · `Motion Spec` · `Archive` (berisi hero lama).

## 7. Data model sketch (untuk build nanti)
- **Project**: slug, title, year, category, role, stack[], cover_image, summary, problem, approach, result_metrics[], links{repo, demo}, featured(bool), order.
- **Capability**: name, description, order.
- **Result/Testimonial**: quote | metric, author/source, role, company, avatar.
- **Profile**: name, headline, bio[], photo, email, socials{linkedin, github, x, instagram}, timezone (`Asia/Makassar`).

## 8. Edge cases / failure states
- Nama pendek ("prana", 5 huruf) vs referensi ("collins", 7) — skala headline perlu disesuaikan agar tetap full width.
- Project tanpa gambar → cover placeholder bertipografi, bukan kotak abu kosong.
- Project NDA (mis. GoTo) → tampilkan tanpa data sensitif / label "confidential".
- Judul raksasa di mobile 390 → turun ke ±96–120px, tanpa overflow horizontal.
- `prefers-reduced-motion` → semua scroll/appear animation dimatikan (spec web).
- Font Inter Display tidak tersedia di Figma → fallback Inter.

## 9. Success metrics
- Figma: semua halaman MVP lengkap, tanpa teks terpotong/overlap, komponen konsisten.
- Motion Spec mencakup 100% animasi yang teridentifikasi di referensi.
- Web (nanti): LCP < 2.5s, CLS < 0.1, Lighthouse a11y ≥ 90; ≥1 kontak/interview dari portfolio dalam 3 bulan.

## 10. Decisions (2026-10-01)
1–3. Project, results, foto: dummy dulu. 4. Konten English. 5. Wordmark `PRANA`. 6. Hero lama dihapus. 7. Build web: code sendiri (stack menyusul).

## 11. Open questions (resolved — kept for history)
1. **Daftar project**: 4 featured project apa saja (nama, tahun, peran, stack, hasil/metrik, gambar)?
2. **Proven Results**: punya testimoni (dosen/atasan/klien)? Kalau tidak, ganti ke achievement/pengalaman (GoTo, lomba, sertifikasi)?
3. **Foto**: ada foto potret untuk hero/about? Kalau belum, pakai placeholder dulu?
4. **Bahasa konten**: Inggris (default, mirip referensi) atau Indonesia?
5. **Wordmark & kontak**: pakai `PRANA` / `DIBYACITA`? Email & sosial mana yang ditampilkan (LinkedIn, GitHub, Threads @mdprana, dll)?
6. Hero lama ("Portfolio Hero — Desktop") dipindah ke `Archive` atau dihapus?
7. Template Collins adalah template Framer — untuk build web nanti, pakai Framer (beli/remix template) atau code sendiri?

## 12. Revision 2 (2026-10-01)
- Home About = 4 bold paragraphs (as original). Experience timeline lives on About page only.
- Capabilities: alternating white/gray rows, `↳` icons, plain "Read more" link below (no pill).
- New Home section **Tech Stack — "The Toolkit"**: limited to CV-backed tools only: Python, TensorFlow, Keras, PyTorch, scikit-learn, Hugging Face, pandas, NumPy, Jupyter Notebook, OpenCV, Next.js, and React. No IoT tools. Desktop uses a 6×2 periodic grid; mobile uses the same 12 tools in a 3-column grid. Marquee strip loops the same tool set and pauses on hover. Hover inverts tile colors, grows logo, and reveals experience label. Logos: Simple Icons (CC0), white mono.
- CV-backed profile facts: GoTo Data Science / Local Language Specialist Intern, Python data workflows, Streamlit, Node.js/TypeScript backend, Google Cloud Run, Android/Kotlin, Solidity/Web3, and published VGG-16/LSTM image-captioning research. Only the requested ML, data science, and web tools appear in the Home Tech Stack.
- Footer CTA now includes outlined **Download Resume** button with download-arrow icon. Prototype currently opens `https://drive.google.com/` as a safe placeholder until the actual share URL is supplied.
- Figma prototype wired: nav/footer/card/link navigation (Smart Animate 500ms), hover components (Nav Link, Arrow Link, Capability Row, Work Card, Tech Tile, Resume button), mobile menu overlay (Move In ↓) + close.
- Project Detail mobile (390) added.
- Motion Spec rows 17–24 added (marquee, tile reveal/hover, nav roll, arrow link, capability row, mobile menu, page transition).
