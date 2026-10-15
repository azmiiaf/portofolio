### Portofolio
projek ini dilakukan untuk membangun portofolio pribadi dngan yang menarik dan informatif, portofolio ini dibuat dengan saya sebagai admin yang bisa akses ke panel admin untuk manage data informasi di tampilan, namun path yang bisa diakses ke panel admin akan diketik manual di bar urlnya dan jadinya tidak tampak di tampilan untuk akses ke panel admin.

## tujuan
- agar penambahan informasi terkait portofolio tidak dilakukan secara langsung kedalam kode.
- menampilkan informasi terkait saya sebagai yang punya portofolionya.

## Fitur-fitur Projek
fitur pada portofolio ini lebih banyak action di panel admin untuk memanage informasi di tampilan.

# Fitur Panel Admin (CRUD)
1. Sidebar
berisikan:
* profile: untuk mengedit data profile yang ada data seperti: 
- Nama
- Role : (cth: Fullstack Developer) 
- deskripsi diri: deskripsi singkat tentang user
- Tentang Diri: berisi deskripsi diri secara lengkap
- keahlian: bisa ditambah beberapa data tidak cuma satu
- upload foto

* Pendidikan
- pendidikan: bisa ditambah data agar tidak cuma 1 data pendidikan

* Lisensi & Sertifikasi
- Lisensi & Sertifikasi: bisa ditambah beberapa data tidak cuma satu. inputnya berisikan Upload file nya, tahun terbit, tahun expire

* Projek
- nama projek
- deskripsi
- kategori: (cth: website, mobile app atau lainnya)
- upload gambar: bisa lebih dari 1 gambar
- tech yang digunakan: tampil dengan dropdown dan bisa isi sendiri jika tidak ada opsi nya
- link demo
- link repository github
- optional informasi: digunakan untuk ditampilkan di halaman detail projek, bisa berisikan seperti input title dan deskripsi untuk mendeskripsikan title 

* experience
- pengalaman: nama pengalaman
- tipe pengalaman: (cth: magang, projek mandiri, atau lainnya) input diisi manual ga pake dropdown
- tahun mulai & tahun selesai
- deskripsi pekerjaannya

* Contact
- email
- github
- linkedin

2. Tampilan halaman dari list yg dipilih di sidebar

## Struktur Folder Projek

.
├── .claude/
├── .gemini/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Elements/
│   │   ├── Fragments/
│   │   ├── Layout/
│   │   └── services/
│   ├── pages/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── CLAUDE.md
├── eslint.config.js
├── GEMINI.md
├── index.html
├── package.json
├── pnpm-lock.yaml
├── PROMPT_REQUIREMENTS.md
├── README.md
└── vite.config.js

# penjelasan struktur folder
- di folder components terdapat beberapa folder yang di tiap tiap folder tersebut sudah ada rules untuk membuat generate kodenya pada file rules.md, dibaca dulu baru eksekusi

## Routing
menggunakan CreateRouterBrowser dan BrowserProvide yang dimana diatur di halaman main.jsx untuk routingnya


## ketentuan lain
gunakan skill antislop untuk dijadikan rules saat vibe code atau generate code

## Tampilan Frontend / tampilan web
memiliki urutan seperti berikut:
1. section About: nama, Role, deskripsi singkat dan terdapat foto user
2. Pendidikan
3. Keahlian
4. Lisensi & Sertifikasi
terdapat beberapa fitur:
- lihat sertifikat (muncul popup dari tampilan sertifikat, seperti buka pdf di browser, atau jika foto bisa scroll)
5. Projek
berisikan card card dari projek yang telah dibuat dan tiap card akan ada fitur:
- lihat detail untuk di arahkan ke detail projek
- icon github untuk diarahkan ke repositorynya
6. Experience
7. Footer berisi Contact 


# font
menggunakan 2 font :
- Sathoshi Bold 700-900
- Sathosi reguler 300-400
- Satoshi Medium 500