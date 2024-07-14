import { Input, InputProps } from '@mui/joy';
import { useDebouncedCallback } from 'use-debounce';

type SearchInputProps = Omit<InputProps, 'onChange'> & {
  onChange: (value?: string) => void;
  debounceTime?: number;
};

export const SearchInput = (props: SearchInputProps) => {
  const {
    onChange,
    debounceTime = 500,
    // value,
    // defaultValue,
    ...otherProps
  } = props;

  const handleOnChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    debounceTime
  );

  return <Input {...otherProps} onChange={handleOnChange} size="sm" />;
};
