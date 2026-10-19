import type { Metadata } from "next";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import "./globals.scss";

export const metadata: Metadata = {
  title: "BookTree",
  description: "Consulta e organização do acervo da biblioteca.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
