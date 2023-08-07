export const Spinner = ({ className = '' }) => {
  return (
    <svg className={`${className} spinner stroke-current`} viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      ></circle>
    </svg>
  );
};
