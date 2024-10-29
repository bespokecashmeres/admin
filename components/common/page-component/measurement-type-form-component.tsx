"use client";

import {
  CancelLinkButton,
  CreateLinkButton,
  DeleteButtonWithConfirmation,
  RHFInputField,
  SubmitButton,
} from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES, ROUTES } from "@/constants";
import {
  MEASUREMENT_TYPE_ADD_URL,
  MEASUREMENT_TYPE_UPDATE_URL,
} from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import DragDropButton from "../buttons/drag-drop-button";

interface Field {
  name: string;
  _id?: string;
}

type FormDataType = {
  name: string;
  fields: Field[];
};

const ItemType = "FieldItem";

const DraggableField = ({ index, moveField, removeField, t }: any) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: { index: number }) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveField(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`box-border flex flex-row items-center gap-2 ${
        isDragging ? "opacity-50" : ""
      }`}
      style={{ cursor: "move" }}
    >
      <div className="h-full">
        <div className="mt-[26px]">
          <DragDropButton />
        </div>
      </div>
      <div className="w-full">
        <RHFInputField
          label={t("COMMON.NAME")}
          name={`fields.${index}.name`}
          required
        />
      </div>
      <div className="h-full">
        <div className="mt-[26px]">
          <DeleteButtonWithConfirmation
            deleteId={index}
            handleDelete={removeField}
          />
        </div>
      </div>
    </div>
  );
};

const MeasurementTypeFormComponent = ({ editData }: { editData?: any }) => {
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const t = useTranslations();
  const dispatch = useDispatch();
  const router = useRouter();
  const methods = useForm<FormDataType>({
    defaultValues: {
      name: "",
      fields: [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control: methods.control,
    name: "fields",
    rules: {
      required: t("COMMON.REQUIRED_MESSAGE", { label: t("COMMON.FIELDS") }),
    },
  });

  useEffect(() => {
    if (editData) {
      methods.reset({
        name: editData?.name ?? "",
        fields: editData?.fields ?? [],
      });
    }
  }, [editData]);

  const onSubmit = async (data: FormDataType) => {
    try {
      setDisableSubmit(true);
      dispatch(setLoadingState(true));
      const registrationResponse = await adminAxiosInstance({
        url: editData ? MEASUREMENT_TYPE_UPDATE_URL : MEASUREMENT_TYPE_ADD_URL,
        method: editData ? "PUT" : "POST",
        data: {
          ...data,
          _id: editData?._id,
          fields: JSON.stringify(data.fields),
        },
      });
      if (registrationResponse.data.success) {
        toast.success(registrationResponse.data.message || t(MESSAGES.SUCCESS));
        router.replace(
          `/${ROUTES.admin}/${ROUTES.users}/${ROUTES.measurementType}`
        );
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
      setDisableSubmit(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <DndProvider backend={HTML5Backend}>
          <div className="space-y-4">
            <div className="w-full">
              <RHFInputField name="name" label={t("COMMON.NAME")} required />
            </div>
            <div className="w-full">
              <div className="relative">
                <fieldset className="mb-5.5 w-full border-2 border-dashed border-gray-300 dark:border-gray-600 px-3 py-2">
                  <legend className="p-2 font-semibold">
                    {t("COMMON.FIELDS")}
                  </legend>
                  <div className="mb-2">
                    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                      {fields.map((fieldItem, index) => (
                        <DraggableField
                          key={fieldItem.id}
                          index={index}
                          moveField={move}
                          removeField={remove}
                          t={t}
                        />
                      ))}
                    </div>
                    <CreateLinkButton
                      label={t("COMMON.ADD_MORE_FIELDS")}
                      onClick={() => append({ name: "" })}
                    />
                  </div>
                </fieldset>
              </div>
              {methods.formState.errors.fields?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {methods.formState.errors.fields?.message}
                </p>
              )}
            </div>
          </div>
        </DndProvider>
        <div className="mt-6 flex justify-end gap-4">
          <CancelLinkButton
            label={t("COMMON.CANCEL")}
            href={`/${ROUTES.admin}/${ROUTES.users}/${ROUTES.measurementType}`}
          />
          <SubmitButton label={t("COMMON.SUBMIT")} disabled={disableSubmit} />
        </div>
      </form>
    </FormProvider>
  );
};

export default MeasurementTypeFormComponent;
