import * as React from "react";
import { DateTime } from "luxon";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SelectSingleEventHandler } from "react-day-picker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DateTimePickerProps {
  date: Date;
  setDate: (date: Date) => void;
  locale: any;
}

export function DateTimePicker({ date, setDate, locale }: DateTimePickerProps) {
  const [selectedDateTime, setSelectedDateTime] = React.useState(
    DateTime.fromJSDate(date)
  );

  React.useEffect(() => {
    setSelectedDateTime(DateTime.fromJSDate(date));
  }, [date]);

  const handleSelect: SelectSingleEventHandler = (day, selected) => {
    if (!selected) return;
    const selectedDay = DateTime.fromJSDate(selected);
    const modifiedDay = selectedDay.set({
      hour: selectedDateTime.hour,
      minute: selectedDateTime.minute,
    });

    setSelectedDateTime(modifiedDay);
    setDate(modifiedDay.toJSDate());
  };

  const handleTimeChange: React.ChangeEventHandler = (e) => {
    e.stopPropagation();
    const { value } = e.target as HTMLInputElement;
    const hours = Number.parseInt(value.split(":")[0], 10);
    const minutes = Number.parseInt(value.split(":")[1], 10);
    const modifiedDay = selectedDateTime.set({ hour: hours, minute: minutes });

    setSelectedDateTime(modifiedDay);
    setDate(modifiedDay.toJSDate());
  };

  const footer = (
    // Heure
    <Input
      type="time"
      onChange={handleTimeChange}
      value={selectedDateTime.toFormat("HH:mm")}
    />
  );
  return (
    <>
      <Button
        variant={"outline"}
        className={cn(
          "w-full justify-start text-left font-normal",
          !date && "text-muted-foreground"
        )}
      />
      {date ? selectedDateTime.toFormat("DDD HH:mm") : "Select Date & Time"}

      {footer}
    </>
  );
}
