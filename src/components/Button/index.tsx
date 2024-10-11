"use client";

interface ButtonProps {
  children: string | JSX.Element;
  disabled?: boolean | undefined;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button
      className={`h-[46px] text-[16px] text-[#FFF] bg-[#5067E5] 
                  px-[24px] rounded-[8px] ${disabled ? "opacity-[0.5]" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
