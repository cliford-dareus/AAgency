import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { cn } from "@/lib/utils";
import { DAY_WEEK } from "@/utils/common";
import { getDaysInMonth, getSortedDays, isSameDate } from "@/utils/helpers";

type Props = {};

const events = [
  { date: new Date(2024, 3, 10), text: "test", duretion: 2 },
  { date: new Date(2024, 3, 20), text: "test", duretion: 2 },
];

const CalendaMonthView = ({}: Props) => {
  const { currentDate } = useAppSelector((state: RootState) => state.topbar);
  // console.log(getSortedDays(new Date()));

  return (
    <div className="w-full h-full relative">
      <div className="grid grid-cols-7">
        {DAY_WEEK.map((day, index) => (
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
          "grid grid-cols-7 h-full border"
        )}
      >
        {getSortedDays(new Date()).map((day, index) => (
          <div key={index}>
            <p className="text-center">{new Date(day).getDate()}</p>
            {/* Events goes here */}
            <div className="">
              {events.map(
                (event) =>
                  isSameDate(
                    new Date(
                      new Date(currentDate).getFullYear(),
                      new Date(currentDate).getMonth() + 1,
                      new Date(day).getDate()
                    ),
                    event.date
                  ) && <div>Hello</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendaMonthView;
