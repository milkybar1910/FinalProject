import React, { Fragment } from "react";
import Avatar from "react-avatar";
import { Button, Dropdown, Form, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated, signout } from "../Auth/helper";
import {
  BsGear,
  BsGrid3X3Gap,
  BsReverseLayoutTextSidebarReverse,
  BsSearch,
} from "react-icons/bs";
import { AiOutlineBell, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import Batch from "../Staff/Components/Batch/Batch";
import FormControl from "../Staff/Components/Form Control/FormControl";
import "../style.css";

const currentTab = (history, path) => {
  if (history.pathname === path) {
    return {
      color: "#0d6efd",
      borderBottom: "2px solid #0d6efd",
    };
  } else {
    return { color: "#242B2E" };
  }
};

const Menu = ({ length = 0, className = "siva" }) => {
  const { student } = isAuthenticated();
  const history = useLocation();
  const navigate = useNavigate();
  const role = student.role;

  const UserDashboard = () => {
    return (
      <Fragment>
        <Link
          className="nav-link poppins-font mx-md-2 text-center"
          style={currentTab(history, "/student/Home")}
          to="/student/Home"
        >
          <AiOutlineHome size={24} className="d-lg-none" />
          <span className="d-none d-lg-block">Home</span>
        </Link>

        <Link
          className="nav-link poppins-font d-lg-none"
          style={currentTab(history, "/student/Notification")}
          to="/student/Notification"
        >
          <AiOutlineBell size={24} />
          <span className="d-none d-lg-block fs-6">
            {length !== 0 ? (
              <span className="badge badge-warning mx-1">{length}</span>
            ) : (
              <></>
            )}
          </span>
        </Link>

        <Link
          className="nav-link m-0 mx-md-2 poppins-font"
          style={currentTab(history, "/student/Profile")}
          to="/student/Profile"
        >
          <AiOutlineUser size={24} className="d-lg-none" />
          <span className="d-none d-lg-block">Profile</span>
        </Link>
      </Fragment>
    );
  };

  const AdminDashboard = () => {
    return (
      <Fragment>
        <Link
          className="nav-link poppins-font mx-md-2 text-center d-lg-none"
          style={currentTab(history, "/admin/Home")}
          to="/admin/Home"
        >
          <AiOutlineHome size={24} />
        </Link>

        <Dropdown
          drop="up"
          className="nav-link text-dark poppins-font d-lg-none adminDropdown"
        >
          <Dropdown.Toggle as="div">
            <BsGrid3X3Gap size={24} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Batch />
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown
          drop="up"
          className="nav-link text-dark poppins-font d-lg-none adminDropdown"
        >
          <Dropdown.Toggle as="div">
            <BsGear size={24} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <FormControl />
          </Dropdown.Menu>
        </Dropdown>

        <Link
          className="nav-link poppins-font mx-2 d-lg-none"
          style={currentTab(history, "/admin/Forms")}
          to="/admin/Forms"
        >
          <BsReverseLayoutTextSidebarReverse size={24} />
        </Link>
      </Fragment>
    );
  };

  return (
    <Navbar bg="white" className={"container-lg " + className} sticky="top">
      <div className="w-100 d-flex align-items-center">
        <Navbar.Brand href={role === 1 ? "/admin/Home" : "/student/Home"}>
          <Avatar
            round={true}
            size={45}
            src={require("../assets/favicon.png")}
          />
        </Navbar.Brand>
        <Form className="d-flex w-100 me-lg-3 align-self-center">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="primary">
            <BsSearch />
          </Button>
        </Form>
      </div>

      <ul className="navbar-nav ms-auto mt-lg-0 menubar bg-white py-0">
        {role === 0 ? <UserDashboard /> : <AdminDashboard />}
        <button
          className="btn btn-outline-primary p-1 px-2 m-1 poppins-font"
          onClick={() => {
            signout(() => {
              navigate("/");
            });
          }}
        >
          <FaSignOutAlt className="d-lg-none" />
          <span className="d-none d-lg-block">Signout</span>
        </button>
      </ul>
    </Navbar>
  );
};

export default Menu;
