import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'
import './navbar.css';
import logo from '../logodark.svg';

export default class Navigationbar extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      slideSet: false,
      lastScrollY: 0,
    };
  }
  componentWillMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { lastScrollY } = this.state;
    const currentScrollY = window.scrollY;


    if (currentScrollY > lastScrollY) {
      this.setState({ slideSet: true });
    } else {
      this.setState({ slideSet: false });
    }
    this.setState({ lastScrollY: currentScrollY });
  };

  render() {
    return (
      <Navbar expand="lg" expanded="true" className={this.state.slideSet ? 'navscr' : ''}>
        <Navbar.Brand>
          <Link to="/">
            <img src={logo} className="navlogo" alt="Blood4Needy" width='120' />
          </Link>
          <Link to="/login" className="navlinks ml-auto userlink" style={{ color: '#F42929' }}>
            <img src="https://www.vhv.rs/dpng/d/408-4087421_person-svg-circle-icon-picture-charing-cross-tube.png" alt="user" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mr-auto">
            <Nav.Link>
              <Link to="/request" className="navlinks dtnav">Request Blood</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/donors" className="navlinks">Blood Donors</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/volunteer" className="navlinks">Volunteer</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/feed" className="navlinks">Live Feed</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/blogs" className="navlinks mnav">Blog</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/about-us" className="navlinks mnav">About Us</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}