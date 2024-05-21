import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { toggleSidebar } from "@/features/Interface-controls/sidebar/sidebar-slice";
import { ChevronFirst, ChevronLast, LucidePlus } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

const Sidebar = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const expanded = useAppSelector((state: RootState) => state.sidebar.expanded);
  const active = useAppSelector((state: RootState) => state.sidebar.expanded);

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
        {/*  */}

        {/* */}
        <div className="mt-[40px] px-4">
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
        </div>
        {/* Sidebar Menu */}
        <ul className="flex-1 px-3 mt-[2em]">{children}</ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
