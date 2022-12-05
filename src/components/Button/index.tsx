interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function Button({ text, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="block w-full bg-green-500 hover:bg-green-600 shadow-3xl py-2 rounded-2xl text-white font-semibold mt-4"
    >
      {text}
    </button>
  );
}
