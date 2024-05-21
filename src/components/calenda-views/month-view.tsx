import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { cn } from "@/lib/utils";
import { DAY_WEEK } from "@/utils/common";
import { events, getDaysInMonth, getSortedDays, isSameDate } from "@/utils/helpers";

type Props = {};



const CalendaMonthView = ({}: Props) => {
  const { currentDate } = useAppSelector((state: RootState) => state.topbar);
  
  return (
    <div className="w-full h-full relative">
      <div className="grid grid-cols-7">
        {DAY_WEEK.map((day) => (
          <div key={day} className="text-center p-2 relative">
            <p className="">{day}</p>
          </div>
        ))}
      </div>
      <div
        className={cn(
          getDaysInMonth(new Date()) === 28
            ? "grid grid-rows-[4]"
            : "grid grid-rows-[5]",
          "w-full",
          "grid grid-cols-7 h-[calc(100vh-180px)] border"
        )}
      >
        {getSortedDays(new Date(currentDate)).map((day, index) => (
          <div key={index} className="border p-2">
            <p className="text-right">{new Date(day).getDate()}</p>
            {/* Events goes here */}
            <div className="">
              {events.map(
                (event) =>
                  isSameDate(
                    new Date(
                      new Date(day).getFullYear(),
                      new Date(day).getMonth(),
                      new Date(day).getDate()
                    ),
                    event.date
                  ) && (
                    <div className="px-2 bg-green-500 rounded-full my-1">
                      Hello
                    </div>
                  )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendaMonthView;
