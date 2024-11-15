import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import NumberInputWithButtons from "./NumberInputWithButtons";
import TimeInputWithTimeZone from "./TimeInputWithTimeZone";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// Types for individual fields and field blocks
type FormFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type: "text" | "number" | "checkbox" | "timeWithTimeZone" | "date";
  withButtons?: boolean;
  allowNegative?: boolean;
  options?: { value: string; label: string }[];
};

type FormFieldsBlockProps = {
  title: string;
  description: string;
  fields: FormFieldProps[];
};

type FormProps = {
  form: UseFormReturn<any>;
  fields: (FormFieldProps | FormFieldsBlockProps)[];
  cardTitle: string;
  cardDescription: string;
  onSubmit: (data: any) => void;
};

const FormComponent: React.FC<FormProps> = ({
  form,
  fields,
  cardTitle,
  cardDescription,
  onSubmit,
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">{cardTitle}</h2>
      <p className="text-gray-600">{cardDescription}</p>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Accordion type="single" collapsible>
          {fields.map((field, index) => {
            console.log("Rendering field or field block:", field); // Log each field or field block
            return "fields" in field ? (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{field.title}</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4">{field.description}</p>
                  <div className="space-y-4">
                    {field.fields.map((subField) => {
                      console.log("Rendering subField inside AccordionContent:", subField); // Log each subField in the accordion
                      return (
                        <FormField
                          key={subField.name}
                          control={form.control}
                          name={subField.name}
                          render={({ field: formField }) => (
                            <FormItem>
                              <FormLabel>{subField.label}</FormLabel>
                              <FormControl>
                                {subField.type === "text" && (
                                  <Input
                                    placeholder={subField.placeholder}
                                    {...formField}
                                  />
                                )}
                                {subField.type === "number" &&
                                subField.withButtons ? (
                                  <NumberInputWithButtons
                                    value={formField.value}
                                    onChange={formField.onChange}
                                    min={subField.allowNegative ? undefined : 0}
                                    step={1}
                                    allowNegative={subField.allowNegative}
                                  />
                                ) : subField.type === "number" ? (
                                  <Input
                                    type="number"
                                    placeholder={subField.placeholder}
                                    {...formField}
                                  />
                                ) : null}
                                {subField.type === "checkbox" && (
                                  <Checkbox
                                    checked={formField.value}
                                    onCheckedChange={formField.onChange}
                                  />
                                )}
                                {subField.type === "timeWithTimeZone" && (
                                  <TimeInputWithTimeZone
                                    value={formField.value}
                                    onChange={(time, timeZone) => {
                                      form.setValue(
                                        `${subField.name}_time`,
                                        time
                                      );
                                      form.setValue(
                                        `${subField.name}_timeZone`,
                                        timeZone
                                      );
                                    }}
                                  />
                                )}
                                {subField.type === "date" && (
                                  <Input
                                    type="date"
                                    placeholder={subField.placeholder}
                                    {...formField}
                                  />
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ) : (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === "text" && (
                        <Input placeholder={field.placeholder} {...formField} />
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
                          placeholder={field.placeholder}
                          {...formField}
                        />
                      ) : null}
                      {field.type === "checkbox" && (
                        <Checkbox
                          checked={formField.value}
                          onCheckedChange={formField.onChange}
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
                          placeholder={field.placeholder}
                          {...formField}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
        </Accordion>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;