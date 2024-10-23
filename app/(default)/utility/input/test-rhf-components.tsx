"use client";

import {
  RHFFormDropdownField,
  RHFInputField,
  RHFMultiSelectDropdownField,
  RHFNumberField,
  RHFPasswordField,
} from "@/components";
import { useTranslations } from "next-intl";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const TestRHFComponent = () => {
  const t = useTranslations();
  const methods = useForm({
    defaultValues: {
      fullName: "",
      firstName: "",
      lastName: "",
      password: "",
      price: 0,
      myDropdown: "option1",
      myMultiSelect: ["option1"]
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
    toast("Hello world")
  };
  return (
    <FormProvider {...methods}>
      {t("LANGUAGE")}
      <form onSubmit={methods.handleSubmit(onSubmit)} className="p-6">
        <RHFInputField
          name="fullName"
          label="Full Name"
          required={true}
          infoText="Excepteur sint occaecat cupidata non proident, sunt. Excepteur sint occaecat cupidata non proident, sunt."
          rules={{
            minLength: {
              value: 2,
              message: "Full Name must be at least 2 characters",
            },
            maxLength: {
              value: 50,
              message: "Full Name cannot exceed 50 characters",
            },
          }}
        />

        <RHFInputField
          name="firstName"
          label="First Name"
          required={true}
          infoText="Excepteur sint occaecat cupidata non proident, sunt. Excepteur sint occaecat cupidata non proident, sunt."
          rules={{
            minLength: {
              value: 2,
              message: "First Name must be at least 2 characters",
            },
            maxLength: {
              value: 50,
              message: "First Name cannot exceed 50 characters",
            },
          }}
        />

        <RHFInputField
          name="lasName"
          label="Last Name"
          required={true}
          infoText="Excepteur sint occaecat cupidata non proident, sunt. Excepteur sint occaecat cupidata non proident, sunt. Excepteur sint occaecat cupidata non proident, sunt."
          rules={{
            minLength: {
              value: 2,
              message: "Last Name must be at least 2 characters",
            },
            maxLength: {
              value: 50,
              message: "Last Name cannot exceed 50 characters",
            },
          }}
        />

        <RHFPasswordField
          name="password"
          label="Password"
          required={true}
          infoText="Your password must be at least 8 characters"
          rules={{
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
        />

        <RHFNumberField
          name="price"
          label="Price"
          required={true}
          infoText="Enter the price amount"
          endorsement="$" // Pass JSX for the currency symbol
          rules={{
            min: {
              value: 0,
              message: "Price must be at least $0",
            },
          }}
        />

        <RHFFormDropdownField
          name="myDropdown"
          label="Select an Option"
          options={[
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
          ]}
          required={true} // Field is required
          infoText="This is an info tooltip for the dropdown."
          rules={{ minLength: { value: 1, message: "Select an option" } }}
        />

        <RHFMultiSelectDropdownField
          name="myMultiSelect"
          label="Select Options"
          options={[
            {
              value: "option1",
              label: "Option 1",
            },
            {
              value: "option2",
              label: "Option 2",
            },
            {
              value: "option3",
              label: "Option 3",
            },
          ]}
          required={true}
          infoText="Choose multiple options"
          rules={{
            required: "At least one option is required",
          }}
        />
        <button>Submit</button>
      </form>
    </FormProvider>
  );
};

export default TestRHFComponent;
