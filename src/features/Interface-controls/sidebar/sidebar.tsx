import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { toggleSidebar } from "@/features/Interface-controls/sidebar/sidebar-slice";
import { ChevronFirst, ChevronLast } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const Sidebar = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const expanded = useAppSelector((state: RootState) => state.sidebar.expanded);

  return (
    <aside className="h-screen">
      {/* Sidebar Logo and sidebar toggle */}
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        {/* Sidebar Menu */}
        <ul className="flex-1 px-3 mt-[2em]">{children}</ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
