import { z } from "zod";

export interface InputProps {
  value: string;
  placeholder: string;
  prefix: React.ReactNode;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type TaskProps<T> = {
  className?: string;
  onSubmit: (data: T) => Promise<void>;
  data: T;
  formData: T;
  error: string | null;
  children: React.ReactNode;
};

export const DutySchema = z.object({
  id: z.string().trim().uuid(),
  name: z.string().trim().min(1),
  is_completed: z.boolean(),
});

export type Duty = z.infer<typeof DutySchema>;
