import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../component/footer";
import AgentHeader from "../component/agentHeader";

export default function AgentLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <AgentHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
