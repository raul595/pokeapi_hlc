"use client";
import localFont from "next/font/local";
import "./globals.css";
import { useState } from "react";
import { getDictionary } from "../componentes/diccionario";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  const [lang, setLang] = useState("es"); // Idioma predeterminado
  const dictionary = getDictionary(lang);
// funcion para cambiar idioma
  const handleLanguageChange = (language) => {
    setLang(language);
  };

  return (
    <html lang={lang} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="navbar">
          <h1>{dictionary.title}</h1>
          <a href="/">{dictionary.inicio}</a>
          <div className="dropdown">
            <button className="dropbtn">
              {dictionary.generaciones} <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <a href="/Cards/pokemongen1">GEN 1</a>
              <a href="/Cards/pokemongen2">GEN 2</a>
            </div>
          </div>
          <div className="language-selector">
            <img
              src="/es.png"
              alt="Español"
              onClick={() => handleLanguageChange("es")}
              className="flag-icon"
            />
            <img
              src="/uk.png"
              alt="English"
              onClick={() => handleLanguageChange("en")}
              className="flag-icon"
            />
            <img
              src="/fr.png"
              alt="Français"
              onClick={() => handleLanguageChange("fr")}
              className="flag-icon"
            />
          </div>
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
