import { useCallback, useState } from "react";

export class Errors extends Map {
  get object() {
    return Array.from(this.keys()).reduce(
      (acc, key) => {
        if (this.get(key)) {
          return {
            ...acc,
            [key]: this.get(key) || "",
          };
        }

        return acc;
      },
      {},
    );
  }

  merge(values) {
    const newErrors = {
      ...this.object,
      ...values,
    };
    const entries = Object.entries(newErrors);

    const errors = new Errors();
    entries.forEach((entry) => {
      const [key, value] = entry;
      if (value) {
        errors.set(key, value);
      }
    });

    return errors;
  }
}

export const useForm = ({ initialValues, validate, onSubmit }) => {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState(
    new Errors(),
  );

  const handleSubmit = useCallback(() => {
    const errors = new Errors();
    const result = validate(form, {
      errors,
    });

    setErrors(result);
    const isValid = result.size === 0;
    if (!isValid) {
      return;
    }

    onSubmit(form, { errors: result, setErrors });
  }, [form, onSubmit, validate, setErrors]);

  const change = useCallback(
    (values) => setForm({ ...form, ...values }),
    [form, setForm],
  );

  const reset = () => setForm(initialValues);

  return {
    form,
    reset,
    errors,
    change,
    setForm,
    submit: handleSubmit,
  };
};
