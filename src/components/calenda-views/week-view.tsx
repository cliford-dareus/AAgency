import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { cn } from "@/lib/utils";
import { DAY_WEEK } from "@/utils/common";
import {
  addDateBy,
  hourNow,
  isSameDate,
  minuteNow,
  range,
} from "@/utils/helpers";

type Props = {};

const CalendaWeekView = (props: Props) => {
  const { firstDayOfWeek } = useAppSelector((state: RootState) => state.topbar);

  return (
    <div className="w-full relative">
      <div className="grid grid-cols-[30px_1fr]">
        <div className="grid grid-rows-[24] first:mt-[15px]">
          {range(24).map((hour, index) => {
            return (
              <div key={index} className="text-center">
                <p className="h-[30px] flex items-center">{hour}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-7">
          {DAY_WEEK.map((day, index) => (
            <div
              key={day}
              className={cn(
                isSameDate(new Date(), addDateBy(firstDayOfWeek, index))
                  ? "bg-slate-200"
                  : "bg-slate-100",
                "text-center p-2 relative"
              )}
            >
              <p className="">{day}</p>
              {isSameDate(addDateBy(firstDayOfWeek, index), new Date()) && (
                <Event date={new Date()} text={"test"} duretion={2} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          top: `${hourNow * 30 + 15 + 30 / 2 + minuteNow / 2}px`,
        }}
        className={cn("w-full border absolute")}
      ></div>
    </div>
  );
};

const Event = ({ date, text, duretion }) => {
  return (
    <div
      style={{
        top: `${date.getHours() * 30 + 15 + 30 / 2 + date.getMinutes() / 2}px`,
        height: `${duretion * 30}px`,
      }}
      className="absolute bg-red-300 h-full left-0 right-0 rounded-sm"
    >
      {text}
    </div>
  );
};

export default CalendaWeekView;
