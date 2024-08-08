import { useEffect, useRef, useState } from "react";
import isEqual from "lodash.isequal";
import { TaskProps } from "../types";
import { useDetectBlur } from "../useDetectBlur";

function Task<T>(props: TaskProps<T>) {
  const { className = "", data, formData, onSubmit, error, children } = props;

  // detect component blur
  const formRef: React.RefObject<HTMLFormElement> = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const { isBlur } = useDetectBlur(formRef, isEditing);

  useEffect(() => {
    if (isBlur) {
      if (!isEqual(data, formData)) {
        onSubmit(formData);
      }
      setIsEditing(false);
    }
  }, [isBlur]);

  return (
    <>
      <form
        ref={formRef}
        className={`task-form${error ? " error" : ""}${
          className ? ` ${className}` : ""
        }`}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
        onClick={() => setIsEditing(true)}
      >
        {children}
        <input type="submit" hidden />
      </form>
      {error ? <p className="error-message">{error}</p> : <></>}
    </>
  );
}

export { Task };
