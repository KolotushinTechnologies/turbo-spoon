// Import Engine
import React from "react";
import { Link } from "react-router-dom";

// Import Styles
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="bluline"></div>

      <div className="contrfooter">
        <div className="mir">
          <div className="fix_bag">
            <li className="logo">
              {" "}
              <Link to="/">{/* <LogoImage /> */}</Link>
              {/* <a href="index6.html"> */} {/* <img src="img/лого.png" /> */}
              {/* </a>{' '} */}
            </li>

            <li className="">
              {" "}
              <Link to="/">Текст не придуман</Link>
              {/* <a href="" className="textf"> */}
              {/* </a>{' '} */}
            </li>

            <li className="med">
              {" "}
              <Link to="/">{/* <MedImage /> */}</Link>
              {/* <a href="index6.html"> */} {/* <img src="img/med.png" /> */}
              {/* </a>{' '} */}
            </li>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
