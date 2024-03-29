import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import {
  LucideBell,
  LucideChevronLeft,
  LucideChevronRight,
  LucideGrip,
  LucideHelpCircle,
} from "lucide-react";
import {
  decrementDate,
  incrementDate,
  nextWeek,
  prevWeek,
  toggleviewselected,
} from "./topbar-slice";
import { addDateBy } from "@/utils/helpers";

type Props = {};

const Topbar = (props: Props) => {
  const dispatch = useAppDispatch();
  const { currentDate, viewSelected, firstDayOfWeek } = useAppSelector(
    (state: RootState) => state.topbar
  );
  const DATE = new Date(currentDate);

  const handleSelectedView = (item: "Today" | "Week" | "Month") => {
    if (viewSelected === item) return;
    else {
      dispatch(toggleviewselected(item));
    }
  };

  return (
    <div className="h-[80px] absolute top-0 left-0 right-0 border-b ">
      <div className="container mx-auto h-full flex items-center gap-4">
        <div className="flex items-center gap-2">
          {["Today", "Week", "Month"].map((item: string) => (
            <Button
              key={item}
              variant={viewSelected === item ? undefined : "secondary"}
              onClick={() =>
                handleSelectedView(item as "Today" | "Week" | "Month")
              }
            >
              {item}
            </Button>
          ))}
        </div>

        {viewSelected === "Today" ? (
          <div className="flex items-center gap-4 h-full ml-16">
            <span
              onClick={() =>
                dispatch(
                  decrementDate(
                    String(
                      new Date(
                        DATE.getFullYear(),
                        DATE.getMonth(),
                        DATE.getDate() - 1
                      )
                    )
                  )
                )
              }
            >
              <LucideChevronLeft size={24} />
            </span>
            <div>{DATE.toDateString()}</div>
            <span
              onClick={() =>
                dispatch(
                  incrementDate(
                    String(
                      new Date(
                        DATE.getFullYear(),
                        DATE.getMonth(),
                        DATE.getDate() + 1
                      )
                    )
                  )
                )
              }
            >
              <LucideChevronRight size={24} />
            </span>
          </div>
        ) : viewSelected === "Week" ? (
          <div className="flex items-center gap-4 h-full ml-16">
            <span onClick={() => dispatch(prevWeek())}>
              <LucideChevronLeft size={24} />
            </span>
            <div>
              {firstDayOfWeek.toDateString()}-
              {addDateBy(firstDayOfWeek, 6).toDateString()}
            </div>
            <span onClick={() => dispatch(nextWeek())}>
              <LucideChevronRight size={24} />
            </span>
          </div>
        ) : null}

        <div className="flex items-center gap-4 ml-auto">
          <LucideBell size={20} />
          <LucideHelpCircle size={20} />
          <LucideGrip size={20} />

          <div className="h-[40px] w-[40px] rounded-full bg-black ml-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
