import Navbar from "react-bootstrap/Navbar";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import Container from "react-bootstrap/Container";
import LogoutButton from "../../admin/buttons/LogoutButton";
import NavIconLoader from "./navbar/navIcon/NavIconLoader";
import AdminNav from "./navbar/AdminNav";
import BasicNav from "./navbar/BasicNav";

export default function Layout({ children }) {
  const [authorised, setAuthorised] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  useEffect(() => {
    auth ? setAuthorised(true) : false;
  }, []);

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        sticky="top"
        className="navbar"
      >
        {auth ? (
          <>
            <NavIconLoader />
            <Container>
              <Navbar.Toggle />
              <Navbar.Collapse className="navbar__collapse">
                <AdminNav />
                <LogoutButton />
              </Navbar.Collapse>
            </Container>
          </>
        ) : (
          <>
            <NavIconLoader />

            <Container>
              <Navbar.Toggle />
              <Navbar.Collapse className="navbar__collapse">
                <BasicNav />
              </Navbar.Collapse>
            </Container>
          </>
        )}
      </Navbar>

      {children}
    </>
  );
}
