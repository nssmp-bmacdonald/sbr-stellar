export interface FormFieldInterface {
  type: 'text' | 'password';
  className?: string;
  id: string;
  ref: any;
}
[];

const FormField: React.FC<FormFieldInterface> = ({
  type,
  className,
  id,
  ref,
}) => {
  return (
    <input
      ref={ref}
      onChange={() => ref.current?.classList.remove('is-invalid')}
      required
      type={type}
      className={`form-control ${className ? className : ''}`}
      id={id}
    />
  );
};

export default FormField;
