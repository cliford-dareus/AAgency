import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type Props = {};

const MainNavigation = (props: Props) => {
  return (
    <header className="fixed top-0 w-full z-50 h-[70px] py-4">
      <div className="container mx-auto flex items-center">
        <div className="">Logo</div>
        <nav className="ml-auto">
          <ul className="flex items-center gap-4">
            <li className="">
              <Link to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/help">Help</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <div className="ml-8">
          <Button>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default MainNavigation;
