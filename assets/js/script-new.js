const DATA = {
  health: [
    {
      title: "Kawasan Tanpa Rokok",
      description: "Seluruh area Gedung J6 adalah kawasan bebas rokok sesuai peraturan kampus.",
      icon: "bi-slash-circle"
    },
    {
      title: "Gaya Hidup Sehat",
      description: "Program wellness dan olahraga rutin untuk meningkatkan kesehatan civitas akademika.",
      icon: "bi-bicycle"
    },
    {
      title: "Sanitasi & Kebersihan",
      description: "Sistem sanitasi dan kebersihan yang ketat untuk menjaga lingkungan kampus.",
      icon: "bi-droplet-half"
    }
  ],
  safety: [
    {
      title: "APAR (Alat Pemadam Api Ringan)",
      description: "48 unit APAR tersebar di berbagai lokasi untuk penanganan kebakaran awal.",
      icon: "bi-fire",
      image: "assets/images/Safety/apar lantai 2.jpeg"
    },
    {
      title: "Hydrant Kebakaran",
      description: "12 unit hydrant yang strategis ditempatkan untuk memudahkan akses pemadaman.",
      icon: "bi-droplet-fill",
      image: "assets/images/Safety/hydran-lapangan.jpeg"
    },
    {
      title: "Tangga Darurat",
      description: "6 tangga darurat tersedia di ujung timur dan barat setiap lantai.",
      icon: "bi-signpost-split",
      image: "assets/images/Safety/tangga darurat 1 lantai 2.jpeg"
    },
    {
      title: "Titik Kumpul",
      description: "Titik kumpul evakuasi di lapangan parkir depan Gedung J6 untuk keselamatan.",
      icon: "bi-geo-alt-fill",
      image: "assets/images/Safety/titik-kumpul-1.jpeg"
    },
    {
      title: "Pos Keamanan",
      description: "Pos keamanan utama untuk koordinasi dan penanganan situasi darurat.",
      icon: "bi-building-fill-check",
      image: "assets/images/Safety/pos satpam.jpeg"
    }
  ],
  security: [
    {
      title: "CCTV 24 Jam",
      description: "64 unit CCTV yang beroperasi 24 jam untuk pengawasan dan dokumentasi.",
      icon: "bi-camera-video-fill",
      image: "assets/images/Security/CCTV.jpg"
    },
    {
      title: "Pos Keamanan",
      description: "Pos keamanan di pintu masuk utama dengan sistem verifikasi tamu.",
      icon: "bi-shield-fill-check",
      image: "assets/images/Security/pos satpam.jpeg"
    },
    {
      title: "Area Parkir Terawasi",
      description: "Area parkir yang terpantau dengan sistem keamanan terintegrasi.",
      icon: "bi-p-square-fill",
      image: "assets/images/Security/parkiran-motor-gunadarma-lantai2.jpeg"
    },
    {
      title: "Sistem Akses Terkontrol",
      description: "Sistem akses pintu dengan smart lock door untuk mengontrol lalu lintas.",
      icon: "bi-lock-fill",
      image: "assets/images/Security/smart-lock-door-class-gunadarma.jpeg"
    }
  ],
  environment: [
    {
      title: "Green Campus",
      description: "Program penghijauan untuk menciptakan lingkungan kampus yang asri dan sejuk.",
      icon: "bi-tree-fill"
    },
    {
      title: "Manajemen Sampah",
      description: "Sistem pemisahan sampah organik, anorganik, dan berbahaya yang teratur.",
      icon: "bi-recycle"
    },
    {
      title: "Efisiensi Energi",
      description: "Penggunaan lampu LED dan sistem hemat energi untuk mengurangi konsumsi.",
      icon: "bi-lightning-charge-fill"
    },
    {
      title: "Penghematan Air",
      description: "Sistem kran otomatis dan penyadaran tentang pentingnya hemat air.",
      icon: "bi-droplet-fill"
    },
    {
      title: "Taman & Tanaman",
      description: "Area taman hijau dan tanaman penghias untuk meningkatkan kualitas udara.",
      icon: "bi-flower1"
    },
    {
      title: "Program Edukasi",
      description: "Program edukasi lingkungan untuk meningkatkan kesadaran sustainability.",
      icon: "bi-book-fill"
    }
  ]
};

const EMERGENCY_CONTACTS = {
  ambulans: { label: "Ambulans", phone: "119", tel: "119", icon: "bi-heart-pulse" },
  kebakaran: { label: "Kebakaran / Damkar", phone: "113", tel: "113", icon: "bi-fire" },
  polisi: { label: "Polisi", phone: "110", tel: "110", icon: "bi-shield-lock" },
  satpam: { label: "Pos Keamanan J6", phone: "+62 812-8608-4411", tel: "+6281286084411", icon: "bi-building-fill-check" }
};

// ==========================================================================
// INITIALIZATION
// ========================================================================== 

document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  loadDynamicContent();
  initializeVideos();
  initializeDarkMode();
  initializeNavbarScroll();
  initializeSmoothScroll();
});

// ========================================================================== 
// EVENT LISTENERS
// ========================================================================== 

