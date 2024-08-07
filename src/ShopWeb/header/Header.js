import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  Input,
  Button,
} from "reactstrap";
import "./Header.css";
import { BsCart, BsSearch } from "react-icons/bs";
import logo from "../../imgs/logo.png";

export default function Header() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <header className="custom-header container">
      <div>
        <Navbar
          className="navbar fixed-top sticky navbar-expand-md navbar-dark"
          color="faded"
        >
          <NavbarBrand href="/" className="me-auto">
            <img id="logo" src={logo} alt="Logo" />
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="me-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar className="me-auto">
              <NavItem>
                <NavLink href="/">Trang chủ</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/products">Sản phẩm</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/contact">Liên hệ</NavLink>
              </NavItem>
            </Nav>
            <div className="nav-item-right d-flex">
              <NavItem className="me-3">
                <InputGroup>
                  <Input placeholder="Tìm kiếm" />
                  <Button>
                    <BsSearch />
                  </Button>
                </InputGroup>
              </NavItem>
              <NavItem>
                <NavLink className="cart fs-3" href="/cart">
                  <BsCart />
                </NavLink>
              </NavItem>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </header>
  );
}
