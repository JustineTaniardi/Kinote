import Image from "next/image";

export default function Content() {
  return (
    <section className="w-full flex flex-col items-center justify-center px-10 md:px-16 lg:px-20 mt-12">
      {/* Hero */}
      <div
        id="home"
        className="max-w-7xl w-full flex flex-col items-start text-left"
      >
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Lihat Waktumu, <br /> Rasakan Perubahan
        </h1>

        {/* HeroImg */}
        <div className="relative w-full mt-8 overflow-visible">
          <div className="rounded-xl overflow-hidden shadow-md">
            <Image
              src="/img/landing-page/hero.jpg"
              alt="Kinote Hero"
              width={1200}
              height={600}
              className="object-cover w-full h-[350px] md:h-[350px]"
              priority
            />

            {/* TextBtn */}
            <div className="absolute top-10 left-10 max-w-sm text-left">
              <p className="text-white text-sm md:text-base leading-relaxed mb-4">
                Kinote membantu kamu mengatur tugas, melacak aktivitas, dan
                memahami progres diri semua dalam satu ruang yang jernih.
              </p>
              <button className="border border-white text-white font-medium px-5 py-2.5 rounded-md hover:bg-white hover:text-gray-900 transition">
                Lihat Fitur
              </button>
            </div>
          </div>

          {/* Strip */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-10 w-[85%] bg-white rounded-lg shadow-[0_4px_32px_rgba(0,0,0,0.12)] flex flex-col md:flex-row justify-between items-start md:items-center px-8 py-5 gap-6">
            {[
              { title: "Fokus", desc: "Jaga konsentrasi, tanpa gangguan." },
              {
                title: "Produktif",
                desc: "Selesaikan lebih banyak dengan mudah.",
              },
              {
                title: "Pengingat",
                desc: "Selalu ingat hal penting tepat waktu.",
              },
            ].map((item) => (
              <div key={item.title} className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-32 md:h-40" />

      {/* Feature */}
      <div id="feature" className="max-w-7xl w-full text-center mt-24 mb-48">
        {/* Head */}
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Fitur Utama Kinote
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-12">
          Kelola tugas, pantau aktivitas, dan tingkatkan produktivitasmu dengan
          fitur-fitur terbaik dari Kinote.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center">
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
              className="relative w-[340px] md:w-[360px] lg:w-[380px] group"
            >
              {/* Img */}
              <div className="rounded-xl overflow-hidden shadow-md">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={400}
                  height={250}
                  className="object-cover w-full h-56 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Box */}
              <div
                className="
    absolute left-1/2 -translate-x-1/2 z-10
    bg-white rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.1)]
    w-[85%] px-6 overflow-hidden
    flex flex-col items-start justify-start
    transition-[height] duration-500 ease-in-out
    h-[80px] group-hover:h-[150px]"
                style={{ top: "calc(100% - 40px)" }}
              >
                <h3 className="font-semibold text-gray-900 text-lg mt-4">
                  {item.title}
                </h3>

                <p
                  className="
      text-gray-600 text-sm mt-1 mb-2 text-left opacity-0 translate-y-3
      transition-all duration-500 ease-in-out delay-100
      group-hover:opacity-100 group-hover:translate-y-0
    "
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
