import { Path, UseFormRegister } from "react-hook-form";
import { LoginFormValues } from "../../pages";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<LoginFormValues>;
  register?: UseFormRegister<LoginFormValues>;
  handleButton: boolean;
}

export function InputLogin({
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
          : `pl-4 w-full outline-none border-2 focus:border-green-500 py-2 rounded-2xl rounded-tr-none rounded-br-none mt-3`
      }`}
    />
  );
}
