import { Event } from "@/utils/helpers";
import React, { DragEvent, useEffect, useState } from "react";
import { DraggableData } from "./week-view";
import { Resizable } from "re-resizable";

/**
 * DraggableElement component props
 * @typedef {Object} DraggableElementProps
 * @property {Event} event - The event to be dragged
 * @property {number} index - The index of the event in the list
 * @property {function} drag - The function to handle the drag event
 * @property {Event} drag.event - The event to be dragged
 * @property {DraggableData} drag.data - The data for the draggable element
 * @property {boolean} drag.isNew - Indicates if the drag event is for a new draggable element
 * @returns {ReactElement} - The rendered DraggableElement component
 */

type DraggableElementProps = {
  events: Event[];
  event: Event;
  index: number;
  setEvent: React.Dispatch<React.SetStateAction<Event[]>>;
  drag: (
    event: DragEvent<HTMLDivElement>,
    data: DraggableData,
    isNew: boolean
  ) => void;
};

const DraggableElement = React.memo(
  ({ events, event, setEvent, index, drag }: DraggableElementProps) => {
    const DraggableElementRef = React.useRef<HTMLDivElement | null>(null);
    const [isDraggable, setIsDraggable] = useState(true);
    const squareHover = React.useRef<string | null>(null);
    let duration = event.duration;
    const top = event.roomId * 50 + 10;
    const left = 100 * 24 * index + new Date(event.date).getHours() * 100;
    const right = 100 * 24 * 7 - left - 100 * duration;
    const id = `${event.id}`;
    const [state, setState] = useState({
      width: DraggableElementRef.current?.offsetWidth!,
      height: DraggableElementRef.current?.offsetHeight!,
    });

    const handleDragStart = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        drag(
          e,
          {
            id,
            y: event.roomId,
            x: event.date.getHours(),
            square: squareHover.current!,
            eventLength: 5,
          },
          false
        );
      },
      [drag, event]
    );

    return (
      <div
        id={id}
        style={{ top: `${top}px`, left: `${left}px`, right: `${right}px` }}
        className="absolute z-10 select-none bg-green-500"
        draggable={isDraggable}
        onDragStart={handleDragStart}
        ref={DraggableElementRef}
      >
        <Resizable
          style={{ border: "1px solid black" }}
          size={{ width: state.width, height: state.height }}
          maxHeight={DraggableElementRef.current?.offsetHeight!}
          minHeight={DraggableElementRef.current?.offsetHeight!}
          onResizeStart={() => setIsDraggable(false)}
          onResizeStop={(e, direction, ref, d) => {
            const dur = Math.ceil(d.width) / 100;
            if (dur === 0 && event.duration <= 1) return;
           
            setEvent((prev) => {
              const index = prev.findIndex((e) => e.id === event.id);
              if (index === -1) return prev;
              const otherEvents = [...prev.slice(0, index), ...prev.slice(index + 1)];
              const newDuration = Math.max(1, event.duration + dur);
              const newEvent = { ...event, duration: newDuration };
              return [...otherEvents, newEvent];
            });
            setIsDraggable(true);
          }}
        >
          <div className="w-full absolute inset-0 flex select-none">
            {Array.from({ length: event.duration }, (_, i) => (
              <div
                key={i}
                className="w-[100px] select-none"
                id={`square-${i}`}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement;
                  squareHover.current = target.id.split("-")[1];
                }}
              />
            ))}
          </div>
          <div className="w-[80%] select-none">
            Events start at: {event.date.getHours()}
          </div>
        </Resizable>
      </div>
    );
  }
);

export default DraggableElement;
