import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FormFieldProps } from './FormComponent';
import FormComponent from './FormComponent'; // Assuming FormComponent renders individual fields

type FormFieldsBlockProps = {
  title: string;
  description: string;
  fields: FormFieldProps[];
  form: any; // Assuming useForm hook instance is passed
};

const FormFieldsBlock: React.FC<FormFieldsBlockProps> = ({ title, description, fields, form }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>{title}</AccordionTrigger>
        <AccordionContent>
          <p className="mb-4">{description}</p>
          <FormComponent form={form} fields={fields} onSubmit={() => {}} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FormFieldsBlock;