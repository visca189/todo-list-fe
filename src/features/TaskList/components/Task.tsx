import { useCallback, useEffect, useRef, useState } from "react";
import { TaskData, TaskProps } from "../types";
import { useDetectBlur } from "../useDetectBlur";
import isEqual from "lodash.isequal";
import { Input } from "./Input";

function Task(props: TaskProps) {
  const { data, error, onSubmit } = props;
  const [formData, setFormData] = useState(data);

  // detect component blur
  const formRef: React.RefObject<HTMLFormElement> = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const { isBlur } = useDetectBlur(formRef, isEditing);

  const handleSubmit = useCallback(
    (newData: TaskData) => {
      try {
        onSubmit(newData);

        // Clear up
        if (!newData.id) {
          setFormData(data);
        }
      } catch (err) {
        //TODO: error handling
        console.error(err);
      }
    },
    [data, onSubmit]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isBlur) {
      if (!isEqual(data, formData)) {
        handleSubmit(formData);
      }
      setIsEditing(false);
    }
  }, [isBlur, handleSubmit, formData, data]);

  return (
    <>
      <form
        ref={formRef}
        className={`task-form${error ? " error" : ""}`}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(formData);
        }}
        onClick={() => setIsEditing(true)}
      >
        <Input
          {...props.inputProps}
          value={formData.name}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <input type="submit" hidden />
      </form>
      {error ? <p className="error-message">{error}</p> : <></>}
    </>
  );
}

export { Task };
