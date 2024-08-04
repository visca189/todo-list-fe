import { z } from "zod";

export const TaskDataSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
});

export type TaskData = z.infer<typeof TaskDataSchema>;

export interface InputProps {
  value: string;
  placeholder: string;
  prefix: React.ReactNode;
  autoFocus?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type TaskProps = {
  onSubmit: (data: TaskData) => void;
  error: string | null;
  data: TaskData;
  inputProps: Omit<InputProps, "onChange" | "value">;
};

export interface Duty {
  id: string;
  name: string;
}
