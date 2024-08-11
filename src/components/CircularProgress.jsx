const CircularProgress = ({ progress, size }) => {
  const center = size / 2;
  const strokeWidth = size / 10; // Dynamic strokeWidth based on size
  const fontSize = size / 3.5; // Dynamic fontSize based on size
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const getProgressColor = (percentage) => {
    if (percentage < 40) return "#e53e3e";
    if (percentage < 60) return "#dd6b20";
    if (percentage < 70) return "#d69e2e";
    return "#38a169";
  };

  const progressColor = getProgressColor(progress);

  return (
    <svg width={size} height={size}>
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#e2e8f0"
        strokeWidth={strokeWidth}
        fill="#111"
      />
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={progressColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - (progress / 100) * circumference}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.35s" }}
      />
      <text
        x={center}
        y={center}
        textAnchor="middle"
        dy="0.3em"
        fontSize={`${fontSize}px`} // Dynamic fontSize based on size
        fill={progressColor}
      >
        {progress}%
      </text>
    </svg>
  );
};

export default CircularProgress;
