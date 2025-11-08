import Content from "./components/Content";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center bg-white text-black">
      {/* Bagian utama dengan id */}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center bg white text-black ">
        <h1 className="text-5xl font-extrabold mb-4">
          Lihat Waktumu, Rasakan Perubahan
        </h1>
        <p className="max-w-xl text-gray-600">
          Kinote membantumu mengatur tugas, melacak aktivitas, dan memahami progres diri dalam satu ruang yang jernih.
        </p>
        <button className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition">
          Lihat Fitur
        </button>
      </section>

      {/* Section Feature */}
      <section id="feature" className="min-h-screen flex flex-col items-center justify-center bg-gray-50 w-full">
        <Content />
      </section>

      {/* Section About */}
      <section id="about" className="min-h-screen flex flex-col items-center justify-center w-full">
        <h2 className="text-4xl font-bold mb-4">Tentang Kinote</h2>
        <p className="max-w-lg text-center text-gray-600">
          Kinote membantu kamu memahami progres waktu, meningkatkan fokus, dan mencapai produktivitas yang seimbang.
        </p>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
