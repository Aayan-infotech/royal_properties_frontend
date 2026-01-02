import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../component/footer";
import SellerHeader from "../component/sellerHeader";

export default function SellerLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <SellerHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
