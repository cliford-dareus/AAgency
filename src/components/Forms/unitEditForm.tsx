import { UpdateUnitSchema } from "@/utils/schema";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch } from "@/app/hooks";
import { updateUnitFetch } from "@/features/units/unitSlice";

type Props = {
  scheduleDate: string;
  unit: string;
};

const UnitEditForm = ({ scheduleDate, unit }: Props) => {
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof UpdateUnitSchema>>({
    resolver: zodResolver(UpdateUnitSchema),
    defaultValues: {
      boardName: "",
      leadName: "",
    },
  });

  const onSubmit = (data: z.infer<typeof UpdateUnitSchema>) => {
    dispatch(
      updateUnitFetch({
        newLead: data.leadName,
        newUnitName: data.boardName,
        sch_id: scheduleDate,
        boardname: unit,
      })
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="boardName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leadName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lead Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default UnitEditForm;
