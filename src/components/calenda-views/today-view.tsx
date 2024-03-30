import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { events, isSameDate, range } from "@/utils/helpers";
import { LucideClock } from "lucide-react";
import { Event } from "./week-view";

type Props = {};

const CalendaTodayView = (props: Props) => {
  const { currentDate } = useAppSelector((state: RootState) => state.topbar);
  return (
    <div className="w-full">
      <div className="grid grid-cols-[40px_1fr]">
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

        <div className="mt-[16px] relative">
          <div className="w-full h-[35px] border-t flex items-center justify-center">
            {new Date().toISOString()}
          </div>
          <div>
            {events.map(
              (event) =>
                isSameDate(new Date(currentDate), event.date) && (
                 <Event date={event.date} text={event.text} duretion={event.duretion} /> 
                )
            )}
          </div>
          
          {/* Lines in the background */}
          <div className="mt-[35px] absolute inset-0">
            {range(24).map((_, index) => (
              <div
                key={index}
                className="text-center relative border-t h-[35px]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendaTodayView;
