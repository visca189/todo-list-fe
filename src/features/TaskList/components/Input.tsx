import { InputProps } from "../types";

function Input(props: InputProps) {
  const { prefix: PrefixIcon, ...otherProps } = props;
  return (
    <>
      {PrefixIcon}
      <input data-type="text-input" type="text" name="name" {...otherProps} />
    </>
  );
}

export { Input };
