import React        from "react";
import headerLens   from '../images/header-lens.png';

export default function Demo() {
  return (
    <div id="demo" className="basic-1">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h2>How it Works</h2>
            <div className="p-heading p-large">
              The live demo of Glasswall Desktop features.
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="image-container">
              <div className="video-wrapper">
                <a
                  className   ="popup-youtube"
                  href        ="https://www.youtube.com/watch?v=Ww_Z6ErLGyg&feature=youtu.be"
                  data-effect ="fadeIn"
                >
                  <img
                    className ="img-fluid"
                    src       ={headerLens}
                    alt       ="alternative"
                  />
                  <span className="video-play-button">
                    <span></span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