function initializeEventListeners() {
  // Dark Mode Toggle
  const darkModeBtn = document.getElementById('darkModeBtn');
  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', toggleDarkMode);
  }

  // AI Assistant Button
  const aiBtn = document.getElementById('aiBtn');
  if (aiBtn) {
    aiBtn.addEventListener('click', toggleAIChat);
  }

  const aiBtnHome = document.getElementById('aiBtnHome');
  if (aiBtnHome) {
    aiBtnHome.addEventListener('click', toggleAIChat);
  }

  // Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger) {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.addEventListener('click', function() {
      const isOpen = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('modal-open', isOpen);
    });
  }

  // Close menu when clicking on nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => closeNavMenu());
  });

  // Tutup menu mobile saat klik di luar area menu
  document.addEventListener('click', (e) => {
    if (!navMenu || !navMenu.classList.contains('active')) return;
    if (e.target.closest('.nav-menu') || e.target.closest('#hamburger')) return;
    closeNavMenu();
  });

  // Modal Close Button
  const modal = document.getElementById('modal');
  const modalClose = document.querySelector('.modal-close');
  if (modalClose) {
    modalClose.addEventListener('click', () => closeModal());
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeNavMenu();
      closeAIChat();
    }
  });

  // Content Items Click — link di dalam kartu (mis. tel:) tetap berjalan normal
  document.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    const item = e.target.closest('.content-item');
    if (item) openDetailFromItem(item);
  });

  // Content Items — buka modal lewat keyboard (Enter / Space)
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if (!e.target || !e.target.closest) return;
    const item = e.target.closest('.content-item');
    if (!item || e.target.closest('a')) return;
    e.preventDefault();
    openDetailFromItem(item);
  });
}

// ========================================================================== 
// DARK MODE
// ========================================================================== 

function toggleDarkMode() {
  const html = document.documentElement;
  const isDarkMode = html.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  updateDarkModeIcon();
}

function initializeDarkMode() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
  }
  updateDarkModeIcon();
}

function updateDarkModeIcon() {
  const darkModeBtn = document.getElementById('darkModeBtn');
  const isDarkMode = document.documentElement.classList.contains('dark-mode');
  if (darkModeBtn) {
    darkModeBtn.innerHTML = isDarkMode
      ? '<i class="bi bi-sun-fill"></i>'
      : '<i class="bi bi-moon-stars"></i>';
    const label = isDarkMode ? 'Nonaktifkan mode gelap' : 'Aktifkan mode gelap';
    darkModeBtn.title = label;
    darkModeBtn.setAttribute('aria-label', label);
  }
}

// ========================================================================== 
// NAVBAR SCROLL EFFECT
// ========================================================================== 

function closeNavMenu() {
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.getElementById('hamburger');
  if (!navMenu || !navMenu.classList.contains('active')) return;
  navMenu.classList.remove('active');
  hamburger?.classList.remove('active');
  hamburger?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('modal-open');
}

function initializeNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// ========================================================================== 
// DYNAMIC CONTENT LOADING
// ========================================================================== 

function loadDynamicContent() {
  loadContent('healthWrap', DATA.health);
  loadContent('facilityWrap', DATA.safety);
  loadContent('securityWrap', DATA.security);
  loadContent('environmentWrap', DATA.environment);
  initReveal();
}

