import { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import { DisplayModal } from "../modal/DisplayModal";

function LogoutButton() {
  const [showModal, setShowModal] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const router = useRouter();

  function hideModal() {
    setShowModal(false);
  }

  function logout() {
    setAuth(null);
    setShowModal(false);
    return router.push("/");
  }

  return (
    <>
      <Button
        variant="info"
        onClick={() => setShowModal(true)}
        className="navbar__logout--button"
      >
        Logout
      </Button>
      <DisplayModal
        showModal={showModal}
        cancel={hideModal}
        title="Log out"
        content="You sure you're ready to log out?"
        confirmed={logout}
      />
    </>
  );
}

export default LogoutButton;
