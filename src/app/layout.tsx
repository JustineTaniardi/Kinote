import "./globals.css";
import Header from "./components/Header";

export const metadata = {
  title: "Kinote - Lihat Waktumu, Rasakan Perubahan",
  description: "Kelola waktu dan produktivitasmu dengan mudah bersama Kinote.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-white text-black">
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
