const LoadingSpinner = () => {
  return (
    <div className=" flex items-center justify-center bg-gray-900 bg-opacity-60 z-50">
      <svg
        className="w-20 h-20 animate-spin text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle
          cx="50"
          cy="50"
          fill="blue"
          stroke="blue"
          strokeWidth="8"
          r="35"
          strokeDasharray="164.93361431346415 56.97787143782138"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
