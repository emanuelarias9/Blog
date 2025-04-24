import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Inicio } from "../components/pages/Inicio";
import { Articulos } from "../components/pages/Articulos";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { Crear } from "../components/pages/Crear";
import { Busqueda } from "../components/pages/Busqueda";

export const Rutas = () => {
  return (
    <BrowserRouter>
      <Header />
      <Nav />
      <section id="content" className="content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/crear-articulos" element={<Crear />} />
          <Route path="/buscador/:busqueda" element={<Busqueda />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </section>
      <Sidebar />
      <Footer />
    </BrowserRouter>
  );
};
