import { z } from "zod";

export const TaskDataSchema = z.object({
  id: z.string().trim().min(1),
  name: z.string().trim().min(1),
  is_completed: z.boolean(),
});

export type TaskData = z.infer<typeof TaskDataSchema>;

export interface InputProps {
  value: string;
  placeholder: string;
  prefix: React.ReactNode;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type TaskProps = {
  className?: string;
  onSubmit: (data: TaskData) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  data: TaskData;
  inputProps: Omit<InputProps, "onChange" | "value">;
};

export const DutySchema = z.object({
  id: z.string().trim().uuid(),
  name: z.string().trim().min(1),
  is_completed: z.boolean(),
});

export type Duty = z.infer<typeof DutySchema>;
