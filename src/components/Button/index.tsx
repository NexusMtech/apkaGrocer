import { Button } from "@mui/material";

const buttonStyles: Record<"primary" | "secondary" | "tertiary", object> = {
  primary: {
    backgroundColor: "#1976D2",
    color: "#FFF",
    "&:hover": { backgroundColor: "#1565C0" },
  },
  secondary: {
    backgroundColor: "#9C27B0",
    color: "#FFF",
    "&:hover": { backgroundColor: "#7B1FA2" },
  },
  tertiary: {
    backgroundColor: "transparent",
    color: "#1976D2",
    border: "1px solid #1976D2",
    "&:hover": { backgroundColor: "#E3F2FD" },
  },
};

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary"; // Define allowed values
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}

const PrimarySecondaryTertiaryButton: React.FC<ButtonProps> = ({ 
  variant = "primary", 
  children, 
  onClick, 
  fullWidth = false 
}) => {
  return (
    <Button sx={buttonStyles[variant]} onClick={onClick} fullWidth={fullWidth}>
      {children}
    </Button>
  );
};

export default PrimarySecondaryTertiaryButton;
