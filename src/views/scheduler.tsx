import { useEffect, useState } from "react";
import SchedulerWeekView from "@/components/scheduler-views/week-view";
import { range } from "@/utils/helpers";
import { Button } from "@/components/ui/button";

const Scheduler = () => {
  const [employeeModalIsOpen, setEmployeeModalIsOpen] = useState(false);
 

  return (
    <div className="w-full h-full mt-[80px]">
      <div className="mx-auto h-full">
        <div className="pt-4">
          <div className="relative">
            <SchedulerWeekView />
            <Button
              onClick={() => setEmployeeModalIsOpen(!employeeModalIsOpen)}
            >
              Employees
            </Button>
            {/* Employee List with draggable card to drag into the timeline and make a complete schedule */}
            {employeeModalIsOpen && (
              <div className="fixed top-4 left-0 bottom-4 w-[300px] bg-slate-100 p-4 rounded-md shadow-sm">
                <ul>
                  {range(10).map((_, index) => (
                    <DraggableCard index={index} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DraggableCard = ({ index }) => {
  return (
    <li
      draggable
      id={`${index}`}
      key={index}
      onDragStart={(event) => {
        event.dataTransfer?.setData(
          "text/plain",
          JSON.stringify({
            id: index * 2,
            isNew: true,
            text: "new Event",
            duration: 5,
          })
        );
      }}
      className="h-[50px] flex items-center border-t"
    >
      Employee Name{" "}
    </li>
  );
};

export default Scheduler;
