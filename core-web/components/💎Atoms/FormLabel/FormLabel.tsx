export interface FormLabelInterface {
  text: string;
  className?: string;
  id: string;
}
[];

const FormLabel: React.FC<FormLabelInterface> = ({ text, className, id }) => {
  return (
    <label className={`form-label ${className ? className : ''}`} htmlFor={id}>
      {text}
    </label>
  );
};

export default FormLabel;
