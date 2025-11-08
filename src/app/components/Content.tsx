import Image from "next/image";

export default function Content() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-6 lg:px-0 mt-32">

      {/* ========== HERO SECTION ========== */}
      <div className="max-w-7xl w-full flex flex-col items-center text-center">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Lihat Waktumu, <br /> Rasakan Perubahan
        </h1>

        {/* Description */}
        <p className="mt-4 text-gray-600 max-w-2xl">
          Kinote membantumu mengatur tugas, melacak aktivitas, dan memahami
          progres diri dalam satu ruang yang jernih.
        </p>

        {/* Button */}
        <button className="mt-8 bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
          Lihat Fitur
        </button>

        {/* Laptop Image */}
        <div className="mt-12 relative w-full flex justify-center">
          <div className="w-[90%] lg:w-[80%] rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/img/laptop.jpg"
              alt="Kinote hero image"
              width={1200}
              height={700}
              className="object-cover w-full h-auto"
            />
          </div>

          {/* Mini cards */}
          <div className="absolute -bottom-10 w-[80%] bg-white shadow-lg rounded-lg flex flex-col md:flex-row justify-between px-8 py-6 gap-6">
            {[
              {
                title: "Fokus",
                desc: "Jaga konsentrasi, tanpa gangguan.",
              },
              {
                title: "Produktif",
                desc: "Selesaikan lebih banyak dengan mudah.",
              },
              {
                title: "Pengingat",
                desc: "Selalu ingat hal penting tepat waktu.",
              },
            ].map((card) => (
              <div key={card.title} className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900">{card.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer biar section 2 tidak nabrak */}
      <div className="h-32" />

      {/* ========== FITUR UTAMA SECTION ========== */}
      <div className="max-w-7xl w-full text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Fitur Utama Kinote
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-12">
          Kelola tugas, pantau aktivitas, dan tingkatkan produktivitasmu dengan fitur-fitur terbaik dari Kinote.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              img: "/img/todolist.jpg",
              title: "To-Do List",
              desc: "Atur dan kelola setiap tugas dengan mudah. Tandai prioritas, pasang pengingat, dan capai target harianmu.",
            },
            {
              img: "/img/ai.jpg",
              title: "AI",
              desc: "Kenali potensimu lebih dalam. AI Kinote membantumu memahami pola aktivitas dan memberikan rekomendasi peningkatan.",
            },
            {
              img: "/img/dashboard.jpg",
              title: "Dashboard",
              desc: "Satu pandangan untuk melihat seberapa jauh kemajuanmu. Semua progress tersaji dengan rapi dan sederhana.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
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
