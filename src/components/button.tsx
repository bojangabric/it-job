import { Spinner } from './spinner';

interface ButtonProps {
  label: string;
  loading: boolean;
}

export const Button = ({ label, loading }: ButtonProps) => {
  return (
    <button
      type="submit"
      className="w-full rounded-md bg-blue-600 py-3 px-4 text-center font-medium text-white hover:bg-blue-700"
      disabled={loading}
    >
      {loading ? <Spinner className="mx-auto !h-6 stroke-[#93bfec]" /> : label}
    </button>
  );
};
