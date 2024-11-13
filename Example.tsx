// ExampleForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import FormComponent from './FormComponent';
import { Button } from "@/components/ui/button";
import Card from './Card';
import OutputForm from './OutputForm';

const ExampleForm: React.FC = () => {
  const form = useForm();
  const [formData, setFormData] = React.useState<any>(null);

  const handleSubmit = (data: any) => {
    setFormData(data);
    console.log("Form submitted:", data);
  };

  // Define grouped fields
  const groupedFields = [
    {
      title: "Props",
      description: "Enter details",
      fields: [
        { name: 'email', label: 'Email', type: 'text', placeholder: 'Enter your email' },
        { name: 'description', label: 'Description', type: 'text', placeholder: 'Enter description' },
        { name: 'jsonData', label: 'JSON Data', type: 'text', placeholder: '{}' },
      ],
    },
    {
      title: "Calendar Setup",
      description: "Set up your calendar dates and time zones",
      fields: [
        { name: 'startDate', label: 'Start Date', type: 'date', placeholder: 'Pick start date' },
        { name: 'endDate', label: 'End Date', type: 'date', placeholder: 'Pick end date' },
        { name: 'timezone', label: 'Time Zone', type: 'timeWithTimeZone' },
      ],
    },
    {
      title: "Advanced Settings",
      description: "Additional settings for advanced users",
      fields: [
        { name: 'log', label: 'Log', type: 'number', placeholder: 'Enter log value', withButtons: true, allowNegative: true },
      ],
    },
  ];

  return (
    <Card title="Main Form Title" description="This form is for submitting your data with various field groupings.">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {groupedFields.map((group, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{group.title}</h2>
            <p className="text-sm mb-4">{group.description}</p>
            <FormComponent form={form} fields={group.fields} />
          </div>
        ))}

        <div className="flex justify-center mt-8">
          <Button type="submit" className="btn-primary">
            Submit
          </Button>
        </div>
      </form>

      {formData && (
        <OutputForm
          data={formData}
          displayOptions={['table', 'json', 'html']}
          downloadOptions={['csv', 'excel', 'pdf']}
        />
      )}
    </Card>
  );
};

export default ExampleForm;