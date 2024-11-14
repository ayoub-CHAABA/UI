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
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"; // Assuming Card components from ShadCN

// Types for individual fields and field blocks
type FormFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type: "text" | "select" | "number" | "checkbox" | "timeWithTimeZone" | "date";
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
};

const FormComponent: React.FC<FormProps> = ({ form, fields, cardTitle, cardDescription }) => {
  return (
    <Card className="w-full p-6 shadow-lg rounded-md">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.map((field, index) =>
            "fields" in field ? (
              // Render grouped fields inside an accordion for FormFieldsBlock
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger>{field.title}</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">{field.description}</p>
                    <div className="space-y-4">
                      {field.fields.map((subField) => (
                        <FormField
                          key={subField.name}
                          control={form.control}
                          name={subField.name}
                          render={({ field: formField }) => (
                            <FormItem>
                              <FormLabel>{subField.label}</FormLabel>
                              <FormControl>
                                {subField.type === "text" && (
                                  <Input placeholder={subField.placeholder} {...formField} />
                                )}
                                {subField.type === "number" && subField.withButtons ? (
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
                                      form.setValue(`${subField.name}_time`, time);
                                      form.setValue(`${subField.name}_timeZone`, timeZone);
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
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              // Render individual fields if it's not a grouped field
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
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FormComponent;