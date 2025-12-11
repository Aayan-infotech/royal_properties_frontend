import { motion } from "framer-motion";
import { FaUserAlt, FaUserTie, FaUserSecret } from "react-icons/fa";
import { Link } from "react-router-dom";

const roles = [
  {
    id: 1,
    title: "User",
    icon: <FaUserAlt className="text-blue-600 text-6xl" />,
    bg: "bg-white",
  },
  {
    id: 2,
    title: "Seller",
    icon: <FaUserTie className="text-orange-500 text-6xl" />,
    bg: "bg-white",
  },
  {
    id: 3,
    title: "Agent",
    icon: <FaUserSecret className="text-black text-6xl" />,
    bg: "bg-white",
  },
];

export default function RoleSelection() {
  return (
    <div className="w-full py-16 px-4 bg-[#e9f0ff] min-h-screen flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-2">
        Welcome to Royal Property
      </h2>
      <p className="text-gray-600 text-center mb-10">
        Choose your role to Sign In / Sign Up
      </p>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
        {roles.map((role, index) => (
          <Link to={`/login/${role.title.toLowerCase()}`} key={role.id}>
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              }}
              whileTap={{ scale: 0.95 }}
              className={`p-15 px-6 rounded-2xl shadow-lg cursor-pointer flex flex-col items-center justify-center gap-10 ${role.bg}`}
            >
              {role.icon}

              <span className="px-4 py-1 bg-gray-100 rounded-full text-sm font-medium w-full text-center">
                {role.title}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
