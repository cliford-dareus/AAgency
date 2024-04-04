import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { cn } from "@/lib/utils";
import { DAY_WEEK } from "@/utils/common";
import {
  addDateBy,
  events,
  hourNow,
  isSameDate,
  minuteNow,
  range,
} from "@/utils/helpers";
import { LucideClock } from "lucide-react";

type Props = {};

const CalendaWeekView = ({}: Props) => {
  const { firstDayOfWeek } = useAppSelector((state: RootState) => state.topbar);


  return (
    <div className="w-full h-full relative">
      <div className="grid grid-cols-[40px_1fr] relative">
        <div className="grid grid-rows-[24] first:mt-[15px] place-items-center border">
          <span className="h-[35px] flex items-center justify-center">
            <LucideClock size={24} />
          </span>
          {range(24).map((hour, index) => {
            return (
              <div
                key={index}
                className="border-t h-[35px] w-full flex items-center justify-center"
              >
                <p className="">{hour}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-7 relative mt-[16px]">
          {DAY_WEEK.map((day, index) => (
            <div
              key={day}
              className={cn(
                isSameDate(new Date(), addDateBy(firstDayOfWeek, index))
                  ? "bg-slate-200"
                  : "bg-slate-100",
                "text-center p-2 relative border border-red-200"
              )}
            >
              <p className="">
                {day} -{" "}
                {new Date(
                  firstDayOfWeek.getFullYear(),
                  firstDayOfWeek.getMonth(),
                  firstDayOfWeek.getDate() + index
                ).getDate()}
              </p>
              {events.map(
                (event) =>
                  isSameDate(addDateBy(firstDayOfWeek, index), event.date) && (
                    <Event
                      date={event.date}
                      text={event.text}
                      duration={event.duration}
                    />
                  )
              )}
            </div>
          ))}
          {/* Lines in the background */}
          <div className="absolute inset-0 mt-[35px]">
            {range(24).map((_, index) => (
              <div
                key={index}
                className="text-center relative border-t h-[35px]"
              />
            ))}
          </div>
        </div>

        <div
          style={{
            top: `${hourNow * 35 + 17.5 + 35 / 2 + minuteNow / 2}px`,
          }}
          className={cn("w-full border border-yellow-300 absolute")}
        ></div>
      </div>
    </div>
  );
};

export const Event = ({
  date,
  text,
  duration,
}: {
  date: Date;
  text: string;
  duration: number;
}) => {
  return (
    <div
      style={{
        top: `${date.getHours() * 35 + 17 + 35 / 2 + date.getMinutes() / 2}px`,
        height: `${duration * 35}px`,
      }}
      className="absolute bg-green-500  left-0 right-0 rounded-sm z-10" 
    >
      {text}
    </div>
  );
};

export default CalendaWeekView;
