export const CATEGORY_COLORS = {
  kuliner: { bg: 'bg-orange-100', text: 'text-orange-700', icon: '🍔', color: 'bg-orange-400' },
  belanja: { bg: 'bg-purple-100', text: 'text-purple-700', icon: '🛍️', color: 'bg-purple-400' },
  hiburan: { bg: 'bg-blue-100', text: 'text-blue-700', icon: '🎢', color: 'bg-blue-400' },
  alam_wisata: { bg: 'bg-green-100', text: 'text-green-700', icon: '🌲', color: 'bg-green-400' },
  seni_budaya: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: '🏛️', color: 'bg-yellow-400' },
  akomodasi: { bg: 'bg-stone-100', text: 'text-stone-700', icon: '🛏️', color: 'bg-stone-400' },
  transit: { bg: 'bg-gray-100', text: 'text-gray-700', icon: '🚌', color: 'bg-gray-400' },
};

export const itineraries = [
  {
    id: 1,
    title: "Family Weekend Seru di Bandung",
    author: "Bunda Ayu",
    authorInitial: "B",
    location: "Bandung",
    duration: "2 Hari",
    totalSpend: "2.5Jt",
    usersCount: 84,
    image: "https://images.unsplash.com/photo-1549473889-14f410d83298?q=80&w=2070&auto=format&fit=crop",
    tags: ["Keluarga", "Santai"],
    description: "Rute santai menghabiskan akhir pekan bersama anak-anak di Bandung, fokus pada kuliner dan taman bermain.",
    composition: [
      { category: 'kuliner', label: 'Kuliner', percentage: 40 },
      { category: 'hiburan', label: 'Playground', percentage: 40 },
      { category: 'belanja', label: 'Belanja', percentage: 20 },
    ],
    days: [
      {
        dayNumber: 1,
        title: "Hari 1: Bermain & Kuliner",
        activities: [
          {
            id: 101,
            time_start: "10:00",
            place: "Trans Studio Bandung",
            primary_category: "hiburan",
            tags: ["Indoor", "Kids-Friendly", "Wahana"],
            estimated_spend: 800000,
            spend_note: "Tiket Masuk Keluarga",
            description: "Menghabiskan setengah hari bermain berbagai wahana seru yang aman untuk anak-anak."
          },
          {
            id: 102,
            time_start: "14:30",
            place: "Paskal Food Market",
            primary_category: "kuliner",
            tags: ["Street-Food", "Keluarga", "Nyaman"],
            estimated_spend: 300000,
            spend_note: "Makan Siang Besar",
            description: "Banyak pilihan makanan dari berat sampai camilan. Cocok agar anak-anak bisa pilih makanan favorit mereka."
          },
          {
            id: 103,
            time_start: "16:30",
            place: "Rumah Mode Factory Outlet",
            primary_category: "belanja",
            tags: ["Fashion", "Diskon", "Oleh-oleh"],
            estimated_spend: 500000,
            spend_note: "Belanja Pakaian",
            description: "Belanja baju ganti dan oleh-oleh fesyen. Tempatnya luas dan nyaman untuk berjalan-jalan."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Eksplorasi 3 Hari Komodo & Padar",
    author: "Andi Traveler",
    authorInitial: "A",
    location: "Labuan Bajo",
    duration: "3 Hari",
    totalSpend: "4.5Jt",
    usersCount: 128,
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=2070&auto=format&fit=crop",
    tags: ["Petualangan", "Laut"],
    description: "Rute petualangan menantang melintasi kepulauan NTT. Sempurna untuk pecinta laut dan bukit sabana.",
    composition: [
      { category: 'alam_wisata', label: 'Alam & Pantai', percentage: 60 },
      { category: 'transit', label: 'Sailing', percentage: 20 },
      { category: 'kuliner', label: 'Seafood', percentage: 20 },
    ],
    days: [
      {
        dayNumber: 1,
        title: "Hari 1: Kedatangan & Sunset",
        activities: [
          {
            id: 201,
            time_start: "10:00",
            place: "Bandara Komodo",
            primary_category: "transit",
            tags: ["Arrival", "Pick-up"],
            estimated_spend: 150000,
            spend_note: "Taksi ke Pelabuhan/Hotel",
            description: "Penjemputan oleh travel guide, langsung menuju hotel untuk drop barang."
          },
          {
            id: 202,
            time_start: "12:30",
            place: "Pusat Grosir Bajo",
            primary_category: "belanja",
            tags: ["Thrifting", "Lokal"],
            estimated_spend: 300000,
            spend_note: "Beli perlengkapan renang",
            description: "Mampir ke pasar lokal untuk mencari barang unik dan oleh-oleh khas dengan harga terjangkau."
          },
          {
            id: 203,
            time_start: "16:00",
            place: "Bukit Amelia Sea",
            primary_category: "alam_wisata",
            tags: ["Trekking", "Sunset", "Gratis"],
            estimated_spend: 0,
            spend_note: "Gratis",
            description: "Mendaki ringan sekitar 15 menit untuk melihat salah satu sunset terbaik di Bajo."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Sehari Penuh Thrifting di Pasar Senen",
    author: "Rina Style",
    authorInitial: "R",
    location: "Jakarta",
    duration: "1 Hari",
    totalSpend: "500rb",
    usersCount: 305,
    image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=2070&auto=format&fit=crop",
    tags: ["Fashion", "Murah"],
    description: "Panduan lengkap mencari hidden gem pakaian bekas berkualitas tinggi di jantung kota Jakarta.",
    composition: [
      { category: 'belanja', label: 'Thrifting', percentage: 80 },
      { category: 'kuliner', label: 'Street Food', percentage: 20 },
    ],
    days: []
  }
];
