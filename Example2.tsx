import React from "react";
import { useForm } from "react-hook-form";
import FormComponent from "./FormComponent";

const ExampleFormCTY = () => {
  const form = useForm();

  const groupedFields = [
    {
      title: "Index Launch Setup",
      description: "Fill out your index details below.",
      fields: [
        {
          name: "email",
          label: "Email",
          type: "text",
          placeholder: "john.doe@example.com",
        },
        {
          name: "description",
          label: "Description",
          type: "text",
          placeholder: "Enter a description",
        },
      ],
    },
    {
      title: "Calendar Setup",
      description: "Set up your calendar details below.",
      fields: [
        {
          name: "startDate",
          label: "Start Date",
          type: "date",
        },
        {
          name: "endDate",
          label: "End Date",
          type: "date",
        },
      ],
    },
  ];

  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="container mx-auto">
      <FormComponent
        cardTitle="Main Form Title"
        cardDescription="Main Form Description"
        form={form}
        fields={groupedFields}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ExampleFormCTY;