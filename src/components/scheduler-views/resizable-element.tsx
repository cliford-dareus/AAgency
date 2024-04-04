import { Events, Event } from "@/utils/helpers";
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
  setEvent: React.Dispatch<React.SetStateAction<Events>>;
  setIsDraggable: React.Dispatch<React.SetStateAction<boolean>>;
  state: {
    width: number;
    height: number;
  };
};

const ResizableElement = forwardRef<HTMLDivElement, ResizableElementProps>(
  ({ children, event, setEvent, setIsDraggable, state }, ref: any) => {

    const handleStopResize = useCallback((d: NumberSize) => {
      const dur = Math.ceil(d.width) / 100;
      if (dur === 0 && event.duration <= 1) return;

      const newDuration = Math.max(1, event.duration + dur);
      const newEvent: Event = { ...event, duration: Math.round(newDuration) };

      setEvent((prev: Events) => {
        const index = prev.findIndex((e) => e.id === event.id);
        if (index === -1) return prev;
        return [...prev.slice(0, index), newEvent, ...prev.slice(index + 1)];
      });

      setIsDraggable(true);
    }, [event, setEvent]);

    const resizableProps = useMemo(() => ({
      style: { borderRight: "1px solid black" },
      size: { width: state.width, height: state.height },
      maxHeight: ref.current?.offsetHeight,
      minHeight: ref.current?.offsetHeight,
      onResizeStart: () => setIsDraggable(false),
      onResizeStop: (_: any, __: any, ___: any, d: NumberSize) => {
        handleStopResize(d);
      },
    }), [state.width, state.height, ref.current?.offsetHeight, setIsDraggable, handleStopResize]);

    return <Resizable {...resizableProps}>{children}</Resizable>;
  });

export default ResizableElement;
