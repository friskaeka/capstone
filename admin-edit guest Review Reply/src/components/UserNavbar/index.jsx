import React, { useEffect, useState } from "react";

import { Container, Nav, Navbar } from "react-bootstrap";
import { BsPersonCircle, BsTelephoneFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import LogoIcon from "../../assets/img/logo/LogoIcon.svg";

import LogoLong from "../../assets/img/logo/LogoLong.svg";
import useLocalstorage from "../../hooks/useLocalstorage";
import routes from "../../routes";

import style from "./style.module.css";

const Logo = () => {
  return (
    <>
      <div className={`${style.logoContainer} d-none d-lg-block`}>
        <img src={LogoLong} alt="SewaKantor" />
      </div>
      <div className={`${style.logoContainer} d-block d-lg-none`}>
        <img src={LogoIcon} alt="SewaKantor" />
      </div>
    </>
  );
};

const UserNavbar = () => {
  const { getLSValue, setLSValue, removeLSValue } = useLocalstorage();

  const [user, setUser] = useState("");
  const auth = getLSValue("auth");

  useEffect(() => {
    setUser(auth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!auth) {
      return setUser(null);
    }
    if (auth && !user) {
      return setUser(auth);
    }

    return () => {};
  }, [auth]);

  const navigation = [
    {
      name: "Home",
      link: routes.home,
    },
    {
      name: "Discover",
      link: routes.discover,
    },
    {
      name: "About us",
      link: routes.about,
    },
  ];

  return (
    <Navbar bg="skSmoke" expand="lg" color="skBlack" sticky="top">
      <Container>
        {/*
        Sewa kantor Logo
        */}
        <Link to={routes.home} className="navbar-brand">
          <Logo />
        </Link>

        {/*
        Responsive Toggle
        */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/*
        Nav Menu
        */}
        <Navbar.Collapse
          id="basic-navbar-nav"
          className={`${style.navmenuContainer} fw-bold`}
        >
          <Nav className="d-flex align-items-center">
            {/*
            NAV MENU ITEM
            */}
            {navigation.map((item, index) => (
              <Link key={index} to={item.link} className={`fs-5 nav-link`}>
                {item.name}
              </Link>
            ))}

            {/*
            NAV CONTACT
            */}
            <Link
              to={routes.contact}
              className="fs-5 nav-link d-none"
              title={`Contact`}
            >
              <BsTelephoneFill className="mr-2" size={24} />
            </Link>

            <div className={`${style.divider} mx-2`} />

            {/*
            Responsive Toggler
            */}
            <button
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDarkDropdown"
              aria-controls="navbarNavDarkDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>

            {/*
            USER MENU
            */}
            <div
              className="collapse navbar-collapse"
              id="navbarNavDarkDropdown"
            >
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDarkDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <BsPersonCircle size={24} /> {user && user.name}
                  </a>

                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDarkDropdownMenuLink"
                  >
                    {/* Is user logged in? */}
                    {user ? (
                      <>
                        <li>
                          <div
                            className={`dropdown-header`}
                            role={`heading`}
                            aria-level={2}
                          >
                            {user.name}
                          </div>
                        </li>
                        <li>
                          <hr className={`dropdown-divider`} />
                        </li>
                        <li>
                          <Link to={routes.profile} className={`dropdown-item`}>
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link to={routes.booking} className={`dropdown-item`}>
                            Active booking
                          </Link>
                        </li>
                        <li>
                          <Link to={routes.chat} className={`dropdown-item`}>
                            Chat
                          </Link>
                        </li>

                        <li>
                          <hr className={`dropdown-divider`} />
                        </li>

                        <li>
                          <Link
                            to={routes.logout}
                            className={`dropdown-item`}
                            onClick={(e) => {
                              e.preventDefault();
                              removeLSValue(`auth`);
                              setUser(null);
                            }}
                          >
                            Logout
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            to={routes.login}
                            className={`dropdown-item`}
                            onClick={(e) => {
                              e.preventDefault();
                              setLSValue(`user`, {
                                name: "mock@login.com",
                                role: "customer",
                                token: "lorem",
                              });
                              setUser(getLSValue("user"));
                            }}
                          >
                            Mock Login
                          </Link>
                        </li>

                        <li>
                          <hr className={`dropdown-divider`} />
                        </li>

                        <li>
                          <Link to={routes.login} className={`dropdown-item`}>
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={routes.register}
                            className={`dropdown-item`}
                          >
                            Register
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
              </ul>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;
