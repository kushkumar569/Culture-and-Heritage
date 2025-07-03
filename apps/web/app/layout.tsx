import "./globals.css";
import BubbleParticles from "@repo/ui/BubbleParticle";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="bg-gray-800">
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
