import React from "react";
import {
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import "../../assets/css/footer.scss";

const FooterComponent = () => {
  return (
    <div>
      <hr/>
      <div class="footer-basic">
        <footer>
          <div class="social">
            <a className="my-auto" target="_blank" href="https://www.instagram.com/imrathiii/">
              <AiOutlineInstagram />
            </a>
            <a className="my-auto" target="_blank" href="https://www.linkedin.com/in/sitaram-rathi-519152197/">
              <AiOutlineLinkedin />
            </a>
            <a className="my-auto" target="_blank" href="https://github.com/srrathi">
              <AiOutlineGithub />
            </a>
            <a className="my-auto" target="_blank" href="https://twitter.com/SitaramRathi5">
              <AiOutlineTwitter />
            </a>
          </div>
          <ul class="list-inline">
            <li class="list-inline-item">
              <a href="#">Home</a>
            </li>
            <li class="list-inline-item">
              <a href="#">Services</a>
            </li>
            <li class="list-inline-item">
              <a href="#">About</a>
            </li>
            <li class="list-inline-item">
              <a href="#">Terms</a>
            </li>
            <li class="list-inline-item">
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
          <p class="copyright">Apni Dukaan © 2021-22</p>
        </footer>
      </div>
    </div>
  );
};

export default FooterComponent;
