import { useCallback, useRef, useState } from 'react';

type Validator = (value: string) => string | null;

type FieldConfig = {
  value: string;
  validators?: Validator[];
};

export const useForm = (initialFields: Record<string, FieldConfig>) => {
  const fieldsRef = useRef(initialFields);

  const [values, setValues] = useState(
    Object.fromEntries(
      Object.entries(initialFields).map(([k, v]) => [k, v.value]),
    ),
  );

  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback((name: string, value: string) => {
    const validators = fieldsRef.current[name]?.validators || [];

    for (let rule of validators) {
      const err = rule(value);
      if (err) return err;
    }
    return null;
  }, []);

  const setFieldValue = (name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const err = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: err }));
    }
  };

  const setFieldTouched = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));

    const err = validateField(name, values[name]);
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const validateAll = () => {
    let newErrors: Record<string, string | null> = {};
    let newTouched: Record<string, boolean> = {};

    Object.keys(values).forEach(name => {
      newErrors[name] = validateField(name, values[name]);
      newTouched[name] = true;
    });

    setErrors(newErrors);
    setTouched(newTouched);

    return Object.values(newErrors).every(e => !e);
  };

  const handleSubmit = (onValid: (vals: typeof values) => void) => {
    if (validateAll()) {
      onValid(values);
    }
  };

  const resetForm = () => {
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    resetForm,
  };
};
