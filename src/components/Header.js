import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Nav, Navbar, NavItem, Button } from "react-bootstrap";
import bayty_icon from "../assets/img/bayty_icon.png";

class Header extends Component {
  render() {
    return (
      <Navbar style={{ direction: "rtl" }} inverse collapseOnSelect fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <img src={bayty_icon} />
          </Navbar.Brand>

          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/">
              <NavItem eventKey={2}>الصفحة الرئيسية</NavItem>
            </LinkContainer>
          </Nav>
          {!this.props.authenticated ? (
            <Nav pullRight>
              <LinkContainer to="/login">
                <NavItem>تسجيل دخول</NavItem>
              </LinkContainer>
              <LinkContainer to="/register">
                <NavItem>تسجيل مستخدم جديد</NavItem>
              </LinkContainer>
            </Nav>
          ) : (
            <div>
              <Nav>
                <NavItem eventKey={2} href="#">
                  استعراض منتجاتي
                </NavItem>

                <LinkContainer to="/newproduct">
                  <NavItem eventKey={1}>اضافة منتج جديد</NavItem>
                </LinkContainer>
              </Nav>

              <Nav pullRight>
                <LinkContainer to="/logout">
                  <NavItem eventKey={1}>تسجيل خروج</NavItem>
                </LinkContainer>
              </Nav>
            </div>
          )}

          {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.4}>Separated link</MenuItem>
        </NavDropdown> */}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
