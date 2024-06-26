import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { setActiveLink } from "./sidebar-slice";

type Props = {
  icon: any;
  text: string;
  path: string;
  alert?: boolean;
  expanded?: boolean;
  active?: string;
};

const Sidebarlinks = ({ icon, text, alert, path, active }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const expanded = useAppSelector((state: RootState) => state.sidebar.expanded);
  return (
    <li
      onClick={() => {
        navigate(`${path.toLowerCase()}`);
        dispatch(setActiveLink(text.toLocaleLowerCase()));
      }}
      className={`  
      relative flex items-center py-2 px-3 my-1
      font-medium rounded-md cursor-pointer
      transition-colors group
      ${
        active === text.toLocaleLowerCase()
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }
  `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
        absolute left-full rounded-md px-2 py-1 ml-6
        bg-indigo-100 text-indigo-800 text-sm
        invisible opacity-20 -translate-x-3 transition-all
        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
    `}
        >
          {text}
        </div>
      )}
    </li>
  );
};

export default Sidebarlinks;
