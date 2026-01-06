import React from "react";

export default function AgentHome() {
  return (
    <div>
      <div className="min-h-screen bg-black text-white">
        {/* Background pattern */}

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logo/Brand */}
           

            {/* Main Content */}
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
                <span className="text-sm font-medium">Launching Soon</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                Something{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                  Amazing
                </span>{" "}
                Is Coming
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                We're crafting an extraordinary experience that will
                revolutionize how you connect, create, and collaborate. Stay
                tuned for the grand reveal!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
