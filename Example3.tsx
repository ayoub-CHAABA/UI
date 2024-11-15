import React from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import FormComponent from "./FormComponent";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // Assuming this is from ShadCN

type FormValues = {
  email: string;
  description: string;
  startDate: Date;
  endDate: Date;
  [key: string]: any;
};

// Define grouped fields with example structure
const groupedFields = [
  {
    title: "Index Launch Setup",
    description: "Fill out your index details below.",
    fields: [
      { name: "email", label: "Email", type: "text", placeholder: "john.doe@example.com" },
      { name: "description", label: "Description", type: "textarea", placeholder: "Enter description here" },
    ],
  },
  {
    title: "Calendar Setup",
    description: "Fill out your calendar details below.",
    fields: [
      { name: "startDate", label: "Start Date", type: "date" },
      { name: "endDate", label: "End Date", type: "date" },
    ],
  },
];

const ExampleForm: React.FC = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const handleSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div className="container mx-auto p-4">
      <FormProvider {...form}>
        <FormComponent
          cardTitle="Main Form Title"
          cardDescription="Main Form Description"
          form={form}
          fields={groupedFields}
          onSubmit={handleSubmit}
        />
      </FormProvider>
    </div>
  );
};

export default ExampleForm;