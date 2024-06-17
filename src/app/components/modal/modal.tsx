"use client";
import Modal from "react-bootstrap/Modal";
import { ReactNode } from "react";
import { useLaTribunaAuthFormContext } from "@/app/context/authForm";
interface ModalProps {
  children: ReactNode;
}
export default function CustomModal ({ children }: ModalProps): JSX.Element {
  const { showModalForm, handleCloseModalForm } = useLaTribunaAuthFormContext();
  return (
    <>
      <Modal show={showModalForm} onHide={handleCloseModalForm}>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
}
