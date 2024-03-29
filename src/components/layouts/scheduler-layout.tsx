import Sidebar from "./sidebar/sidebar";
import { Outlet } from "react-router-dom";
import Sidebarlinks from "./sidebar/sidebarlinks";
import {
  LucideLayoutDashboard,
} from "lucide-react";
import Topbar from "@/features/Interface-controls/topbar/topbar";

type Props = {};

const SchedulerLayout = (props: Props) => {

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar>
        <Sidebarlinks
          icon={<LucideLayoutDashboard size={18} />}
          text="Dashboard"
          active={true}
          alert={false}
        />
      </Sidebar>
      <main className="flex-1 relative">
        <Topbar />
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SchedulerLayout;
