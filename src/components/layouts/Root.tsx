import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="w-screen h-screen flex">
      <aside className="w-[256px] h-full bg-black rounded-tr-2xl">
        aside
      </aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
