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
      {loading ? (
        <svg className="spinner mx-auto !h-6" viewBox="0 0 50 50">
          <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="5"
          ></circle>
        </svg>
      ) : (
        label
      )}
    </button>
  );
};
