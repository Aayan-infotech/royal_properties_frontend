import { Link } from "react-router-dom";
import Header from "../component/header";
import Footer from "../component/footer";
import { encrypt, decrypt } from "../utils/constant";
function NotFound() {
  const decryptedUserType = decrypt(localStorage.getItem("userRole") || "");

  return (
    <>

      <div className="error mb-10 min-h-screen">
        <h1 className="code">404</h1>
        <h2 className="desc">Ops... There's something wrong.</h2>
        {decryptedUserType ? <Link to={`/${decryptedUserType}/home`} style={{ color: "#007bff", textDecoration: "none" }}>
          Go back to home
        </Link> : <Link to="/" style={{ color: "#007bff", textDecoration: "none" }}>
          Go back to home
        </Link>}

      </div>


    </>
  );
}

export default NotFound;
