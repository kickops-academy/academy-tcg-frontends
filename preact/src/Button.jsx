const Button = ({ label, icon, onClick }) => {
  return (
    <button
      onClick={onClick}
    >
      {label} {icon}
    </button>
  );
};

export default Button;
