import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import useGetUnitName from "../utils/hooks/useGetUnitsName";
import useGetCalenda from "../utils/hooks/useGetCalenda";
import { months } from "../utils/common";

const Scheduler = () => {
  const { currentDay, currentDays, currentDayIndex, setCurrentDay } =
    useGetCalenda();
  const currentScheduleDay = currentDays[currentDayIndex!];
  const dayParam = new Date(currentScheduleDay.date).toDateString();

  const { units, schedule } = useGetUnitName(dayParam);

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
              <div
                className=""
                onClick={() =>
                  setCurrentDay(
                    new Date(
                      currentScheduleDay.year,
                      currentScheduleDay.month,
                      currentScheduleDay.number - 1
                    )
                  )
                }
              >
                <ChevronLeft />
              </div>

              <p>
                {currentScheduleDay.number} {months[currentDay.getMonth()]}{" "}
                {currentDay.getFullYear()}
              </p>

              <div
                className=""
                onClick={() =>
                  setCurrentDay(
                    new Date(
                      currentScheduleDay.year,
                      currentScheduleDay.month,
                      currentScheduleDay.number + 1
                    )
                  )
                }
              >
                <ChevronRight />
              </div>
            </div>

            <div className="bg-slate-400 flex rounded-full h-full items-center px-4 ml-auto">
              Profile
            </div>
          </div>

          {/* Extract to component */}
          <div className="flex mt-4 border-b items-center pb-4">
            <ul className="flex">
              {units?.map((unit) => (
                <li
                  key={unit.name}
                  className="px-8 border-r border-slate-500 font-semibold"
                >
                  <Link to={unit.name.toLocaleLowerCase()}>{unit.name}</Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 px-4 items-center">
              <div className="bg-blue-400 flex px-4 py-1">
                <Plus />
                <p>New Unit</p>
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
