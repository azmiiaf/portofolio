export const projects = [
  {
    id: 1,
    slug: "waste-bank-information-system",
    title: "Sistem Informasi Bank Sampah",
    category: "Aplikasi Web",
    description:
      "Aplikasi web full-stack untuk mengelola operasional bank sampah, mencatat setoran dan tabungan nasabah, serta meranking nasabah aktif secara otomatis menggunakan algoritma VIKOR.",
    overview:
      "Sistem ini dibangun untuk mendigitalisasi dan menyederhanakan operasional bank sampah berbasis komunitas. Sebelum aplikasi ini ada, seluruh pencatatan — setoran sampah, transaksi tabungan, data nasabah — dikelola secara manual menggunakan formulir kertas, sehingga menyulitkan pemantauan dan identifikasi nasabah aktif.",
    problem:
      "Bank sampah tidak memiliki sistem digital untuk mencatat setoran sampah nasabah, melacak tabungan, maupun menghasilkan laporan operasional apapun. Mencari nasabah paling aktif harus dilakukan dengan perhitungan manual yang memakan waktu dan rawan kesalahan.",
    solution:
      "Sistem informasi berbasis web dibangun menggunakan React.js di sisi frontend dan Node.js/Express.js di backend, terhubung ke database MySQL. Sistem ini mengimplementasikan algoritma VIKOR untuk menghitung dan meranking nasabah berdasarkan beberapa kriteria: frekuensi setoran, total berat, dan total tabungan. Petugas dapat login, mencatat transaksi, membuat laporan, dan melihat daftar ranking nasabah dari satu dashboard.",
    features: [
      "Autentikasi berbasis peran (admin dan petugas)",
      "Manajemen nasabah (tambah, edit, hapus, lihat)",
      "Manajemen jenis sampah dan harga",
      "Pencatatan setoran sampah per transaksi",
      "Buku tabungan nasabah dan pelacakan saldo",
      "Ranking nasabah berbasis VIKOR dengan bobot kriteria yang dapat dikonfigurasi",
      "Dashboard dengan statistik ringkasan operasional",
      "Laporan setoran dan tabungan per periode",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MySQL",
      "VIKOR Algorithm",
    ],
    challenges: [
      "Mengimplementasikan algoritma VIKOR dengan benar menggunakan input bobot yang dinamis",
      "Merancang skema relasional yang mendukung data setoran, tabungan, dan ranking secara efisien",
      "Membangun dashboard admin yang menyajikan data kompleks secara mudah dibaca",
    ],
    solutions: [
      "Perhitungan VIKOR ditangani di sisi server menggunakan Node.js, memisahkan logika bisnis dari UI",
      "Skema database dinormalisasi untuk memisahkan nasabah, transaksi, dan ranking ke dalam tabel-tabel tersendiri dengan relasi foreign key",
      "Dashboard menggunakan query agregat untuk menampilkan angka ringkasan tanpa membebani UI dengan data mentah",
    ],
    result:
      "Aplikasi web full-stack yang berfungsi penuh, menggantikan sistem berbasis kertas, memungkinkan petugas mencatat transaksi secara digital dan mengidentifikasi nasabah paling aktif secara otomatis menggunakan ranking kuantitatif.",
    image: "/images/banksampah-1.png",
    screenshots: [
      "/images/banksampah-1.png",
      "/images/banksampah-2.png",
      "/images/banksampah-3.png",
      "/images/banksampah-4.png",
      "/images/banksampah-5.png",
    ],
    github: null,
    demo: null,
    featured: true,
  },
  {
    id: 2,
    slug: "taskco",
    title: "TaskCo",
    category: "Aplikasi Web",
    description:
      "Aplikasi web manajemen tugas dengan autentikasi, sinkronisasi database real-time, dan antarmuka responsif yang bersih — dibangun dengan React.js dan Supabase sebagai backend.",
    overview:
      "TaskCo adalah alat produktivitas pribadi untuk membuat, melacak, dan menyelesaikan tugas. Aplikasi ini dibangun sebagai single-page application menggunakan React.js, dengan Supabase menyediakan autentikasi dan database PostgreSQL real-time.",
    problem:
      "Sebagian besar alat manajemen tugas terlalu berat untuk penggunaan pribadi yang sederhana atau kurang memiliki penyimpanan data yang memadai. Tujuannya adalah membangun manajer tugas yang minimal, cepat, dan fungsional dengan autentikasi yang valid dan penyimpanan cloud — tanpa membangun backend khusus.",
    solution:
      "TaskCo menggunakan Supabase sebagai Backend-as-a-Service, sehingga tidak perlu menjaga server terpisah. React.js menangani seluruh state UI dan interaksi, sementara Tailwind CSS memastikan antarmuka responsif dan rapi. Kebijakan Row Level Security (RLS) di Supabase memastikan setiap pengguna hanya dapat mengakses tugasnya sendiri.",
    features: [
      "Autentikasi email/password melalui Supabase Auth",
      "Membuat, mengedit, dan menghapus tugas dengan judul dan deskripsi",
      "Mengubah status penyelesaian tugas",
      "Dashboard yang menampilkan ringkasan tugas berdasarkan status",
      "Data disimpan di Supabase PostgreSQL (sinkronisasi real-time)",
      "Antarmuka responsif yang bekerja di mobile dan desktop",
      "Terdapat fitur teknik pomodoro untuk mengatur waktu saat mengerjakan tugas dengan sistem selang-seling fokus dan istirahat",
    ],
    technologies: ["React.js", "Supabase", "Tailwind CSS", "JavaScript"],
    challenges: [
      "Mengonfigurasi Row Level Security Supabase agar tugas setiap pengguna terisolasi",
      "Mengelola state autentikasi di seluruh pohon komponen React tanpa library state management",
      "Menjaga UI tetap responsif dan cepat dengan pembaruan data real-time",
    ],
    solutions: [
      "Kebijakan RLS ditulis langsung di Supabase untuk menerapkan isolasi data per pengguna di tingkat database",
      "React Context digunakan untuk membagikan state autentikasi di seluruh aplikasi tanpa prop drilling atau library eksternal",
      "Subscription real-time Supabase digunakan agar daftar tugas tetap sinkron dengan database tanpa refetch manual",
    ],
    result:
      "Aplikasi manajemen tugas yang fungsional dengan autentikasi yang berjalan, penyimpanan permanen, dan antarmuka responsif — dibangun sepenuhnya tanpa server backend khusus.",
    image: "/images/taskco-1.png",
    screenshots: [
      "/images/taskco-1.png",
      "/images/taskco-2.png",
      "/images/taskco-3.png",
    ],
    github: null,
    demo: null,
    featured: true,
  },
  {
    id: 3,
    slug: "photobooth-17an",
    title: "Photobooth 17an",
    category: "Aplikasi Web",
    description:
      "Sebuah inisiatif pengadaan photobooth bertema peringatan kemerdekaan 17 Agustus di malam puncak untuk memeriahkan acara dan memberikan pengalaman baru bagi warga lingkungan.",
    overview:
      "Proyek ini merupakan gebrakan baru dalam perayaan 17-an di lingkungan tempat tinggal. Di malam puncak acara, saya dan tim menghadirkan photobooth tematik agar warga dapat mengabadikan momen kemeriahan kemerdekaan secara interaktif dan berkesan.",
    problem:
      "Perayaan 17-an sebelumnya cenderung monoton dan kurang memiliki daya tarik visual atau kenang-kenangan yang bisa diabadikan oleh warga pada saat malam puncak acara.",
    solution:
      "Menginisiasi dan menyediakan area photobooth dengan dekorasi dan properti bertema kemerdekaan. Hal ini sukses menarik antusiasme warga, memberikan hiburan tambahan, serta menciptakan memori kolektif bagi masyarakat lingkungan.",
    features: [
      "Dekorasi tematik khas kemerdekaan 17 Agustus",
      "Properti foto interaktif dan kreatif",
      "Sistem foto interaktif di malam puncak acara",
      "Meningkatkan partisipasi dan kemeriahan warga lingkungan",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Tailwind CSS",
      "JavaScript",
      "Vite",
      "QR Code API",
    ],
    challenges: [
      "Mengonsep dan membuat dekorasi photobooth yang menarik",
      "Mengatur alur warga yang ingin berfoto agar tidak terjadi penumpukan",
      "Memastikan pencahayaan yang cukup untuk sesi foto di malam hari",
    ],
    solutions: [
      "Berkolaborasi dengan pemuda lingkungan untuk menyusun dekorasi kreatif",
      "Membuat sistem antrean sederhana dengan bantuan panitia acara",
      "Menggunakan lighting tambahan agar hasil foto warga maksimal di malam hari",
    ],
    result:
      "Photobooth menjadi salah satu daya tarik utama pada malam puncak, memberikan nuansa segar dan gebrakan baru yang sangat diapresiasi oleh seluruh warga.",
    experience: [
      "Aplikasi ini dirancang dengan tampilan bertema 17 Agustus — dominasi warna merah-putih yang meriah dengan desain antarmuka modern dan responsif, dioptimalkan untuk penggunaan di perangkat mobile maupun layar besar selama acara berlangsung.",
      "Alur penggunaannya sangat terstruktur: pengguna dimulai dari layar pemilihan frame, di mana terdapat 4 variasi desain bertema kemerdekaan yang bisa dipilih. Setiap tahapan dilengkapi timer hitung mundur agar antrean tetap lancar dan tidak ada peserta yang menunggu terlalu lama.",
      "Pada sesi kamera, sistem secara otomatis mengambil 8 foto berurutan dengan overlay countdown (5 ke 1) sebelum setiap jepret — memberikan jeda bagi peserta untuk berganti pose secara natural tanpa perlu diarahkan panitia.",
      "Di tahap akhir, foto hasil pilihan peserta langsung dikonversi dan ditampilkan sebagai QR Code. Peserta cukup scan menggunakan HP masing-masing untuk langsung menyimpan foto ke galeri — tanpa perlu kabel, email, atau aplikasi tambahan.",
    ],
    image: "/images/photobooth-1.png",
    screenshots: [
      "/images/photobooth-1.png",
      "/images/photobooth-2.png",
      "/images/photobooth-3.png",
      "/images/photobooth-4.png",
    ],
    github: null,
    demo: null,
    featured: true,
  },
];
