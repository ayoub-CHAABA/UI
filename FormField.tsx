import React from "react";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import NumberInputWithButtons from "./NumberInputWithButtons";
import TimeInputWithTimeZone from "./TimeInputWithTimeZone";
import { Controller } from "react-hook-form";

type FormFieldProps = {
  field: {
    name: string;
    label: string;
    placeholder?: string;
    type: "text" | "number" | "checkbox" | "timeWithTimeZone" | "date";
    withButtons?: boolean;
    allowNegative?: boolean;
    options?: { value: string; label: string }[];
  };
  form: any; // React Hook Form's `useForm` instance
};

const FormField: React.FC<FormFieldProps> = ({ field, form }) => {
  return (
    <Controller
      name={field.name}
      control={form.control}
      render={({ field: formField, fieldState }) => (
        <FormItem>
          <FormLabel>{field.label}</FormLabel>
          <FormControl>
            {field.type === "text" && (
              <Input
                placeholder={field.placeholder || ""}
                {...formField}
              />
            )}
            {field.type === "number" && field.withButtons ? (
              <NumberInputWithButtons
                value={formField.value}
                onChange={formField.onChange}
                min={field.allowNegative ? undefined : 0}
                step={1}
                allowNegative={field.allowNegative}
              />
            ) : field.type === "number" ? (
              <Input
                type="number"
                placeholder={field.placeholder || ""}
                {...formField}
              />
            ) : null}
            {field.type === "checkbox" && (
              <Checkbox
                checked={formField.value || false}
                onCheckedChange={(checked) => formField.onChange(checked)}
              />
            )}
            {field.type === "timeWithTimeZone" && (
              <TimeInputWithTimeZone
                value={formField.value}
                onChange={(time, timeZone) => {
                  form.setValue(`${field.name}_time`, time);
                  form.setValue(`${field.name}_timeZone`, timeZone);
                }}
              />
            )}
            {field.type === "date" && (
              <Input
                type="date"
                placeholder={field.placeholder || ""}
                {...formField}
              />
            )}
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default FormField;