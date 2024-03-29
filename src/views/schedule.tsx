import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import CalendaMonthView from "@/components/calenda-views/month-view";
import CalendaTodayView from "@/components/calenda-views/today-view";
import CalendaWeekView from "@/components/calenda-views/week-view";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {};

const Schedule = ({}: Props) => {
  const { viewSelected } = useAppSelector((state: RootState) => state.topbar);

  return (
    <ScrollArea className="rounded-md mt-[80px]">
      <div className="w-full h-[calc(100vh-80px)]  py-4">
        {/* Add Schedule Calenda  with view toggle */}
        {viewSelected === "Week" ? (
          <CalendaWeekView />
        ) : viewSelected === "Month" ? (
          <CalendaMonthView />
        ) : (
          <CalendaTodayView />
        )}
      </div>
    </ScrollArea>
  );
};

export default Schedule;
