import { useEffect, useRef } from "react";

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};
const NoteInput = ({ value, onChange, placeholder, onBlur }: Props) => {
  const inputRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (inputRef.current && value) {
      inputRef.current.innerText = value;
    }
  }, []);
  return (
    <>
      <div
        ref={inputRef}
        contentEditable
        role="textbox"
        aria-label="take a note..."
        className={`outline-none p-2`}
        defaultValue={value}
        onBlur={onBlur}
        onInput={(e) => {
          const newContent = e.currentTarget.innerText;
          if (e.currentTarget && onChange) {
            onChange(newContent);
          }
        }}
      ></div>
      {value && value == "" && (
        <div className={`top-0 absolute p-3 -z-10 text-gray-400`}>
          {placeholder || "Add a note..."}
        </div>
      )}
    </>
  );
};

export default NoteInput;
