import React          from "react";
import headerLens     from '../images/header-lens.png';
import * as Utils     from '../utils/utils'

export default function Loader() {
  return (
    <header id="header" className="header">
      <div className="header-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-container header-img">
                <h1>
                   Glasswall Desktop Application <br />
                  For <span id="js-static">Rebuild Files</span>
                  {/* {" "}
                  <span id="js-rotating">
                    GIT BROWSER, FILE DROP, K8 PODS DASHBOARD, SLACK UI FOR BOTS, FORENSIC WORKBENCH
                  </span> */}
                </h1>
                <p className="p-large">
                Glasswall desktop application provides multi file drag and drop rebuild workflow. Its open source. Download it today!
                </p>
                <a
                    className = "btn-solid-lg"
                    href      = {Utils.downloadUrl()}>
                  <i  className="fas fa-download"></i> 
                  Download
                </a>

                <a  href = {Utils.MAC_BUILD} onClick = {()=>{ Utils.handleDownloadClick('Mac');}}>
                      <i className  ="supported-os-icon fab fa-apple"></i>
                </a>

                <a  href = {Utils.WINDOWS_BUILD} onClick = {()=>{ Utils.handleDownloadClick('Windows');}}>
                      <i className ="supported-os-icon fab fa-windows"> </i>
                </a>
                <a  href = {Utils.LINUX_BUILD} onClick = {()=>{ Utils.handleDownloadClick('Linux');}}>
                      <i className ="supported-os-icon fab fa-linux"></i>
                </a>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="image-container header-img">
                <img
                  className ="img-fluid"
                  src       ={headerLens}
                  alt       ="alternative"
                />
              </div>
            </div>
          </div>
          <div className="row">
            {/* <div className="col-lg-12">
              <div className="image-container">
                <img
                  className ="img-fluid"
                  src       ={headerLens}
                  alt       ="alternative"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
}
