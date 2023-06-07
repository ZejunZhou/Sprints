import "bootstrap/dist/css/bootstrap.min.css";
import "./Homepage.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

/**
 *
 * @param user: variable defined in homepage trace the user status based on login
 * @param onLogout: callback function defined in homepage to logout
 * @param profile: variable trace defined in homepage trace profile info
 * @param isLoggedIn variable check the login status
 * @returns navbar display based on whether use is login in or not
 */
function NavBar({ user, onLogout, profile, isLoggedIn }) {
  return (
    <header>
      <nav className="navbar navbar-inverse fixed-left">
        <ul className="menu-wrap">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/app-page" className="nav-link">
                  Taskboard
                </Link>
              </li>
              <li>
                <Link to="/spchoice" className="nav-link">
                  Story Poker
                </Link>
              </li>
              <li>
                <Link to="/dummy-page" className="nav-link">
                  Chatroom
                </Link>
              </li>
              <li>
                <Link to="/education-page" className="nav-link">
                  AgileEdu
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
          )}
        </ul>
        <div className="cta">
          {isLoggedIn ? ( // if we have logined, display user image and logout button
            <>
              <img
                src={Cookies.get("profile_img")}
                alt="user"
                style={{ height: 75, borderRadius: 50 }}
              />
              <Link to="/">
                <button className="buttonStyle" onClick={onLogout}>
                  Logout
                </button>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
