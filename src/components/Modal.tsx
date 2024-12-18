import React from 'react';

interface ModalProps {
  onClose: () => void; // Function to close the modal
  children: React.ReactNode; // The content to display inside the modal
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export { Modal };
