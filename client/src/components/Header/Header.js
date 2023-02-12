import logo from "../../assets/atom.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar ng-light mb-4 p-0">
      <div className="container">
        <a className="navbar-brand">
          <div className="d-flex">
            <img src={logo} alt="logo" className="mr-2" />
            <div>GraphQl</div>
          </div>
        </a>
      </div>
    </nav>
  );
}

export default Header;
