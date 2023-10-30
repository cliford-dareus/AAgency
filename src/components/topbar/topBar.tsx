import useGetCalenda from "@/utils/hooks/useGetCalenda";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "../ui/input";
import { months } from "@/utils/common";
import { useEffect } from "react";

type Props = {
  setDayParam: (dayParam: string) => void;
};

const TopBar = ({ setDayParam }: Props) => {
  const { currentDay, setCurrentDay, currentScheduleDay, dayParam } =
    useGetCalenda();

  useEffect(() => {
    setDayParam(dayParam);
  }, [dayParam]);
  
  return (
    <div className="flex h-[35px] items-center mt-8">
      <div className="w-[350px] bg-slate-400 flex rounded-full h-full items-center px-4">
        <Search />
        <Input
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
  );
};

export default TopBar;
