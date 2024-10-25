"use client";

import {
  CancelLinkButton,
  DeleteButtonWithConfirmation,
  NormalButton,
  PlusIcon,
  RHFFormDropdownField,
  RHFInputField,
  RHFNumberField,
  RHFPasswordField,
  RHFRadioGroup,
  SubmitButton,
} from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES, ROUTES, USER_TYPES } from "@/constants";
import {
  ADMIN_ADD_USER_URL,
  ADMIN_UPDATE_USER_DATA_URL,
} from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

interface Field {
  _id: string;
  name: string;
  value: string;
}

interface Title {
  _id: string;
  fields: Field[];
}

type UserFormType = {
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  mobile_number: string;
  gender: string;
  country_id: string;
  measurements: Title[];
  height: string;
  weight: string;
};

const UserFormComponent = ({
  countries,
  editData,
  measurementTypeOptions,
}: {
  countries: { value: string; label: string }[];
  editData?: {
    first_name: string;
    middle_name: string;
    last_name: string;
    country_id: string;
    isMeasurementAdded: boolean;
    mobile_number: string;
    email: string;
    gender: string;
    measurements: Title[];
    height: string;
    weight: string;
    _id: string;
  } | null;
  measurementTypeOptions: {
    value: string;
    label: string;
    fields: { name: string; _id: string }[];
  }[];
}) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [showMeasurement, setShowMeasurement] = useState<boolean>(false);
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();
  const methods = useForm<UserFormType>({
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      mobile_number: "",
      country_id: "",
      password: "",
      height: "",
      weight: "",
      gender: "men",
      measurements: [],
    },
  });
  const {
    fields: measurements,
    append: appendTitle,
    remove: removeTitle,
    update: updateTitle,
  } = useFieldArray({
    control: methods.control,
    name: "measurements",
  });

  useEffect(() => {
    if (editData) {
      methods.reset({
        country_id: editData.country_id ?? "",
        email: editData.email ?? "",
        first_name: editData.first_name ?? "",
        middle_name: editData.middle_name ?? "",
        gender: editData.gender ?? "",
        last_name: editData.last_name ?? "",
        mobile_number: editData.mobile_number ?? "",
        height: editData?.height || "",
        weight: editData?.weight || "",
        measurements: (editData?.measurements ?? []).map((title) => {
          const measurementOption = measurementTypeOptions.find(
            (typeOption) => typeOption.value === title._id
          );
          const newFields = title.fields.map((field) => {
            const mField = measurementOption?.fields?.find(
              (mField) => mField._id === field._id
            );
            return {
              _id: mField?._id,
              name: mField?.name,
              value: field.value,
            };
          });
          return {
            _id: title._id,
            fields: newFields,
          };
        }),
      });
      setShowMeasurement(!!editData?.isMeasurementAdded);
    }
  }, [editData]);

  const onSubmit = async (data: UserFormType) => {
    const { password, ...rest } = data;
    try {
      dispatch(setLoadingState(true));
      const registrationResponse = await adminAxiosInstance({
        url: editData ? ADMIN_UPDATE_USER_DATA_URL : ADMIN_ADD_USER_URL,
        method: editData ? "PUT" : "POST",
        data: {
          ...rest,
          ...(editData
            ? { _id: editData?._id }
            : { password, user_type: USER_TYPES.user }),
          isMeasurementAdded: !!rest.measurements.length,
          measurements: JSON.stringify(
            rest.measurements.map((measurement: any) => ({
              _id: measurement?._id,
              fields: measurement?.fields?.map((field: any) => ({
                _id: field?._id,
                value: field?.value ?? "-",
              })),
            }))
          ),
        },
      });
      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || t(MESSAGES.SUCCESS));
        router.replace(`/${ROUTES.admin}/${ROUTES.users}`);
      } else {
        toast.error(
          registrationResponse.data.message || t(MESSAGES.SOMETHING_WENT_WRONG)
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
    } finally {
      dispatch(setLoadingState(false));
    }
  };

  const handleOptionSelect = (option: any) => {
    if (option) {
      const optionValue = measurementTypeOptions.find(
        (typeOption) => typeOption.value === option
      );
      if (optionValue) {
        const measurements = methods.getValues("measurements");
        const titleIndex = measurements.findIndex(
          (value) => value._id === option
        );
        const fields = optionValue.fields.map((field: any) => {
          const fieldValue = measurements?.[titleIndex]?.fields?.find(
            (fld) => fld._id === field._id
          );
          return {
            _id: field._id,
            name: field.name,
            value: fieldValue?.value ?? "-",
          };
        });

        updateTitle(titleIndex, {
          _id: option,
          fields: fields,
        });
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="grid gap-5 md:grid-cols-3">
            <RHFInputField
              name="first_name"
              label={t("COMMON.FIRST_NAME")}
              required
            />
            <RHFInputField name="middle_name" label={t("COMMON.MIDDLE_NAME")} />
            <RHFInputField
              name="last_name"
              label={t("COMMON.LAST_NAME")}
              required
            />
          </div>
          <div
            className={`grid gap-5 md:grid-cols-2 lg:grid-cols-${
              editData ? "2" : "3"
            }`}
          >
            <div className="grid gap-5 md:grid-cols-[120px_auto]">
              <RHFFormDropdownField
                label={t("COMMON.CODE")}
                name="country_id"
                placeholder={t("COMMON.CODE")}
                options={countries}
                isClearable={false}
                required
              />
              <RHFNumberField
                name="mobile_number"
                label={t("COMMON.MOBILE_NUMBER")}
                required
              />
            </div>
            <RHFInputField
              name="email"
              label={t("COMMON.EMAIL_ADDRESS")}
              required
              type="email"
            />
            {!editData && (
              <RHFPasswordField
                label={t("COMMON.PASSWORD")}
                name="password"
                required
                rules={{
                  minLength: {
                    value: 8,
                    message: t("COMMON.PASSWORD_AT_LEAST_EIGHT", {
                      label: t("COMMON.PASSWORD"),
                    }),
                  },
                }}
              />
            )}
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <RHFNumberField
              name="height"
              label={t("COMMON.HEIGHT")}
              endorsement="cm"
            />
            <RHFNumberField
              name="weight"
              label={t("COMMON.WEIGHT")}
              endorsement="kg"
            />
          </div>
          <div>
            <RHFRadioGroup
              name="gender"
              label={t("COMMON.GENDER")}
              options={[
                { value: "men", label: t("COMMON.MEN") },
                { value: "women", label: t("COMMON.WOMEN") },
              ]}
              required
            />
          </div>
          {!showMeasurement && (
            <div className="mb-5.5 flex justify-center">
              <NormalButton
                label={`${t("COMMON.WANT_TO_ADD_MEASUREMENT")}?`}
                disabled={showMeasurement}
                onClick={() => {
                  setShowMeasurement(true);
                  appendTitle({
                    _id: "",
                    fields: [],
                  });
                }}
              />
            </div>
          )}
          {showMeasurement && (
            <div>
              <div className="mt-2 font-semibold">
                {t("COMMON.MEASUREMENT")}
              </div>
              <div className="mb-2">
                <div className="relative">
                  {measurements.map((titleItem, titleIndex: number) => (
                    <fieldset
                      key={titleIndex}
                      className="mb-5.5 w-full border border-dashed px-3 pb-2"
                    >
                      <legend className="font-semibold">
                        <DeleteButtonWithConfirmation
                          deleteId={`${titleIndex}`}
                          handleDelete={(index) =>
                            removeTitle(index as unknown as number)
                          }
                        />
                      </legend>
                      <div className="mb-2">
                        <div className="relative">
                          <RHFFormDropdownField
                            label={t("COMMON.TITLE")}
                            name={`measurements.${titleIndex}._id`}
                            options={measurementTypeOptions}
                            required
                            handleOptionSelect={handleOptionSelect}
                            isClearable={false}
                          />
                          <div className="grid gap-x-3 md:grid-cols-2 xl:grid-cols-3">
                            {measurements?.[titleIndex]?.fields.map(
                              (fieldItem, fieldIndex: number) => (
                                <div
                                  key={`${titleIndex}-${fieldIndex}-${fieldItem._id}`}
                                  className="box-border flex flex-row items-center gap-2"
                                >
                                  <div className="w-full xl:w-1/2">
                                    <RHFInputField
                                      label={t("COMMON.NAME")}
                                      name={`measurements.${titleIndex}.fields.${fieldIndex}.name`}
                                      disableTab
                                      readOnly
                                    />
                                  </div>
                                  <div className="w-full xl:w-1/2">
                                    <RHFInputField
                                      label={t("COMMON.VALUE")}
                                      name={`measurements.${titleIndex}.fields.${fieldIndex}.value`}
                                    />
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  ))}
                  <div className="pt-3 pb-2">
                    <NormalButton
                      label={t("COMMON.ADD_MORE_MEASUREMENTS")}
                      onClick={() =>
                        appendTitle({
                          _id: "",
                          fields: [],
                        })
                      }
                      Icon={PlusIcon}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-2 flex justify-end gap-4">
          <CancelLinkButton
            label="Cancel"
            href={`/${ROUTES.admin}/${ROUTES.users}`}
          />
          <SubmitButton label="Submit" />
        </div>
      </form>
    </FormProvider>
  );
};

export default UserFormComponent;
