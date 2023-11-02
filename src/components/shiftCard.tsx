import { z } from "zod";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { RootState } from "@/app/store";
import { ShiftSchema } from "@/utils/schema";
import { Group, Shifts, Units } from "@/utils/type";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addShifts, fetchShifts } from "@/features/shifts/shiftSlice";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardComponent from "./card";

type Props = {
  unit: Units[];
  scheduleDate: string;
  boardName: string;
};

const ShiftCard = ({ unit, scheduleDate, boardName }: Props) => {
  const dispatch = useAppDispatch();
  const shifts = useAppSelector((state: RootState) => state.shifts.shifts);

  const form = useForm<z.infer<typeof ShiftSchema>>({
    resolver: zodResolver(ShiftSchema),
  });

  // Group the shifts by position
  const groupShift = (args: Shifts[]) => {
    return args?.reduce((acc, shift) => {
      if (acc[shift.name]) {
        acc[shift.name] = [...acc[shift.name], shift];
      } else {
        acc[shift?.name] = [shift];
      }
      return acc;
    }, {} as { [key: string]: Group[] });
  };

  const positions = Object.keys(groupShift(shifts))?.map((shift) => {
    const item = groupShift(shifts)[shift];
    const singleItem = {
      title: shift,
      content: item,
    };

    return singleItem;
  });

  const onSubmit = (data: z.infer<typeof ShiftSchema>) => {
    const unitId = unit[0]?.id ?? "";
    const { name, time } = data;
    try {
      dispatch(
        addShifts({
          unitId,
          name,
          time,
          scheduleDate: scheduleDate as string,
          boardName,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(fetchShifts(unit[0].id));
  }, [unit, dispatch]);

  return (
    <div className="">
      {positions.map((position) => (
        <div className="mb-4" key={position.title}>
          <p className="font-bold">{position.title}</p>

          <div className="flex gap-4">
            {position.content.map((content) => (
              <CardComponent key={content.id} content={content} />
            ))}

            {/* Add new shift to specific position */}
            <div className="">
              <Popover>
                <PopoverTrigger>
                  <Button className="bg-[#D2D635] w-[250px]">New Shift</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <h2 className="font-bold">
                    Add New Shift to {position.title}
                  </h2>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Supervisor"
                                {...field}
                                defaultValue={position.title}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                              <Input placeholder="7-3" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Submit</Button>
                    </form>
                  </Form>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShiftCard;
