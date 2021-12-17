import { useImageModal } from "@app/hooks/useImageModal";
import React, { FC } from "react";
import {
  InstructionProps,
  Step,
  DoubleItemClipboardCopy,
} from "@wizardComponents";
import * as Images from "@app/images/google";
import { Modal, ModalVariant } from "@patternfly/react-core";
import { LongArrowAltUpIcon } from "@patternfly/react-icons";

interface Props {}

export const Step5: FC<Props> = () => {
  const [isModalOpen, modalImageSrc, { onImageClick }, setIsModalOpen] =
    useImageModal();

  const instructions: InstructionProps[] = [
    {
      component: (
        <>
          <div className="pf-u-mb-md">
            Provide the following Attribute Mappings and select "Finish"
          </div>
          <DoubleItemClipboardCopy
            leftValue="Primary email"
            rightValue="email"
          />
          <DoubleItemClipboardCopy
            leftValue="First name"
            rightValue="firstName"
          />
          <DoubleItemClipboardCopy
            leftValue="Last name"
            rightValue="lastName"
          />
        </>
      ),
    },
    {
      component: (
        <img
          src={Images.GoogleSaml5}
          alt="Step 5.1"
          className="step-image"
          onClick={() => onImageClick(Images.GoogleSaml5)}
        />
      ),
    },
  ];

  return (
    <>
      <Modal
        aria-label="Image"
        variant={ModalVariant.large}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <img src={modalImageSrc} alt="Step Image" />
      </Modal>
      <Step
        title="Step 5: Configure Attribute Mapping"
        instructionList={instructions}
      />
    </>
  );
};
