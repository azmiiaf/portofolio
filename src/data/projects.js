export const projects = [
  {
    id: 1,
    slug: "waste-bank-information-system",
    title: "Sistem Informasi Bank Sampah",
    category: "Aplikasi Web",
    description:
      "Aplikasi web full-stack untuk mengelola operasional bank sampah, mencatat setoran dan tabungan nasabah, serta meranking nasabah aktif secara otomatis menggunakan algoritma VIKOR.",
    overview:
      "Sistem informasi berbasis web yang dirancang untuk mendigitalisasi pencatatan operasional bank sampah yang sebelumnya manual. Aplikasi ini mengintegrasikan manajemen data transaksional dengan sistem pendukung keputusan untuk perankingan nasabah.",
    problem:
      "Pengelolaan data bank sampah masih menggunakan formulir kertas, sehingga menyulitkan pencatatan setoran, pelacakan tabungan, dan proses perankingan nasabah aktif yang harus dihitung secara manual secara berkala.",
    solution:
      "Membangun aplikasi full-stack menggunakan React.js untuk antarmuka pengguna yang dinamis, didukung Node.js dan Express.js untuk RESTful API di sisi server, serta database MySQL. Mengimplementasikan logika algoritma VIKOR di backend untuk mengotomatisasi perankingan nasabah berdasarkan kriteria multi-faktor.",
    features: [
      "Autentikasi berbasis peran (admin dan petugas)",
      "Manajemen data nasabah dan tabungan real-time",
      "Pencatatan transaksi setoran sampah dan harga dinamis",
      "Modul perhitungan otomatis ranking nasabah berbasis algoritma VIKOR",
      "Dashboard analitik dengan ringkasan statistik operasional",
      "Fitur ekspor dan pencatatan laporan periodik",
    ],
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "MySQL",
      "VIKOR Algorithm",
    ],
    challenges: [
      "Mengimplementasikan perhitungan matematis algoritma VIKOR dengan bobot kriteria yang dinamis di sisi server",
      "Merancang skema relasional database yang efisien untuk menangani relasi nasabah, transaksi, dan histori tabungan",
      "Membangun dashboard interaktif yang menyajikan data statistik kompleks agar mudah dibaca oleh admin",
    ],
    solutions: [
      "Memisahkan logika bisnis perhitungan VIKOR ke dalam controller terpisah di Node.js agar performa UI tetap ringan",
      "Melakukan normalisasi skema database MySQL dan menerapkan foreign key constraints untuk menjaga integritas data transaksional",
      "Memanfaatkan query agregat SQL untuk menyaring data ringkasan secara instan sebelum dikirim ke komponen frontend React",
    ],
    result:
      "Berhasil mengembangkan sistem informasi berbasis web yang memangkas proses manual, memungkinkan petugas mencatat transaksi secara digital, dan mengotomatisasi analisis perankingan nasabah secara akurat.",
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
      "Aplikasi web manajemen tugas kolaboratif dengan autentikasi, sinkronisasi database real-time, dan antarmuka responsif — dibangun dengan React.js dan Supabase.",
    overview:
      "TaskCo adalah single-page application (SPA) berbasis web untuk produktivitas tim dan manajemen tugas personal. Aplikasi ini dirancang untuk memudahkan pembagian workspace, pendelegasian tugas, pelacakan deadline, hingga integrasi teknik fokus waktu.",
    problem:
      "Banyak aplikasi manajemen tugas terlalu kompleks untuk penggunaan ringan, atau sebaliknya, kurang memiliki fitur kolaborasi tim dan penyimpanan cloud real-time yang memadai tanpa harus membangun konfigurasi backend dari nol.",
    solution:
      "Mengembangkan aplikasi web menggunakan React.js dan Tailwind CSS di sisi frontend yang terintegrasi penuh dengan Supabase sebagai Backend-as-a-Service (BaaS) untuk menangani autentikasi, database PostgreSQL, dan sinkronisasi data secara real-time.",
    features: [
      "Sistem autentikasi aman via Supabase Auth (Email/Password)",
      "Manajemen Workspace dan pendelegasian tugas antar anggota tim",
      "Kolaborasi tugas via kolom komentar dan laporan progres real-time",
      "Monitoring timeline tugas dan indikator status deadline",
      "Fitur Timer Pomodoro terintegrasi untuk membantu pengguna dalam memanajemen durasi kerja",
      "Antarmuka responsif yang dioptimalkan untuk perangkat mobile dan desktop",
    ],
    technologies: ["React.js", "Supabase", "Tailwind CSS", "JavaScript"],
    challenges: [
      "Mengonfigurasi Row Level Security (RLS) di Supabase agar privasi data antar workspace dan pengguna terisolasi dengan aman",
      "Mengelola state aplikasi yang kompleks di komponen React tanpa menggunakan library state management eksternal yang berat",
      "Menjaga performa antarmuka tetap responsif di tengah pembaruan data sinkronisasi real-time",
    ],
    solutions: [
      "Menulis policy Row Level Security langsung di tingkat database PostgreSQL Supabase untuk proteksi data berbasis user ID",
      "Memanfaatkan React Context API untuk manajemen state global autentikasi dan data workspace secara bersih",
      "Menggunakan fitur real-time subscription dari Supabase untuk memperbarui state komponen secara otomatis tanpa perlu manual refetch",
    ],
    result:
      "Aplikasi manajemen tugas kolaboratif yang responsif, aman, dan memiliki fitur real-time yang handal untuk mengatur tugas kompleks maupun harian.",
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
      "Aplikasi web photobooth interaktif bertema kemerdekaan dengan fitur kustomisasi frame, timer otomatis, pengambilan multi-frame, dan integrasi QR Code untuk unduh foto.",
    overview:
      "Photobooth 17an adalah aplikasi web progresif interaktif yang dirancang untuk memberikan pengalaman mengambil foto digital secara mandiri berbasis web browser, lengkap dengan alur kerja otomatis dari pemilihan bingkai hingga penyimpanan foto.",
    problem:
      "Penggunaan photobooth konvensional seringkali membutuhkan perangkat keras tambahan yang rumit, kabel transfer manual, atau operator khusus yang memperlambat antrean pengguna.",
    solution:
      "Membangun aplikasi web interaktif menggunakan React.js, Vite, dan Tailwind CSS yang memanfaatkan akses MediaDevices API browser untuk kontrol kamera secara langsung, serta integrasi generator QR Code untuk kemudahan pengunduhan file foto oleh pengguna.",
    features: [
      "Antarmuka responsif bertema khusus kemerdekaan yang dioptimalkan untuk layar sentuh",
      "Sistem pemilihan frame foto interaktif dengan berbagai variasi desain",
      "Fitur hitung mundur (countdown timer) otomatis sebelum pengambilan gambar beruntun",
      "Pengambilan multi-shot secara otomatis untuk memberikan variasi pose",
      "Konversi hasil foto instan menjadi QR Code unik untuk unduh mandiri via smartphone",
    ],
    technologies: [
      "React.js",
      "Tailwind CSS",
      "JavaScript",
      "Vite",
      "QR Code API",
    ],
    challenges: [
      "Mengakses dan mengontrol stream video kamera perangkat secara mulus di berbagai jenis browser dan perangkat",
      "Mengatur sinkronisasi timer hitung mundur multi-detik dengan aksi penangkapan frame canvas gambar",
      "Membuat sistem penyimpanan dan distribusi file foto secara instan tanpa membebani memori browser",
    ],
    solutions: [
      "Memanfaatkan HTML5 Canvas API untuk merender dan menggabungkan frame grafis dengan tangkapan stream video secara client-side",
      "Mengimplementasikan asynchronous state handling di React untuk mengontrol jeda antar-jepretan foto secara akurat",
      "Mengintegrasikan library generator QR Code untuk mengubah data gambar menjadi tautan unduhan digital secara instan",
    ],
    result:
      "Aplikasi web photobooth yang berjalan mulus tanpa kendala, memberikan pengalaman interaktif modern bagi pengguna untuk mengabadikan momen secara mandiri.",
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