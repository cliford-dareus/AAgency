import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { WingProps, getWings } from "../utils/data";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchSchedules } from "../features/scheduler/schedulerSlice";
import useGetUnitName from "../utils/hooks/useGetUnitsName";

export async function loader() {
  const wings = await getWings();
  return wings;
}

const Scheduler = () => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  // const schedule = useAppSelector(state => state.shedule.schedules)
  const wings = useLoaderData() as unknown as WingProps;
  const { units, schedule } = useGetUnitName('Wed Oct 18 2023');

  console.log(units)


  // useEffect(() => {
  //   dispatch(fetchSchedules());
  //   if (wings) {
  //     const n = wings[0].name.toLocaleLowerCase();
  //     navigate(n);
  //   }
  // }, []);

  return (
    <div className="w-full h-full px-4">
      <div className="container mx-auto h-full">
        <div className="pt-4">
          <h1 className="text-[2rem] font-bold">Scheduler</h1>

          <div className="flex h-[35px] items-center mt-8">
            <div className="w-[350px] bg-slate-400 flex rounded-full h-full items-center px-4">
              <Search />
              <input
                className="bg-transparent h-full flex-1 placeholder:text-white px-4 outline-none border-none"
                type="text"
                placeholder="search..."
              />
            </div>

            <div className="flex ml-8 bg-slate-400 rounded-full h-full items-center px-4 gap-4">
              <div className="">
                <ChevronLeft />
              </div>

              <p>October 2023</p>

              <div className="">
                <ChevronRight />
              </div>
            </div>

            <div className="bg-slate-400 flex rounded-full h-full items-center px-4 ml-auto">
              Profile
            </div>
          </div>

          <div className="flex mt-4 border-b items-center pb-4">
            <ul className="flex">
              {wings?.map((wing) => (
                <li
                  key={wing.name}
                  className="px-8 border-r border-slate-500 font-semibold"
                >
                  <Link to={wing.name.toLocaleLowerCase()}>{wing.name}</Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 px-4 items-center">
              <div className="bg-blue-400 flex px-4 py-1">
                <Plus />
                <p>New Wing</p>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <h2 className="mt-4">SHIFT/POSITION</h2>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
