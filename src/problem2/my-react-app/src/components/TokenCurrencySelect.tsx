import { Select, MenuItem } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

export interface TokenCurrencyOption {
  currency: string;
  price: number;
  image: string;
}

export interface TokenCurrencySelectProps {
  value: string;
  options: TokenCurrencyOption[];
  disabledValue?: string;

  onChange(value: string): void;
}

export default function TokenCurrencySelect(props: TokenCurrencySelectProps) {
  const { value, options, disabledValue, onChange } = props;

  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)} fullWidth>
      {options.map((option) => (
        <MenuItem
          key={uuidv4()}
          value={option.currency}
          disabled={option.currency === disabledValue}
        >
          <img
            src={option.image}
            alt={option.currency}
            style={{
              width: "20px",
              height: "20px",
              marginRight: "5px",
            }}
          />
          {option.currency}
        </MenuItem>
      ))}
    </Select>
  );
}
