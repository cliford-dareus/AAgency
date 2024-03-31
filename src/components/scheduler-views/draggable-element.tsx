import { Event, range } from "@/utils/helpers";
import React, { DragEvent } from "react";
import { DraggableData } from "./week-view";

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
  event: Event;
  index: number;
  drag: (
    event: DragEvent<HTMLDivElement>,
    data: DraggableData,
    isNew: boolean
  ) => void;
};

const DraggableElement = React.memo(
  ({ event, index, drag }: DraggableElementProps) => {
    const squareHover = React.useRef<string | null>(null);
    const duration =  event.duration;
    const top = event.roomId * 50 + 10;
    const left = 100 * 24 * index + new Date(event.date).getHours() * 100;
    const right = 100 * 24 * 7 - left - 100 * duration;
    const id = `${event.id}`;

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
        className="absolute bg-green-500 z-10"
        draggable
        onDragStart={handleDragStart}
      >
        <div className="w-full absolute inset-0 flex">
          {Array.from({ length: event.duration }, (_, i) => (
            <div
              key={i}
              className="w-[100px] hover:bg-purple-500"
              id={`square-${i}`}
              onMouseEnter={(e) => {
                const target = e.target as HTMLElement;
                squareHover.current = target.id.split("-")[1];
              }}
            />
          ))}
        </div>
        <div>Events start at: {event.date.getHours()}</div>
      </div>
    );
  }
);

export default DraggableElement;
