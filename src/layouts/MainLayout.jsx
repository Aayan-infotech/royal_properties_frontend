import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../component/header";
import Footer from "../component/footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
