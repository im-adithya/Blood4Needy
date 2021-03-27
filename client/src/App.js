import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faHeart, faMapMarkerAlt, faShareAlt, faTimes, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faLinkedinIn, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"

import Navigationbar from "./components/navbar"
import Contactbar from "./components/conbar"
import Home from "./components/home"
import Login from "./components/login"
import Volunteer from "./components/volunteer";
import Request from "./components/request";
import Feed from "./components/feed";
import Donate from "./components/donate";
import Donors from "./components/donors";
import Footer from "./components/footer"

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
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/request" component={Request} />
          <Route path="/donors" component={Donors} />
          <Route path="/donate" component={Donate} />
          <Route path="/feed" component={Feed} />
          <Route path="/volunteer" component={Volunteer} />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;