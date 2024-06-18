import Sidebar from "../../features/Interface-controls/sidebar/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Sidebarlinks from "../../features/Interface-controls/sidebar/sidebarlinks";
import {
  LucideCalendar,
  LucideLayoutDashboard,
  LucidePlus,
} from "lucide-react";
import Topbar from "@/features/Interface-controls/topbar/topbar";
import { Button } from "../ui/button";
import { useState } from "react";
import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";

type Props = {};

const AdminLayout = (props: Props) => {
  const { pathname } = useLocation();

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar>
        <Links />
      </Sidebar>

      <main className="flex-1 relative">
        <Topbar isAdmin pathname={pathname} />
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const Links = () => {
  const expanded = useAppSelector((state: RootState) => state.sidebar.expanded);
  const active = useAppSelector((state: RootState) => state.sidebar.activeLink);
  const [createScheduleModalActive, setCreateScheduleModalActive] =
    useState(false);

  return (
    <>
      <div className="my-[40px] ">
        <Button
          className={`
              relative flex items-center py-2 px-3 my-1
              font-medium rounded-md cursor-pointer
              transition-colors group
            ${
              active
                ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-red-800"
                : "hover:bg-indigo-50 text-gray-600"
            }`}
          onClick={() =>
            setCreateScheduleModalActive(!createScheduleModalActive)
          }
        >
          <LucidePlus size={18} />
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-[50px] ml-3" : "w-0"
            }`}
          >
            Create
          </span>
        </Button>
        {createScheduleModalActive && (
          <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-green-500 h-[400px] p-4">
            <input />
          </div>
        )}
      </div>

      <Sidebarlinks
        icon={<LucideLayoutDashboard size={18} />}
        text="Dashboard"
        path="/dashboard"
        active={active}
        alert={false}
      />

      <Sidebarlinks
        icon={<LucideCalendar size={18} />}
        text="Scheduler"
        path="/scheduler"
        active={active}
        alert={false}
      />
    </>
  );
};

export default AdminLayout;
