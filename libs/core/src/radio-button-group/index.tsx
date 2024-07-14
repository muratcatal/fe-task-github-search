import { RadioButtonValue } from '@intenseye/fe-task-constants';
import { Radio, RadioGroup } from '@mui/joy';
import { RadioButtonWrapper } from './styled';

type RadioButtonGroupProps<T> = {
  items: readonly RadioButtonValue<T>[];
  onChange: (value: T) => void;
  value: string;
};

export const RadioButtonGroup = <T,>({
  items,
  onChange,
  value,
}: RadioButtonGroupProps<T>) => {
  return (
    <RadioButtonWrapper>
      <RadioGroup
        orientation="horizontal"
        name="language"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          const selectedValue = items.find(
            (item) => item.value === event.target.value
          )?.value;
          onChange(selectedValue as T);
        }}
        sx={{
          padding: '4px',
          borderRadius: '8px',
          bgcolor: 'neutral.softBg',
          '--RadioGroup-gap': '4px',
          '--Radio-actionRadius': '8px',
        }}
      >
        {items.map(({ label, value }) => (
          <Radio
            size="md"
            key={label}
            color="neutral"
            value={value}
            disableIcon
            label={label}
            variant="plain"
            sx={{
              px: 2,
              alignItems: 'center',
            }}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  ...(checked && {
                    bgcolor: 'background.surface',
                    boxShadow: 'sm',
                    '&:hover': {
                      bgcolor: 'background.surface',
                    },
                  }),
                },
              }),
            }}
          />
        ))}
      </RadioGroup>
    </RadioButtonWrapper>
  );
};
