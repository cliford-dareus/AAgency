import { DAY_WEEK } from "@/utils/common";
import { addDateBy, isSameDate, range } from "@/utils/helpers";
import { rooms } from "@/utils/dummy-data";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { useRef, useState } from "react";
import DraggableElement from "./draggable-element";
import { addEvent, moveEvent } from "@/features/events/events-slice";

type Props = {
  // Pass props from parent component
  // event: any;
  // rooms: any;
};

export type DraggableData = {
  id: string;
  x: number;
  y: number;
  square: string;
  eventLength: number;
};

type DraggableProps = DraggableData & { element: HTMLElement };

const SchedulerWeekView = (props: Props) => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state: RootState) => state.events.events);
  const dragOverRef = useRef<any | null>(null);
  const dragRef = useRef<DraggableProps | null>(null);
  const { firstDayOfWeek } = useAppSelector((state: RootState) => state.topbar);

  const drag = (event: any, data: DraggableData) => {
    const element = document.getElementById(data.id) as HTMLElement;
    dragRef.current = { ...data, element };
    event.dataTransfer.setData("text/plain", JSON.stringify(data));
  };

  const drop = (event: any) => {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text/plain"));

    if (data.isNew) {
      const { id, text, duration } = data;
      const date = new Date(
        firstDayOfWeek.getFullYear(),
        firstDayOfWeek.getMonth(),
        firstDayOfWeek.getDate() + dragOverRef.current.index,
        Number(dragOverRef.current.id)
      );
      const newEvent = {
        id,
        roomId: dragOverRef.current.roomId + 1,
        text,
        duration,
        date,
      };
      dispatch(addEvent(newEvent));
      return;
    }

    const { square, id } = data;
    const roomid = Number(id);
    // Calculate the time at which the event was dropped by subtracting
    // the value of the square property from the id of the drop target.
    const time = Number(dragOverRef.current.id) - square;

    dispatch(
      moveEvent(
        events.map((e) =>
          e.id === roomid
            ? {
                ...e,
                roomId: dragOverRef.current.roomId + 1,
                date: new Date(
                  firstDayOfWeek.getFullYear(),
                  firstDayOfWeek.getMonth(),
                  firstDayOfWeek.getDate() + dragOverRef.current.index,
                  time
                ),
              }
            : e
        )
      )
    );
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-[200px_1fr]">
        {/* Rooms column */}
        <div className="grid grid-flow-row mt-[24px]">
          <div className="h-[35px] flex items-center">Rooms</div>
          {rooms.map((room, index) => (
            <div
              key={index}
              className="border-t h-[50px] first:h-[35px] w-full flex items-center"
            >
              <p className="">{room.name}</p>
            </div>
          ))}
        </div>

        {/* Events column */}
        {/* Todo: Have this Events column scroll with js */}
        <div className="w-full h-full flex overflow-x-scroll no-scrollbar">
          <div className="flex relative">
            {DAY_WEEK.map((_, index) => (
              <div className="flex flex-col" key={index}>
                <div className="">
                  {new Date(
                    firstDayOfWeek.getFullYear(),
                    firstDayOfWeek.getMonth(),
                    firstDayOfWeek.getDate() + index
                  ).toISOString()}
                </div>

                <div className="grid grid-cols-[24] grid-flow-col-dense relative">
                  {range(24).map((hour, index) => {
                    return (
                      <div
                        key={index}
                        className="border-t h-[35px] w-[100px] flex items-center justify-center"
                      >
                        <p className="">{hour}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-flow-row">
                  {rooms.map((_, rowIndex) => (
                    <div key={rowIndex}>
                      <div
                        id={`room-${rowIndex}`}
                        className="grid grid-cols-[24] grid-flow-col-dense relative"
                        onDragOver={(e) => {
                          e.preventDefault();
                          const target = e.target as HTMLElement;
                          target?.offsetParent?.classList.add("bg-red-200");
                          dragOverRef.current = {
                            id: target.id,
                            roomId: rowIndex,
                            index,
                          };
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          const target = e.target as HTMLElement;
                          target?.offsetParent?.classList.remove("bg-red-200");
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          drop(e);
                          const target = e.target as HTMLElement;
                          target?.offsetParent?.classList.remove("bg-red-200");
                          const cH = target?.offsetHeight;
                          target.offsetParent?.classList.add(`h-[${cH += 50}px]`);
                        }}
                      >
                        {range(24).map((_, colIndex) => (
                          <div
                            id={`${colIndex}`}
                            key={colIndex}
                            className="text-center w-[100px] relative border h-[50px] border-red-500"
                          />
                        ))}
                      </div>
                      {/* Event  */}
                      {events?.map(
                        (currentevent) =>
                          isSameDate(
                            new Date(
                              new Date(currentevent.date).getFullYear(),
                              new Date(currentevent.date).getMonth(),
                              new Date(currentevent.date).getDate()
                            ),
                            addDateBy(firstDayOfWeek, index)
                          ) &&
                          currentevent.roomId === rowIndex + 1 && (
                            <DraggableElement
                              key={currentevent.id}
                              events={events}
                              event={currentevent}
                              index={index}
                              drag={drag}
                              setEvent={() => {}}
                              position={{
                                top:
                                  currentevent.roomId * 50 +
                                  10 +
                                  events?.filter(
                                    (e) =>
                                      e.roomId === currentevent.roomId &&
                                      e.id !== currentevent.id
                                  ).length *
                                    20,
                              }}
                            />
                          )
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulerWeekView;
