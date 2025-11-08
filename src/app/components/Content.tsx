import Image from "next/image";

export default function Content() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-6 lg:px-0 mt-32">
      {/* ====== HERO SECTION ====== */}
      <div className="max-w-7xl w-full flex flex-col items-start text-left">
        {/* Judul di atas hero */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Lihat Waktumu, <br /> Rasakan Valorants
        </h1>

        {/* Hero Image */}
        <div className="relative w-full mt-8 rounded-xl overflow-hidden shadow-md">
          <Image
            src="/img/landing-page/hero.jpg"
            alt="Kinote Hero"
            width={1200}
            height={600}
            className="object-cover w-full h-[420px] md:h-[500px]"
            priority
          />

          {/* Teks di kiri atas dalam gambar */}
          <div className="absolute top-10 left-10 max-w-sm text-left">
            <p className="text-white text-sm md:text-base leading-relaxed mb-4">
              Kinote Menyenangkan
            </p>
            <button className="bg-white text-gray-900 font-medium px-5 py-2.5 rounded-md shadow hover:bg-gray-100 transition">
              Lihat Fitur
            </button>
          </div>

          {/* Kotak di tengah bawah hero */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-[85%] bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex flex-col md:flex-row justify-between items-start md:items-center px-8 py-6 gap-6">
            {[
              { title: "Fokus", desc: "Jaga konsentrasi, tanpa gangguan." },
              { title: "Produktif", desc: "Selesaikan lebih banyak dengan mudah." },
              { title: "Pengingat", desc: "Selalu ingat hal penting tepat waktu." },
            ].map((item) => (
              <div key={item.title} className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer supaya bagian bawah nggak ketimpa */}
      <div className="h-24" />

      {/* ====== FITUR UTAMA SECTION ====== */}
      <div className="max-w-7xl w-full text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Fitur Utama Kinote
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-12">
          Kelola tugas, pantau aktivitas, dan tingkatkan produktivitasmu
          dengan fitur-fitur terbaik dari Kinote.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              img: "/img/landing-page/feature_1.jpg",
              title: "To-Do List",
              desc: "Atur dan kelola setiap tugas dengan mudah. Tandai prioritas, pasang pengingat, dan capai target harianmu.",
            },
            {
              img: "/img/landing-page/feature_2.jpg",
              title: "AI",
              desc: "Kenali potensimu lebih dalam. AI Kinote membantumu memahami pola aktivitas dan memberikan rekomendasi peningkatan.",
            },
            {
              img: "/img/landing-page/feature_3.png",
              title: "Dashboard",
              desc: "Satu pandangan untuk melihat seberapa jauh kemajuanmu. Semua progress tersaji dengan rapi dan sederhana.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-xl overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition"
            >
              <Image
                src={item.img}
                alt={item.title}
                width={400}
                height={250}
                className="object-cover w-full h-56"
              />
              <div className="p-5 text-left">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-2 mb-4">{item.desc}</p>
                <a
                  href="#"
                  className="text-gray-900 text-sm font-medium hover:underline"
                >
                  Lihat lebih lanjut →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
