import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";

const Root = () => {
  return (
    <div className="w-screen h-screen flex">
      <aside className="w-[256px] h-full bg-black rounded-tr-2xl">
        <Sidebar />
      </aside>

      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
