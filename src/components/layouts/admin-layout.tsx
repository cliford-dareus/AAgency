import Sidebar from "../../features/Interface-controls/sidebar/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Sidebarlinks from "../../features/Interface-controls/sidebar/sidebarlinks";
import {
    LucideCalendar,
  LucideLayoutDashboard,
} from "lucide-react";
import Topbar from "@/features/Interface-controls/topbar/topbar";

type Props = {};

const AdminLayout = (props: Props) => {
  const { pathname } = useLocation();

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar>
        <Sidebarlinks
          icon={<LucideLayoutDashboard size={18} />}
          text="Dashboard"
          active={true}
          alert={false}
        />

      <Sidebarlinks
        icon={<LucideCalendar size={18} />}
        text="Scheduler"
        active={false}
          alert={false}
      />
      </Sidebar>
      <main className="flex-1 relative">
        <Topbar isAdmin pathname={pathname}/>
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
