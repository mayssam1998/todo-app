import { XIcon } from "lucide-react";
type ModalProps = {
  children: React.ReactNode;
  open: boolean;
  closeModel: () => void;
};

const Modal = (props: ModalProps) => {
  const { open, closeModel, children } = props;
  if (!open) {
    return;
  }
  return (
    <div className="w-full h-full z-50 fixed max-h-screen overflow-hidden  top-0 left-0 flex items-center justify-center p-3">
      <div
        onClick={closeModel}
        className="absolute z-10 h-8 w-8 border-2 top-2 md:top-10 right-3 rounded-full cursor-pointer text-white border-red-500 bg-red-500 flex items-center justify-center"
      >
        <XIcon />
      </div>
      <div
        onClick={closeModel}
        className="absolute w-full h-full top-0 left-0 bg-gray-600/50 cursor-pointer"
      ></div>
      <div className="border z-10 m-2 bg-light shadow-xl rounded-lg w-full md:w-[700px] mx-auto overflow-y-auto max-h-[600px]">
        {children}
      </div>
    </div>
  );
};

export default Modal;
