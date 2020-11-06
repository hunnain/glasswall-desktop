import React              from "react";
import betterKubernetes   from '../images/better-kubernetes.svg';

export default function Feature1() {
  return (
    <div id="features" className="basic-3">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <img
              className ="img-fluid"
              src       ={betterKubernetes}
              alt       ="alternative"
            />
          </div>
          <div className="col-lg-5">
            <div className="text-container">
              <h3>The File Drop</h3>
              <p>
               Just drag and drop the files from your local hard disk, and the Glasswall Desktop will rebuild them using the Glasswall Rebuild API (currently hosted on Azure).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
