import { Link, Outlet } from "react-router-dom";

// For images

import logoHeader from "../assets/Weather-Logo.jpg";
import Switcher from "../components/switcher/Switcher";

const Layout = () => {
  return (
    <>
        <header className="header max-w-[1440px] m-[0_auto]">
          <div className="header_block flex justify-between items-center py-3 px-[40px]">
            <div className="block_1_logo_header">
              <Link to={`/`}>
                <img
                  className="w-[50px] rounded-full"
                  src={logoHeader}
                  alt=""
                />
              </Link>
            </div>
            <nav className="navbar">
              <ul>
                <li>
                  <Link
                    className="text-black text-[1.1rem] font-[600] dark:text-white"
                    to={`/`}
                  >
                    Home
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="block_3_header">
              <Switcher />
              
            </div>
          </div>
        </header>
        <Outlet />
        <footer className="footer">Footer</footer>
      </div>
    </>
  );
};

export default Layout;
