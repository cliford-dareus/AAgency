import { Outlet } from "react-router-dom";
import MainNavigation from "./main-navigation";
import Background from "../background";

const Root = () => {
  return (
    <div className="flex flex-col">
      <MainNavigation />
      <Background />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="h-[400px]">
        <div className="container mx-auto">FOOTER</div>
      </footer>
    </div>
  );
};

export default Root;