function loadContent(containerId, contentArray) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = contentArray.map((item, index) => {
    const mediaHtml = item.image
      ? `<div class="content-item-media"><img src="${item.image}" alt="${item.title}" loading="lazy"></div>`
      : `<div class="content-item-media emoji-bg"><i class="bi ${item.icon} content-item-emoji"></i></div>`;

    return `
      <article class="content-item" tabindex="0" role="button" data-index="${index}" aria-label="Lihat detail ${item.title}">
        ${mediaHtml}
        <div class="content-item-body">
          <div class="content-item-title">${item.title}</div>
          <div class="content-item-desc">${item.description}</div>
          <span class="content-item-more">Lihat detail <i class="bi bi-arrow-right-short"></i></span>
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================================================
// DETAIL INFORMASI (MODAL)
// ==========================================================================

// Kumpulan detail per topik. Kunci = judul kartu.
const DETAILS = {
  // ---------------- HEALTH ----------------
  'Kawasan Tanpa Rokok': {
    icon: 'bi-slash-circle',
    summary: 'Seluruh area Gedung J6 ditetapkan sebagai Kawasan Tanpa Rokok (KTR) berdasarkan peraturan kampus dan peraturan daerah Kota Bekasi. Ketentuan ini berlaku untuk seluruh civitas akademika maupun tamu.',
    points: [
      'Dilarang merokok, membawa rokok, maupun menggunakan rokok elektrik/vape di seluruh area gedung, termasuk tangga darurat dan area parkir.',
      'Dilarang menjual atau mengiklankan produk tembakau di lingkungan kampus.',
      'Papan peringatan KTR dipasang di setiap pintu masuk dan titik strategis.',
      'Pelanggar akan ditegur oleh petugas keamanan dan dapat dikenakan sanksi sesuai aturan kampus.'
    ],
    note: 'Ingin berhenti-merokok? Rujuk ke klinik mitra di luar kampus (Klinik dr. Aidah) atau tanyakan ke pos keamanan lantai 1.',
    contacts: ['klinikAidah']
  },
  'Gaya Hidup Sehat': {
    icon: 'bi-bicycle',
    summary: 'Program wellness kampus untuk menjaga kebugaran fisik dan kesehatan mental civitas akademika Gedung J6.',
    points: [
      'Kegiatan olahraga bersama (senam, futsal, badminton) pada jadwal rutin kampus.',
      'Kampanye jalan kaki: gunakan tangga untuk jarak dekat, bukan lift.',
      'Edukasi pola makan bergizi seimbang melalui poster dan media sosial kampus.',
      'Layanan konseling kesehatan mental bagi mahasiswa dan karyawan.'
    ],
    note: 'Kurangi duduk terus-menerus: berdiri dan regangkan tubuh setiap 60 menit bekerja di depan komputer.',
    contacts: []
  },
  'Sanitasi & Kebersihan': {
    icon: 'bi-droplet-half',
    summary: 'Sistem sanitasi dan kebersihan Gedung J6 dikelola secara rutin untuk mencegah penyebaran penyakit.',
    points: [
      'Pembersihan area umum dilakukan setiap hari, termasuk pegangan tangga dan tombol lift.',
      'Fasilitas cuci tangan dan sabun tersedia di toilet setiap lantai.',
      'Petugas kebersihan menggunakan alat pelindung diri saat bekerja.',
      'Wastafel dan area basah dibersihkan terjadwal agar tidak menjadi sarang nyamuk.'
    ],
    note: 'Temukan fasilitas kebersihan yang rusak? Laporkan ke petugas kebersihan atau pos keamanan lantai 1.',
    contacts: []
  },

  // ---------------- SAFETY ----------------
  'APAR (Alat Pemadam Api Ringan)': {
    icon: 'bi-fire',
    summary: '48 unit APAR tersebar di setiap lantai Gedung J6 dengan jarak jangkauan maksimal 15 meter antar unit.',
    points: [
      'Jenis APAR: powder (serbuk) untuk kebakaran bahan padat, cair, dan listrik; CO₂ untuk area panel listrik.',
      'Cara pakai: tarik pin pengaman, arahkan nozzle ke dasar api, tekan tuas, dan sapukan merata.',
      'Berat tabung 3–6 kg, dipasang di dinding pada ketinggian 120 cm dari lantai.',
      'Pemeriksaan tekanan dan isi ulang dilakukan setiap 6 bulan oleh petugas terlatih.'
    ],
    note: 'Gunakan APAR hanya untuk api kecil. Bila api sudah membesar atau asap menebal, segera tinggalkan lokasi dan gunakan tangga darurat. Hubungi 113.',
    contacts: []
  },
  'Hydrant Kebakaran': {
    icon: 'bi-droplet-fill',
    summary: '12 unit hydrant kebakaran ditempatkan secara strategis di sekeliling Gedung J6 untuk pasokan air bertekanan saat pemadaman.',
    points: [
      'Terdiri dari hydrant pilar (outdoor) dan hydrant gedung (indoor) di setiap lantai.',
      'Tabung dan selang dilengkapi kotak kaca agar mudah dibuka saat darurat.',
      'Akses ke hydrant tidak boleh terhalang kendaraan atau barang.',
      'Hydrant hanya boleh digunakan oleh petugas terlatih atau petugas pemadam kebakaran.'
    ],
    note: 'Jangan memarkir kendaraan di depan area hydrant. Hubungi pos keamanan bila menemukan hydrant yang rusak.',
    contacts: []
  },
  'Tangga Darurat': {
    icon: 'bi-signpost-split',
    summary: '6 tangga darurat tersedia di ujung timur dan barat setiap lantai, berfungsi sebagai jalur evakuasi utama saat listrik padam atau kebakaran.',
    points: [
      'Tangga darurat selalu dalam kondisi bersih dan tidak boleh digunakan untuk menyimpan barang.',
      'Pintu tangga darurat dilengkapi penutup otomatis (door closer) agar tetap tertutup.',
      'Di setiap tangga tersedia lampu darurat dan tanda arah evakuasi.',
      'Saat evakuasi, turun dengan tenang, jangan berlari, dan jangan gunakan lift.'
    ],
    note: 'Hitung jumlah pintu tangga darurat dari ruang Anda sekarang — ini membantu saat asap menutupi pandangan.',
    contacts: []
  },
  'Titik Kumpul': {
    icon: 'bi-geo-alt-fill',
    summary: 'Titik kumpul evakuasi berada di lapangan parkir depan Gedung J6, dipilih karena terbuka, jauh dari bangunan, dan mudah dijangkau.',
    points: [
      'Setelah evakuasi, langsung menuju titik kumpul dan jangan kembali ke gedung.',
      'Lakukan pengecekan kehadiran (roll call) bersama petugas per lantai.',
      'Ikuti arahan petugas keamanan dan jangan memblokir jalur masuk kendaraan darurat.',
      'Utamakan menolong civitas yang membutuhkan bantuan tanpa membahayakan diri sendiri.'
    ],
    note: 'Titik kumpul sekunder disediakan di area terbuka sebelah selatan gedung bila titik kumpul utama tidak dapat digunakan.',
    contacts: []
  },
  'Pos Keamanan': {
    icon: 'bi-building-fill-check',
    summary: 'Pos keamanan adalah pusat koordinasi penanganan darurat, penerimaan tamu, dan pelaporan gangguan keamanan di Gedung J6.',
    points: [
      'Pos keamanan lantai 1 beroperasi 24 jam, setiap hari termasuk hari libur.',
      'Semua tamu wajib melapor dan menukar kartu identitas sebelum masuk.',
      'Tersedia kotak P3K, papan nomor darurat, dan akses langsung ke CCTV.',
      'Petugas keamanan dapat memandu evakuasi dan memanggil ambulans atau pemadam kebakaran.'
    ],
    note: 'Simpan nomor pos keamanan di ponsel Anda agar bisa dihubungi saat keadaan darurat.',
    contacts: []
  },

  // ---------------- SECURITY ----------------
  'CCTV 24 Jam': {
    icon: 'bi-camera-video-fill',
    summary: '64 unit CCTV beroperasi 24 jam untuk pengawasan koridor, lobi, tangga, area parkir, dan titik masuk gedung.',
    points: [
      'Pemantauan terpusat dari ruang keamanan lantai 1.',
      'Rekaman disimpan sebagai bukti bila terjadi insiden.',
      'Kamera di area publik saja — toilet dan ruang ganti tidak dipasang kamera.',
      'Permintaan rekaman untuk keperluan penyelidikan harus melalui prosedur resmi kampus.'
    ],
    note: 'Bila kehilangan barang, segera lapor ke pos keamanan lantai 1 agar rekaman dapat ditelusuri selagi masih tersimpan.',
    contacts: []
  },
  'Area Parkir Terawasi': {
    icon: 'bi-p-square-fill',
    summary: 'Area parkir motor dan mobil Gedung J6 terpantau CCTV dengan pintu keluar-masuk terkontrol dan petugas jaga.',
    points: [
      'Gunakan kunci ganda (kunci stang atau gembok cakram) pada kendaraan roda dua.',
      'Simpan STNK di kendaraan dan bawa kartu parkir dengan aman.',
      'Jangan meninggalkan barang berharga di dalam kendaraan atau bagasi motor.',
      'Patuhi area parkir sesuai jenis kendaraan dan rambu yang tersedia.'
    ],
    note: 'Hilangnya kendaraan atau barang wajib dilaporkan segera ke pos keamanan lantai 1 beserta foto dan nomor polisi.',
    contacts: []
  },
  'Sistem Akses Terkontrol': {
    icon: 'bi-lock-fill',
    summary: 'Pintu ruang kelas dan ruang terbatas menggunakan smart lock door dengan kartu akses atau kode, sehingga hanya pihak berwenang yang dapat masuk.',
    points: [
      'Kartu akses bersifat pribadi dan tidak boleh dipinjamkan.',
      'Jangan menahan pintu terbuka dengan benda apa pun karena dapat merusak mekanisme lock.',
      'Segera laporkan kartu akses yang hilang agar dapat dinonaktifkan.',
      'Bila pintu tidak dapat dibuka, hubungi petugas keamanan — jangan memaksa.'
    ],
    note: 'Kehilangan kartu akses dapat mengancam keamanan bersama. Laporkan maksimal 1×24 jam setelah kejadian.',
    contacts: []
  },

  // ---------------- ENVIRONMENT ----------------
  'Green Campus': {
    icon: 'bi-tree-fill',
    summary: 'Program penghijauan kampus untuk menciptakan lingkungan Gedung J6 yang asri, sejuk, dan nyaman bagi kegiatan belajar.',
    points: [
      'Penanaman dan perawatan tanaman di area terbuka, koridor, dan balkon gedung.',
      'Pemeliharaan taman secara berkala oleh petugas kebersihan dan taman.',
      'Pemanfaatan tanaman untuk menurunkan suhu dan menyerap polutan di sekitar gedung.',
      'Civitas akademika diimbau ikut merawat tanaman di sekitar ruangnya.'
    ],
    note: 'Ingin ikut berkontribusi? Laporkan area yang perlu penghijauan ke pengelola gedung melalui pos keamanan lantai 1.',
    contacts: []
  },
  'Manajemen Sampah': {
    icon: 'bi-recycle',
    summary: 'Sistem pemisahan sampah di Gedung J6 memisahkan sampah organik, anorganik, dan bahan berbahaya agar pengelolaannya lebih aman.',
    points: [
      'Tempat sampah organik (hijau), anorganik (kuning), dan B3 (merah) tersedia di setiap lantai.',
      'Sampah kertas, plastik, dan kaleng sebaiknya dibuang dalam keadaan kosong dan kering.',
      'Baterai, lampu bekas, dan cairan kimia tidak boleh dibuang ke tempat sampah biasa.',
      'Pengangkutan sampah dilakukan terjadwal setiap hari agar tidak menumpuk.'
    ],
    note: 'Kurangi sampah sejak awal: gunakan tumbler dan hindari kemasan sekali pakai di lingkungan kampus.',
    contacts: []
  },
  'Efisiensi Energi': {
    icon: 'bi-lightning-charge-fill',
    summary: 'Penggunaan lampu LED dan pengaturan operasional peralatan untuk menekan konsumsi listrik Gedung J6.',
    points: [
      'Lampu LED dipakai di koridor, kelas, dan area umum karena lebih hemat dan tahan lama.',
      'Peralatan elektronik dimatikan saat ruangan tidak digunakan, terutama di akhir jam operasional.',
      'Pengaturan suhu AC pada kisaran 24–25 °C agar tetap nyaman namun hemat energi.',
      'Pemanfaatan cahaya alami dioptimalkan pada jam siang.'
    ],
    note: 'Matikan lampu dan AC saat meninggalkan ruangan — kebiasaan kecil ini berdampak besar pada penghematan energi kampus.',
    contacts: []
  },
  'Penghematan Air': {
    icon: 'bi-droplet-fill',
    summary: 'Pengelolaan penggunaan air bersih di Gedung J6 melalui kran otomatis dan kampanye hemat air.',
    points: [
      'Kran otomatis dan flush hemat air dipasang di toilet untuk mengurangi pemborosan.',
      'Segera laporkan kran, pipa, atau flush yang bocor agar dapat diperbaiki.',
      'Gunakan air secukupnya saat berwudhu dan mencuci tangan.',
      'Penampungan air hujan dimanfaatkan untuk menyiram tanaman.'
    ],
    note: 'Satu kran menetes dapat membuang puluhan liter air per hari. Laporkan segera bila menemukan kebocoran.',
    contacts: []
  },
  'Taman & Tanaman': {
    icon: 'bi-flower1',
    summary: 'Area taman hijau dan tanaman penghias di lingkungan Gedung J6 membantu menjaga kualitas udara dan kenyamanan.',
    points: [
      'Taman dan tanaman penghias dirawat berkala termasuk pemangkasan dan pemupukan.',
      'Zona hijau tersedia sebagai area istirahat dan tempat berteduh di sekitar gedung.',
      'Tanaman di dalam ruangan membantu menjaga kelembapan dan kesegaran udara.',
      'Dilarang memetik atau merusak tanaman di area kampus.'
    ],
    note: 'Manfaatkan area taman untuk istirahat singkat agar mata dan pikiran segar kembali saat bekerja atau belajar.',
    contacts: []
  },
  'Program Edukasi': {
    icon: 'bi-book-fill',
    summary: 'Program edukasi lingkungan untuk menumbuhkan kesadaran keberlanjutan di kalangan civitas akademika Gedung J6.',
    points: [
      'Penyuluhan tentang pemilahan sampah dan pengurangan plastik sekali pakai.',
      'Kampanye hemat energi dan hemat air melalui poster, media sosial, dan kegiatan kampus.',
      'Kegiatan lingkungan bersama seperti kerja bakti dan penanaman pohon.',
      'Materi edukasi disampaikan pada kegiatan orientasi mahasiswa baru dan briefing karyawan.'
    ],
    note: 'Setiap individu berperan dalam keberlanjutan. Mulai dari memilah sampah dan mematikan listrik yang tidak terpakai.',
    contacts: []
  }
};

function openDetailFromItem(item) {
  const container = item.closest('.content-wrap');
  const source = container ? container.id : null;
  const index = Number(item.dataset.index);
  const dataMap = {
    healthWrap: DATA.health,
    facilityWrap: DATA.safety,
    securityWrap: DATA.security,
    environmentWrap: DATA.environment
  };
  const list = dataMap[source];
  const data = list && list[index];
  if (data) openModalWithContent(data.title, data.description, data);
}

function openModalWithContent(title, description, data) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  if (!modalBody) return;

  const detail = DETAILS[title];
  const icon = (data && data.icon) || (detail && detail.icon) || 'bi-info-circle';
  const summary = (detail && detail.summary) || description || '';
  const points = (detail && detail.points) || [];
  const note = detail && detail.note;
  const imageHtml = data && data.image
    ? `<div class="modal-media"><img src="${data.image}" alt="${title}" loading="lazy"></div>`
    : '';

  const pointsHtml = points.length
    ? `<ul class="modal-list">${points.map(p => `<li><i class="bi bi-check2-circle"></i> <span>${p}</span></li>`).join('')}</ul>`
    : '';

  const noteHtml = note
    ? `<div class="modal-note"><i class="bi bi-lightbulb"></i> <span>${note}</span></div>`
    : '';

  modalBody.innerHTML = `
    <div class="modal-panel">
      <span class="eyebrow"><i class="bi ${icon}"></i> Detail Informasi</span>
      <h2 class="modal-title">${title}</h2>
      ${imageHtml}
      <p class="modal-text">${summary}</p>
      ${pointsHtml}
      ${noteHtml}
      <button onclick="closeModal()" class="btn btn-gradient btn-block">Tutup</button>
    </div>
  `;

  modal.classList.add('active');
  document.body.classList.add('modal-open');
  if (modalBody.parentElement) modalBody.parentElement.scrollTop = 0;
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.classList.remove('active');
  }
  document.body.classList.remove('modal-open');
}

// ==========================================================================
// AI ASSISTANT (PANEL CHAT MENGAMBANG)
// ==========================================================================

const AI_QUICK_CHIPS = [
  'Prosedur evakuasi kebakaran',
  'Di mana letak APAR?',
  'Nomor darurat kampus',
  'Terjebak di lift'
];

let aiChatCreated = false;
let aiServerOnline = null;      // null = belum diketahui, true/false setelah dicek
const aiHistory = [];           // riwayat percakapan untuk konteks OpenRouter

function setAIStatus(mode) {
  const el = document.querySelector('#aiChatPanel .ai-chat-status');
  if (!el) return;
  const map = {
    online: ['bi-circle-fill', 'Terhubung AI', 'status-online'],
    offline: ['bi-circle-fill', 'Mode luring', 'status-offline'],
    checking: ['bi-circle-fill', 'Menghubungkan...', 'status-checking']
  };
  const [icon, label, cls] = map[mode] || map.checking;
  el.className = `ai-chat-status ${cls}`;
  el.innerHTML = `<i class="bi ${icon}"></i> ${label}`;
}

async function checkAIServer() {
  try {
    const res = await fetch('/api/status', { cache: 'no-store' });
    if (!res.ok) throw new Error('status tidak tersedia');
    const data = await res.json();
    aiServerOnline = Boolean(data && data.online);
  } catch {
    aiServerOnline = false;
  }
  setAIStatus(aiServerOnline ? 'online' : 'offline');
  return aiServerOnline;
}

// Tanya OpenRouter lewat server perantara. Mengembalikan HTML atau null.
async function askOpenRouter(question) {
  if (aiServerOnline === false) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 35000);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history: aiHistory.slice(-10) }),
      signal: controller.signal
    });

    if (!res.ok) throw new Error(`Server membalas ${res.status}`);

    const data = await res.json();
    if (!data || !data.answer) throw new Error('Jawaban kosong');

    aiServerOnline = true;
    setAIStatus('online');
    return data.answer;
  } catch (error) {
    console.warn('[AI] OpenRouter tidak tersedia:', error.message);
    aiServerOnline = false;
    setAIStatus('offline');
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function ensureAIChatPanel() {
  if (aiChatCreated) return document.getElementById('aiChatPanel');

  const panel = document.createElement('section');
  panel.id = 'aiChatPanel';
  panel.className = 'ai-chat';
  panel.setAttribute('aria-hidden', 'true');
  panel.innerHTML = `
    <header class="ai-chat-head">
      <div class="ai-chat-head-info">
        <span class="ai-chat-avatar"><i class="bi bi-robot"></i></span>
        <div>
          <strong>I-HSSE Assistant</strong>
          <span class="ai-chat-status status-checking"><i class="bi bi-circle-fill"></i> Menghubungkan...</span>
        </div>
      </div>
      <button type="button" class="ai-chat-close" aria-label="Tutup chat"><i class="bi bi-x-lg"></i></button>
    </header>

    <div class="ai-chat-log" id="aiChatLog" role="log" aria-live="polite"></div>

    <div class="ai-chat-chips" id="aiChatChips"></div>

    <form class="ai-chat-form" id="aiChatForm">
      <input type="text" id="aiChatInput" class="ai-chat-input" placeholder="Tulis pertanyaan Anda..." autocomplete="off" aria-label="Pertanyaan">
      <button type="submit" class="ai-chat-send" aria-label="Kirim"><i class="bi bi-send-fill"></i></button>
    </form>
  `;
  document.body.appendChild(panel);

  const log = panel.querySelector('#aiChatLog');
  const form = panel.querySelector('#aiChatForm');
  const input = panel.querySelector('#aiChatInput');
  const chips = panel.querySelector('#aiChatChips');
  const closeBtn = panel.querySelector('.ai-chat-close');

  // Chip pertanyaan cepat
  chips.innerHTML = AI_QUICK_CHIPS
    .map(text => `<button type="button" class="ai-chip">${text}</button>`)
    .join('');
  chips.addEventListener('click', event => {
    const chip = event.target.closest('.ai-chip');
    if (!chip) return;
    input.value = chip.textContent.trim();
    form.requestSubmit();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    input.value = '';
    handleAIQuestion(question);
  });

  closeBtn.addEventListener('click', closeAIChat);

  aiChatCreated = true;
  return panel;
}

function appendAIMessage(role, content) {
  const log = document.getElementById('aiChatLog');
  if (!log) return null;

  const wrap = document.createElement('div');
  wrap.className = `ai-msg ai-msg-${role}`;

  if (role === 'bot') {
    wrap.innerHTML = `
      <span class="ai-msg-avatar"><i class="bi bi-robot"></i></span>
      <div class="ai-msg-bubble">${content}</div>
    `;
  } else {
    wrap.innerHTML = `<div class="ai-msg-bubble">${escapeHtml(content)}</div>`;
  }

  log.appendChild(wrap);
  log.scrollTop = log.scrollHeight;
  return wrap;
}

function appendAITyping() {
  const log = document.getElementById('aiChatLog');
  if (!log) return null;
  const wrap = document.createElement('div');
  wrap.className = 'ai-msg ai-msg-bot ai-typing';
  wrap.innerHTML = `
    <span class="ai-msg-avatar"><i class="bi bi-robot"></i></span>
    <div class="ai-msg-bubble"><span class="ai-dot"></span><span class="ai-dot"></span><span class="ai-dot"></span></div>
  `;
  log.appendChild(wrap);
  log.scrollTop = log.scrollHeight;
  return wrap;
}

async function handleAIQuestion(question) {
  appendAIMessage('user', question);
  const typing = appendAITyping();

  try {
    // 1) Coba AI sungguhan lewat OpenRouter
    let response = await askOpenRouter(question);

    // 2) Jika gagal, pakai basis pengetahuan lokal
    if (!response) {
      response = await queryAIAssistant(question);
    }

    if (typing) typing.remove();
    appendAIMessage('bot', response);

    // Simpan riwayat untuk konteks jawaban berikutnya
    aiHistory.push({ role: 'user', content: question });
    aiHistory.push({ role: 'assistant', content: String(response).replace(/<[^>]+>/g, ' ').trim() });
    if (aiHistory.length > 20) aiHistory.splice(0, aiHistory.length - 20);
  } catch (error) {
    if (typing) typing.remove();
    appendAIMessage('bot', 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi pos keamanan lantai 1.');
    console.error('AI Query Error:', error);
  }
}

function openAIAssistant() {
  const panel = ensureAIChatPanel();
  panel.classList.add('active');
  panel.setAttribute('aria-hidden', 'false');

  const log = panel.querySelector('#aiChatLog');

  // Sapa sekali saat pertama dibuka
  if (log && !log.dataset.greeted) {
    appendAIMessage('bot', 'Halo! Saya <strong>I-HSSE Assistant</strong>. Tanyakan apa saja tentang keselamatan, keamanan, atau prosedur darurat di Gedung J6.');
    log.dataset.greeted = '1';
  }

  const input = panel.querySelector('#aiChatInput');
  if (input) setTimeout(() => input.focus(), 250);

  // Cek ketersediaan server AI (sekali per pembukaan)
  if (aiServerOnline === null) {
    setAIStatus('checking');
    checkAIServer();
  }
}

function closeAIChat() {
  const panel = document.getElementById('aiChatPanel');
  if (!panel) return;
  panel.classList.remove('active');
  panel.setAttribute('aria-hidden', 'true');
}

function toggleAIChat() {
  const panel = document.getElementById('aiChatPanel');
  if (panel && panel.classList.contains('active')) {
    closeAIChat();
  } else {
    openAIAssistant();
  }
}

async function queryAIAssistant(question) {
  // Basis pengetahuan sederhana (cadangan saat OpenRouter tidak tersedia)
  const knowledge = [
    {
      keys: ['apar', 'pemadam', 'tabung'],
      answer: 'APAR (Alat Pemadam Api Ringan) tersedia di setiap lantai Gedung J6, ditempatkan strategis dekat tangga darurat dan pintu keluar. Cara pakai: <strong>tarik pin</strong>, arahkan ke dasar api, lalu <strong>tekan tuas</strong>.'
    },
    {
      keys: ['hydrant', 'hidran'],
      answer: 'Hydrant kebakaran tersebar di lokasi strategis gedung. Pastikan jalur menuju hydrant tidak terhalang barang apa pun.'
    },
    {
      keys: ['kebakaran', 'api'],
      answer: 'Saat kebakaran: <strong>1)</strong> Tarik alarm terdekat, <strong>2)</strong> tinggalkan barang, <strong>3)</strong> gunakan tangga darurat, jangan lift, <strong>4)</strong> tutup pintu saat keluar, <strong>5)</strong> kumpul di titik kumpul. Hubungi <a href="tel:113">113</a> (Kebakaran).'
    },
    {
      keys: ['gempa', 'guncangan'],
      answer: 'Saat gempa: <strong>1)</strong> Lindungi kepala, masuk ke bawah meja kokoh, <strong>2)</strong> hindari kaca dan lemari tinggi, <strong>3)</strong> tunggu guncangan berhenti, <strong>4)</strong> evakuasi lewat tangga darurat ke titik kumpul.'
    },
    {
      keys: ['lift', 'terjebak'],
      answer: 'Jika terjebak di lift: tetap tenang, jangan memaksa membuka pintu, tekan tombol darurat, dan hubungi pos keamanan lantai 1. Petugas akan segera menuju lokasi.'
    },
    {
      keys: ['evakuasi', 'titik kumpul', 'kumpul'],
      answer: 'Prosedur evakuasi: dengarkan alarm, ambil barang seperlunya, jangan pakai lift, gunakan tangga darurat, lalu menuju titik kumpul di <strong>lapangan parkir depan Gedung J6</strong>. Ikuti instruksi petugas.'
    },
    {
      keys: ['nomor', 'darurat', 'telepon', 'kontak', 'hubungi'],
      answer: 'Nomor darurat: <a href="tel:119">119</a> (Ambulans), <a href="tel:113">113</a> (Kebakaran), <a href="tel:110">110</a> (Polisi). Satpam Gunadarma J6 — Aris <a href="tel:+6281286084411">+62 812-8608-4411</a>, Warsito <a href="tel:+6282124099560">+62 821-2409-9560</a>, Topik <a href="tel:+6281386699062">+62 813-8669-9062</a>.'
    },
    {
      keys: ['satpam', 'keamanan', 'pos'],
      answer: 'Pos keamanan Gedung J6 ada di <strong>lantai 1</strong> dan siaga 24 jam. Nomor satpam: Aris <a href="tel:+6281286084411">+62 812-8608-4411</a>, Warsito <a href="tel:+6282124099560">+62 821-2409-9560</a>, Topik <a href="tel:+6281386699062">+62 813-8669-9062</a>, Sahrul <a href="tel:+6285718698056">+62 857-1869-8056</a>, Atang <a href="tel:+628111094467">+62 811-1094-467</a>.'
    },
    {
      keys: ['klinik', 'p3k', 'medis', 'kesehatan', 'dokter', 'ambulans'],
      answer: 'Layanan kesehatan terdekat: <strong>Klinik dr. Aidah</strong> (<a href="tel:+6281210640450">0812-1064-0450</a>, Jl. Al Amin, Jakamulya) dan <strong>Klinik Pondok Pengobatan Jagad Buana</strong> (<a href="tel:+622519553325">(021) 9553-325</a>, Pondok Cikunir Indah, Jatibening). Ambulans: <a href="tel:119">119</a>.'
    },
    {
      keys: ['polisi', 'polsek', 'hukum'],
      answer: 'Polsek Bekasi Selatan — Jl. Pulo Ribung No.3, Pekayon Jaya, Kota Bekasi. Telepon <a href="tel:+622182402647">(021) 8240-2647</a>. Nomor umum Polisi: <a href="tel:110">110</a>.'
    },
    {
      keys: ['alamat', 'lokasi', 'dimana', 'di mana'],
      answer: 'Gedung J6 Universitas Gunadarma berada di <strong>Jl. KH. Noer Ali, Jakasampurna, Kec. Bekasi Barat, Kota Bekasi</strong>. Lihat bagian <em>Alamat &amp; Kontak</em> di beranda untuk peta layanan sekitar.'
    },
    {
      keys: ['jam', 'operasional', 'buka', 'waktu'],
      answer: 'Gedung J6 beroperasi Senin–Sabtu, 08.00–21.00 WIB. Pos keamanan lantai 1 siaga 24 jam.'
    },
    {
      keys: ['lingkungan', 'sampah', 'kebersihan'],
      answer: 'Jaga lingkungan Gedung J6 dengan memisahkan sampah organik dan anorganik, menghemat listrik dan air, serta melaporkan kebocoran atau kerusakan fasilitas ke pos keamanan.'
    },
    {
      keys: ['i-hsse', 'induksi', 'website', 'sistem'],
      answer: 'I-HSSE (Integrated Health, Safety, Security &amp; Environment) adalah sistem induksi keselamatan Gedung J6 Universitas Gunadarma. Menyediakan panduan prosedur darurat, kontak layanan, dan video edukasi.'
    }
  ];

  const q = question.toLowerCase().trim();

  // Sapaan dan ucapan umum
  if (/^(hi|hai|haii|helo|hello|halo|assalamualaikum|assalamu'alaikum|pagi|siang|malam|selamat pagi|selamat siang|selamat malam)\b/.test(q)) {
    return 'Halo! Saya <strong>I-HSSE Assistant</strong>. Ada yang bisa saya bantu soal keselamatan, keamanan, atau prosedur darurat di Gedung J6?';
  }
  if (/(terima kasih|makasih|thanks|thank you|thx)/.test(q)) {
    return 'Sama-sama! Senang bisa membantu. Kalau ada pertanyaan lain soal keselamatan Gedung J6, tanyakan saja ya.';
  }
  if (/^(p|ping|test|tes|coba)\b/.test(q)) {
    return 'Baik, saya siap. Silakan tanyakan soal keselamatan, keamanan, atau prosedur darurat di Gedung J6.';
  }

  for (const item of knowledge) {
    if (item.keys.some(key => q.includes(key))) {
      return item.answer;
    }
  }

  return 'Maaf, saya belum punya jawaban untuk pertanyaan itu. Coba tanyakan soal <strong>kebakaran, gempa, lift, evakuasi, APAR, kontak darurat, klinik, satpam, atau lokasi</strong> — atau hubungi pos keamanan lantai 1 untuk bantuan langsung.';
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// ========================================================================== 
// VIDEO PLACEHOLDERS
// ========================================================================== 

function initializeVideos() {
  document.querySelectorAll('.video-container video').forEach(video => {
    const container = video.closest('.video-container');
    const placeholder = container?.querySelector('.video-placeholder');
    if (!placeholder) return;

    let hasError = false;

    const hidePlaceholder = () => {
      if (hasError) return;
      placeholder.classList.add('is-hidden');
      video.classList.add('is-ready');
    };

    const showPlaceholder = () => {
      hasError = true;
      placeholder.classList.remove('is-hidden');
      video.classList.add('load-error');
      video.classList.remove('is-ready');
    };

    // Klik overlay -> langsung putar video
    const startPlayback = event => {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      hidePlaceholder();
      const attempt = video.play();
      if (attempt && typeof attempt.catch === 'function') {
        attempt.catch(() => {
          // Jika play gagal (mis. file:// atau autoplay diblokir),
          // tetap tampilkan kontrol agar pengguna bisa coba manual.
          hidePlaceholder();
        });
      }
    };

    placeholder.addEventListener('click', startPlayback);
    placeholder.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
        startPlayback(event);
      }
    });

    // Semua event kesiapan -> sembunyikan overlay
    ['loadedmetadata', 'loadeddata', 'canplay', 'playing'].forEach(evt => {
      video.addEventListener(evt, hidePlaceholder);
    });

    // Jika pengguna memakai kontrol bawaan, sembunyikan overlay juga
    video.addEventListener('play', hidePlaceholder);

    // Tandai gagal hanya jika SEMUA sumber gagal dimuat
    const sources = video.querySelectorAll('source');
    let failed = 0;
    const markFailed = () => {
      failed += 1;
      if (sources.length === 0 || failed >= sources.length) showPlaceholder();
    };
    sources.forEach(source => source.addEventListener('error', markFailed));
    video.addEventListener('error', markFailed);

    if (video.readyState >= 2) hidePlaceholder();
  });
}

// ========================================================================== 
// SMOOTH SCROLL
// ========================================================================== 

function initializeSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========================================================================== 
// SCROLL REVEAL ANIMATION
// ========================================================================== 

const revealObserver = ('IntersectionObserver' in window)
  ? new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' })
  : null;

function initReveal() {
  // Jika IntersectionObserver tidak didukung, konten tetap tampil normal
  if (!revealObserver) return;

  const elements = document.querySelectorAll(
    '.pillar-card, .content-item, .video-card, .about-panel, .detail-card, .cta-card'
  );

  elements.forEach(el => {
    if (el.classList.contains('reveal')) return;
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}

// ========================================================================== 
// UTILITY FUNCTIONS
// ========================================================================== 

function logToConsole(msg) {
  console.log('[I-HSSE]', msg);
}

logToConsole('System initialized successfully');
