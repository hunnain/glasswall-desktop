import React              from 'react';
import Nav                from './components/Nav';
import Loader             from './components/Loader';
import Header             from './components/Header';
import Feature1           from './components/Feature1';
import Feature2           from './components/Feature2';
import Feature3           from './components/Feature3';
import Feature4           from './components/Feature4';
import Feature5           from './components/Feature5';
import Demo               from './components/Demo';
import Download           from './components/Download';
import Footer             from './components/Footer';
import Copyright          from './components/Copyright';
import './css/styles.css'
import * as utils         from './utils/utils'
import ReactGA            from 'react-ga'


function App() {
  ReactGA.initialize(utils.GA_TRACKINGID);
  return (
    <div className="App">
      <Loader/>
      <Nav/>
      <Header/>
      <Feature1/>
      <Feature2/>
      <Feature3/>
      <Feature4/>
      <Feature5/>
      <Demo/>
      <Download/>
      <Footer/>
      <Copyright/>
    </div>
  );
}

export default App;
