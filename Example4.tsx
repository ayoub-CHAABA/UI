import React from "react";
import { useForm } from "react-hook-form";
import FormComponent from "./FormComponent";

const ExampleForm: React.FC = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      description: "",
      age: 0,
      startDate: "",
      endDate: "",
    },
  });

  const handleSubmit = (data: any) => {
    console.log("Form Submitted:", data);
  };

  const fields = [
    {
      title: "",
      description: "",
      fields: [
        { name: "email", label: "Email", type: "text", placeholder: "Enter email" },
        { name: "description", label: "Description", type: "text", placeholder: "Enter description" },
      ],
    },
    {
      title: " Setup",
      description: "Fill out your  details below",
      fields: [
        { name: "startDate", label: "Start Date", type: "date" },
        { name: "endDate", label: "End Date", type: "date" },
      ],
    },
    { name: "age", label: "Age", type: "number", withButtons: true },
  ];

  return (
    <FormComponent
      form={form}
      fields={fields}
      cardTitle="Main Form Title"
      cardDescription="Fill out the form below"
      onSubmit={form.handleSubmit(handleSubmit)}
    />
  );
};

export default ExampleForm;