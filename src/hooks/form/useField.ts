import { useForm } from './useForm';

export const useField = (form: ReturnType<typeof useForm>, name: string) => {
  return {
    value: form.values[name],
    error: form.touched[name] ? form.errors[name] : null,
    onChangeText: (text: string) => form.setFieldValue(name, text),
    onBlur: () => form.setFieldTouched(name),
  };
};
