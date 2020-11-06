import React        from "react";
import headerLens   from '../images/header-lens.png';
import * as Utils     from '../utils/utils'

export default function Download() {
  return (
    <div id="download" className="basic-4">
      <div className="container">
        <div className="row">
          {/* <div className="col-lg-6 col-xl-5"> */}
          <div className="col-lg-12">
            <div className="text-container text-center">
              <h2>
                Download <span className="blue">Glasswall Desktop</span>
              </h2>
              <p className="p-large">
              Glasswall desktop is a desktop based application that provides multi file drag and drop rebuild workflow.
              </p>
              <a
                className = "btn-solid-lg"
                href      = {Utils.downloadUrl()}>
                <i  className="fas fa-download">
                </i> Download
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
        </div>
      </div>
    </div>
  );
}
