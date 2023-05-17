interface ButtonProps {
  label: string;
}

export const Button = ({ label }: ButtonProps) => {
  return (
    <button
      type="submit"
      className="w-full rounded-md bg-blue-600 py-3 px-4 text-center font-medium text-white hover:bg-blue-700"
    >
      {label}
    </button>
  );
};
