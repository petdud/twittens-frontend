
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonShape = 'rounded' | 'circular' | 'square';
export type ButtonAppearance = 'secondary' | 'primary' | 'outline';

interface IButtonProps {
  content: string | React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size: ButtonSize;
  as?: "button" | "a";
  appearance?: ButtonAppearance;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'before' | 'after';
  shape?: ButtonShape;
}

// component in progress
export const Button = ({
  as = "button",
  appearance = "secondary",
  iconPosition = "before",
  disabled = false,
  shape = "rounded",
  content, 
  onClick,
  size = "medium",
}: IButtonProps) => {
  return (
    <button onClick={onClick}>
      {content}
    </button>
  )
}
