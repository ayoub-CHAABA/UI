import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import CustomFormField from "./CustomFormField";

type FormFieldBlockProps = {
  title: string;
  description: string;
  fields: any[];
  form: any; // Instance of `react-hook-form`
};

const FormFieldBlock: React.FC<FormFieldBlockProps> = ({
  title,
  description,
  fields,
  form,
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`accordion-${title}`}>
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <p className="mb-4">{description}</p>
          <div className="space-y-4">
            {fields.map((field) => (
              <CustomFormField
                key={field.name}
                {...field}
                formField={form.control.register(field.name)}
                setValue={form.setValue}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FormFieldBlock;