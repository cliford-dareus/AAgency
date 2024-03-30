import { DAY_WEEK } from "@/utils/common";
import { addDateBy, events, isSameDate, range, rooms } from "@/utils/helpers";
import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { useRef, useState } from "react";

type Props = {};
let TIME = 1;

const SchedulerWeekView = (props: Props) => {
  const [event, setEvent] = useState(events);
  const dragOverRef = useRef<any | null>(null);
  const dragRef = useRef<{
    id: string;
    x: number;
    y: number;
    square: string;
    eventLength: number;
    element: HTMLElement;
  } | null>(null);
  const { firstDayOfWeek } = useAppSelector((state: RootState) => state.topbar);

  const drag = (
    event: any,
    data: {
      id: string;
      x: number;
      y: number;
      square: string;
      eventLength: number;
    }
  ) => {
    const element = document.getElementById(data.id) as HTMLElement;
    dragRef.current = { ...data, element };

    event.dataTransfer.setData("text/plain", JSON.stringify(data));
  };

  const drop = (event: any) => {
    event.preventDefault();

    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    const { square, y, id } = data;
    const roomid = Number(id);
    TIME = Number(dragOverRef.current.id) - square;

    setEvent((prev) =>
      prev.map((e) =>
        e.id === roomid
          ? {
              ...e,
              roomId: dragOverRef.current.roomId + 1,
              date: new Date(
                firstDayOfWeek.getFullYear(),
                firstDayOfWeek.getMonth(),
                firstDayOfWeek.getDate() + dragOverRef.current.index,
                TIME
              ),
            }
          : e
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
        <div className="w-full h-full flex overflow-x-scroll no-scrollbar">
          <div className="flex relative" draggable>
            {DAY_WEEK.map((_, index) => (
              <div className="flex flex-col">
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
                    <>
                      <div
                        className="grid grid-cols-[24] grid-flow-col-dense relative"
                        id={`room-${rowIndex}`}
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

                      {event.map(
                        (event) =>
                          isSameDate(
                            new Date(
                              new Date(event.date).getFullYear(),
                              new Date(event.date).getMonth(),
                              new Date(event.date).getDate()
                            ),
                            addDateBy(firstDayOfWeek, index)
                          ) &&
                          rowIndex === 2 && (
                            <div
                              id={`${event.id}`}
                              style={{
                                top: `${event.roomId * 50 + 10}px`,
                                left: `${
                                  100 * 24 * index +
                                  new Date(event.date).getHours() * 100
                                }px`,
                                right: `${
                                  100 * 24 * 7 -
                                  (100 * 24 * index +
                                    new Date(event.date).getHours() * 100) -
                                  100 * 5
                                }px`,
                              }}
                              className="absolute bg-green-500 z-10"
                              draggable
                              onDragStart={(e) => {
                                const target = e.target as HTMLElement;
                                const square =
                                  target.getAttribute("squareHover");
                                if (!square) return;
                                drag(e, {
                                  id: `${event.id}`,
                                  y: event.roomId,
                                  x: event.date.getHours(),
                                  square,
                                  eventLength: 5,
                                });
                              }}
                            >
                              <div className="w-full absolute inset-0 flex ">
                                {range(5).map((s, i) => (
                                  <div
                                    className="w-[100px] h-[50px] hover:bg-purple-500"
                                    id={`square-${i}`}
                                    onMouseEnter={(e) => {
                                      const target = e.target as HTMLElement;
                                      target.parentElement?.parentElement?.setAttribute(
                                        "squareHover",
                                        i.toString()
                                      );
                                    }}
                                  >
                                    {s}
                                  </div>
                                ))}
                              </div>
                              Events start at: {event.date.getHours()} and end
                              at: 16:00 {index}
                            </div>
                          )
                      )}
                    </>
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
