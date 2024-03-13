import Logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="logo" />
      <span>
        @Copyright 2024 <b>React Js</b>
      </span>
    </footer>
  );
};

export default Footer;
