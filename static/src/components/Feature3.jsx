import React            from "react";
import workspaces       from '../images/workspaces.svg';

export default function Feature3() {
  return (
    <div className="basic-3">
      <div className="fourth">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img
                className = "img-fluid"
                src       = {workspaces}
                alt       = "alternative"
              />
            </div>
            <div className="col-lg-6">
              <div className="text-container margin-top-80">
                <h3>Rebuild Engine</h3>
                <p>
                Access the Glasswall Rebuild engine which creates safe files into a known good state (no malicious content).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
