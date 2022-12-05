import { Path, UseFormRegister } from "react-hook-form";
import { SignUpFormValues } from "../../pages/signup";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<SignUpFormValues>;
  handleButton: boolean;
  register?: UseFormRegister<SignUpFormValues>;
}

export function InputSignUp({
  name,
  register,
  handleButton,
  ...props
}: InputProps) {
  return (
    <input
      name={name}
      {...(register && register(name))}
      {...props}
      className={`${
        !handleButton
          ? `pl-4 w-84 outline-none border-2 focus:border-green-500 py-2 rounded-2xl`
          : `pl-4 w-72 outline-none border-2 focus:border-green-500 py-2 rounded-2xl rounded-tr-none rounded-br-none mt-3`
      }`}
    />
  );
}
