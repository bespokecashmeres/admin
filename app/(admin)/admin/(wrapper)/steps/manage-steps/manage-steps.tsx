"use client";

import {
  ModalWrapper,
  NormalButton,
  PlusIcon,
  VariableLengthTabs
} from "@/components";
import adminAxiosInstance from "@/config/adminAxiosInstance";
import { MESSAGES } from "@/constants";
import {
  STEP_TYPE_GET_URL,
  STEP_TYPE_STATUS_URL
} from "@/constants/apis";
import { setLoadingState } from "@/framework/redux/reducers";
import { DropDownOptionType } from "@/types";
import { initializeLocalizedObject } from "@/utils/common.utils";
import { useTranslations } from "next-intl";
import {
  ChangeEvent,
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import AddModal, { EditStepFormType } from "./add-modal";
import StepListComponent from "./step-list-component";

const ManageSteps: FC<{
  stepTypes: DropDownOptionType[];
  productTypes: DropDownOptionType[];
}> = ({ stepTypes = [], productTypes = [] }) => {
  const t = useTranslations();
  const dispatch = useDispatch();
  const [steps, setSteps] = useState<DropDownOptionType[]>([]);
  const [activeStep, setActiveStep] = useState<string>("");
  const [modalState, setModalState] = useState({
    isOpen: false,
    editStep: null as EditStepFormType | null,
  });

  useEffect(() => {
    setSteps(stepTypes);
    setActiveStep(`${stepTypes?.at(0)?.value}`);
  }, [stepTypes]);

  const toggleModal = useCallback(
    (isOpen: boolean, editStep: EditStepFormType | null = null) => {
      setModalState({ isOpen, editStep });
    },
    []
  );

  const handleAddSuccess = useCallback((newStep: DropDownOptionType) => {
    toggleModal(false);
    setSteps((prev) => {
      const newPrev = [...prev];
      const existingIndex = newPrev.findIndex(
        (step) => step.value === newStep.value
      );

      if (existingIndex !== -1) {
        newPrev[existingIndex] = {
          ...newPrev[existingIndex],
          value: newStep.value,
          label: newStep.label,
          status: newStep.status,
        };
      } else {
        newPrev.push(newStep);
      }

      return newPrev;
    });
  }, []);

  const handleStepChange = useCallback((selected: string) => {
    setActiveStep(selected);
  }, []);

  const handleStepDelete = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      try {
        dispatch(setLoadingState(true));
        const checked = event.target.checked;
        const stepResponse = await adminAxiosInstance({
          url: STEP_TYPE_STATUS_URL,
          method: "PATCH",
          data: { _id: event.target.id, status: checked },
        });
        if (stepResponse.data.success) {
          setSteps((prev) =>
            prev.map((step) =>
              step.value === event.target.id
                ? { ...step, status: checked }
                : step
            )
          );
        } else {
          toast.error(
            stepResponse.data.message || t(MESSAGES.SOMETHING_WENT_WRONG)
          );
        }
      } catch (error) {
        console.error(error);
        toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
      } finally {
        dispatch(setLoadingState(false));
      }
    },
    []
  );

  const handleEditClick: MouseEventHandler<SVGSVGElement> = useCallback(
    async (event) => {
      try {
        dispatch(setLoadingState(true));
        const stepResponse = await adminAxiosInstance({
          url: `${STEP_TYPE_GET_URL}/${event.currentTarget.id}`,
          method: "GET",
        });
        if (stepResponse.data.success) {
          const result = stepResponse.data.data;
          const defaultName = initializeLocalizedObject(result.name);
          const defaultInfo = initializeLocalizedObject(result.info);
          toggleModal(true, {
            name: defaultName,
            info: defaultInfo,
            productTypeId: result.productTypeId,
            _id: result._id,
          });
        } else {
          toast.error(
            stepResponse.data.message || t(MESSAGES.SOMETHING_WENT_WRONG)
          );
        }
      } catch (error) {
        console.error(error);
        toast.error(t(MESSAGES.SOMETHING_WENT_WRONG));
      } finally {
        dispatch(setLoadingState(false));
      }
    },
    [steps]
  );

  const handleOpen = useCallback(() => {
    toggleModal(true);
  }, []);

  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
          {t("STEP_TYPE.TITLE")} ✨
        </h1>
      </div>
      <div className="flex items-start gap-5">
        <VariableLengthTabs
          active={activeStep}
          handleChange={handleStepChange}
          tabs={steps}
          handleDelete={handleStepDelete}
          handleEdit={handleEditClick}
        />
        <NormalButton
          label={t("COMMON.ADD")}
          Icon={PlusIcon}
          onClick={handleOpen}
          className="mt-0"
        />
      </div>
      <div className="mt-5">
        {activeStep && <StepListComponent activeStep={activeStep} />}
      </div>
      {modalState.isOpen && (
        <ModalWrapper
          isOpen={modalState.isOpen}
          toggleModal={toggleModal}
          title={t(
            `STEP_TYPE.${modalState.editStep ? "EDIT_STEP" : "ADD_NEW_STEP"}`
          )}
        >
          <AddModal
            toggleModal={toggleModal}
            handleAddSuccess={handleAddSuccess}
            productTypes={productTypes}
            editStep={modalState.editStep}
          />
        </ModalWrapper>
      )}
    </>
  );
};

export default ManageSteps;
