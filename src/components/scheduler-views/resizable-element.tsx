import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { Event, moveEvent } from "@/features/events/events-slice";
import { NumberSize, Resizable } from "re-resizable";
import { forwardRef, useCallback, useMemo } from "react";

/**
 * ResizableElement Component
 *
 * @param props - The component props
 * @param props.children - The children to render
 * @param props.event - The event object
 * @param props.setEvent - The function to set the event
 * @param props.setIsDraggable - The function to set isDraggable
 * @param props.state - The state object
 * @returns The rendered component
 */

type ResizableElementProps = {
  children: React.ReactNode;
  event: Event;
  setEvent: React.Dispatch<React.SetStateAction<Event[]>>;
  setIsDraggable: React.Dispatch<React.SetStateAction<boolean>>;
  state: {
    width: number;
    height: number;
  };
};

const ResizableElement = forwardRef<HTMLDivElement, ResizableElementProps>(
  ({ children, event, setEvent, setIsDraggable, state }, ref: any) => {
    const dispatch = useAppDispatch();
    const events = useAppSelector((state: RootState) => state.events.events);
    const handleStopResize = useCallback(
      (d: NumberSize) => {
        const dur = Math.ceil(d.width) / 100;
        if (dur === 0 && event.duration <= 1) return;

        const newDuration = Math.max(1, event.duration + dur);
        const newEvent: Event = { ...event, duration: Math.round(newDuration) };

        const index = events?.findIndex((e) => e.id === event.id);
        const newc = () => {
          if (index === -1) return events;
          return [
            ...events?.slice(0, index),
            newEvent,
            ...events?.slice(index + 1),
          ];
        };

        dispatch(moveEvent(newc()));

        setIsDraggable(true);
      },
      [event, setEvent]
    );

    const resizableProps = useMemo(
      () => ({
        style: { borderRight: "1px solid black" },
        size: { width: state.width, height: state.height },
        maxHeight: ref.current?.offsetHeight,
        minHeight: ref.current?.offsetHeight,
        onResizeStart: () => setIsDraggable(false),
        onResizeStop: (_: any, __: any, ___: any, d: NumberSize) => {
          handleStopResize(d);
        },
      }),
      [
        state.width,
        state.height,
        ref.current?.offsetHeight,
        setIsDraggable,
        handleStopResize,
      ]
    );

    return <Resizable {...resizableProps}>{children}</Resizable>;
  }
);

export default ResizableElement;
