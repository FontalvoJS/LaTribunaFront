import { useLaTribunaAuthFormContext } from "@/app/assets/context/auth";
import { ModalProps } from "@/app/assets/types/types";
import { useEffect, useRef, useCallback } from "react";

export default function CustomModal({ children }: ModalProps): JSX.Element {
  const { showModalForm, handleCloseModalForm } = useLaTribunaAuthFormContext();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleEsc = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseModalForm();
    }
  }, [handleCloseModalForm]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleCloseModalForm();
    }
  }, [handleCloseModalForm]);

  useEffect(() => {
    if (showModalForm) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModalForm, handleEsc, handleClickOutside]);

  if (!showModalForm) {
    return <></>;
  }

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content" ref={modalRef}>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
