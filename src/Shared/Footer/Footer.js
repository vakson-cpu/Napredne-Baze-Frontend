import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faSnapchat,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="row justify-content-center">
          <div className=" col-sm-4 col-md-3 item">
            <h3 className="text-success ">Data</h3>
            <ul className="Link">
              <li>
                <Link to="#">Natural Parks</Link>
              </li>
              <li>
                <Link to="#">Documents</Link>
              </li>
              <li>
                <Link to="#">Other</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-4 col-md-3 item">
            <h3 className="text-success">Careers</h3>
            <ul className="Link">
              <li>
                <Link className="Link" to="#">
                  Apply for working
                </Link>
              </li>
              <li>
                <Link className="Link" to="#">
                  Daily life as a worker
                </Link>
              </li>
              <li>
                <Link to="#">Benefits</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-4 col-md-3 item">
            <h3 className="text-success">Security</h3>
            <ul className="Link">
              <li>
                <Link to="#">Info</Link>
              </li>
              <li>
                <Link to="#">Q&A</Link>
              </li>
              <li>
                <Link to="#">Help</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 item social text-dark">
            <Link to="#">
              <FontAwesomeIcon icon={faSnapchat} />{" "}
            </Link>
            <Link to="#">
              <FontAwesomeIcon icon={faLinkedin} />{" "}
            </Link>

            <Link to="#">
              <FontAwesomeIcon icon={faInstagram} />{" "}
            </Link>

            <Link to="#">
              <FontAwesomeIcon icon={faFacebookF} />{" "}
            </Link>
            <p className="copyright">Company Name © 2018</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
