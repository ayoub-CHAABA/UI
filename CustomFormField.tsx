import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import NumberInputWithButtons from "./NumberInputWithButtons";
import TimeInputWithTimeZone from "./TimeInputWithTimeZone";

type CustomFormFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type: "text" | "select" | "number" | "checkbox" | "timeWithTimeZone" | "date";
  withButtons?: boolean;
  allowNegative?: boolean;
  options?: { value: string; label: string }[];
  formField: any;
  setValue: any; // react-hook-form `setValue`
};

const CustomFormField: React.FC<CustomFormFieldProps> = ({
  name,
  label,
  placeholder,
  type,
  withButtons,
  allowNegative,
  options,
  formField,
  setValue,
}) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        {type === "text" && <Input placeholder={placeholder} {...formField} />}
        {type === "number" && withButtons ? (
          <NumberInputWithButtons
            value={formField.value}
            onChange={formField.onChange}
            min={allowNegative ? undefined : 0}
            step={1}
            allowNegative={allowNegative}
          />
        ) : type === "number" ? (
          <Input
            type="number"
            placeholder={placeholder}
            {...formField}
          />
        ) : null}
        {type === "checkbox" && (
          <Checkbox
            checked={formField.value}
            onCheckedChange={formField.onChange}
          />
        )}
        {type === "timeWithTimeZone" && (
          <TimeInputWithTimeZone
            value={formField.value}
            onChange={(time, timeZone) => {
              setValue(`${name}_time`, time);
              setValue(`${name}_timeZone`, timeZone);
            }}
          />
        )}
        {type === "date" && (
          <Input
            type="date"
            placeholder={placeholder}
            {...formField}
          />
        )}
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default CustomFormField;