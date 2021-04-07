import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faHeart, faMapMarkerAlt, faShareAlt, faTimes, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faLinkedinIn, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"

import Navigationbar from "./components/navbar"
import Contactbar from "./components/conbar"
import Profile from "./components/profile"
import Home from "./components/home"
import Login from "./components/login"
import Volunteer from "./components/volunteer";
import Request from "./components/request";
import Feed from "./components/feed";
import AboutUs from "./components/aboutus";
import Donors from "./components/donors";
import Footer from "./components/footer";
import ScrollToTop from "./components/scrollToTop";

library.add(faMinus, faPlus, faHeart, faShareAlt, faFacebookF, faLinkedinIn, faTwitter, faInstagram, faMapMarkerAlt, faTimes, faTimesCircle, faCheckCircle)

/*TODO: Add user authentication*/

class App extends Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this)

    this.state = {
      auth: false,
      userdetails: '',
      slide: 0,  // How much should the Navbar slide up or down
      lastScrollY: 0,  // Keep track of current position in state
    };
  }

  componentDidMount() {
    // When this component mounts, begin listening for scroll changes
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    // If this component is unmounted, stop listening
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { lastScrollY } = this.state;
    const currentScrollY = window.scrollY;


    if (currentScrollY > lastScrollY) {
      this.setState({ slide: '948px' });
    } else {
      this.setState({ slide: '0px' });
    }
    this.setState({ lastScrollY: currentScrollY });
  };

  loginUser(obj) {
    this.setState({
      auth: true,
      userdetails: obj
    })
  }



  render() {
    return (
      <Router>
        <div className="container">
          <Navigationbar
            style={{
              transform: `translate(0, ${this.state.slide})`,
              transition: 'transform 90ms linear',
            }} />
          <Contactbar />
          <ScrollToTop>
            <Route path="/" exact component={Home} />
          </ScrollToTop>
          <ScrollToTop>
            <Route path="/login" exact component={Login} />
          </ScrollToTop>
          <ScrollToTop>
            <Route path="/profile" exact component={Profile} />
          </ScrollToTop>
          <ScrollToTop>
            <Route path="/request" component={Request} />
          </ScrollToTop>
          <ScrollToTop>
            <Route path="/donors" component={Donors} />
          </ScrollToTop>
          <ScrollToTop>
            <Route path="/about" component={AboutUs} />
          </ScrollToTop>
          <ScrollToTop>
            <Route path="/feed" component={Feed} />
          </ScrollToTop>
          <ScrollToTop>
            <Route path="/volunteer" component={Volunteer} />
          </ScrollToTop>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;