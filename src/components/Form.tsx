import { useForm } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Children,
  cloneElement,
  HTMLAttributes,
  memo,
  ReactElement,
} from 'react';
import { Field } from './ui/field';

// TODO: Fix all
interface FormProps<T> {
  schema: z.ZodSchema<T>;
  onSubmit: (data: FieldValues) => void;
  buttonProps: Omit<HTMLAttributes<HTMLButtonElement>, 'type' | 'disabled'>;
  children: ReactElement<typeof Field> | ReactElement<typeof Field>[];
}

const Form = <T extends FieldValues>({
  schema,
  onSubmit,
  buttonProps,
  children,
}: FormProps<T>) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<T>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Children.map(children, (child) => {
        return cloneElement(child, {
          register, // TODO: fix type of return register
          errors,
        });
      })}
      <button type="submit" disabled={!isValid} {...buttonProps} />
    </form>
  );
};

export default memo(Form);
