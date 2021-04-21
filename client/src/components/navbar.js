import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap'
import './navbar.css';
import logo from '../logodark.svg';
import male from '../assets/male-user.png';
import female from '../assets/female-user.png';

const Navigationbar = withRouter(props => <NavBar {...props} />);

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      slideSet: false,
      lastScrollY: 0,
    };
  }
  componentDidMount() {
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
          <Link to={this.props.auth ? "/profile" : "/login"} className="navlinks ml-auto userlink" style={{ color: '#F42929' }}>
            <img src={this.props.auth ? (this.props.user.gender === "male" ? male : female) : "https://www.vhv.rs/dpng/d/408-4087421_person-svg-circle-icon-picture-charing-cross-tube.png"} alt="user" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid ' + ((this.props.location.pathname === '/profile') ? '#F42929' : '#FFA9A9') }} />
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mr-auto">
            <Link to="/request" className={'navlinks dtnav' + ((this.props.location.pathname === '/request') ? ' activelink' : '')}>
              Request Blood/Plasma
            </Link>
            <Link to="/blood" className={'navlinks' + ((this.props.location.pathname === '/blood') ? ' activelink' : '')}>
              Blood Donors
            </Link>
            <Link to="/plasma" className={'navlinks' + ((this.props.location.pathname === '/plasma') ? ' activelink' : '')}>
              Plasma Donors
            </Link>
            <Link to="/feed" className={'navlinks' + ((this.props.location.pathname === '/feed') ? ' activelink' : '')}>
              Live Feed
            </Link>
            <Link to="/volunteer" className={'navlinks' + ((this.props.location.pathname === '/volunteer') ? ' activelink' : '')}>
              Volunteer
            </Link>
            <a href="https://blog.blood4needy.com/" className={'navlinks mnav' + ((this.props.location.pathname === '/blogs') ? ' activelink' : '')}>
              Blog
            </a>
            <Link to="/about" className={'navlinks mnav' + ((this.props.location.pathname === '/about') ? ' activelink' : '')}>
              About Us
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    user: state.user,
    requested: state.requested
  }
}

export default connect(mapStateToProps)(Navigationbar)