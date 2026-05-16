import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MultiInputChipsProps {
  value?: string | string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const MultiInputChips = React.forwardRef<
  HTMLInputElement,
  MultiInputChipsProps
>(({ value = '', onChange, placeholder, className, disabled }, ref) => {
  const parsedValue = Array.isArray(value)
    ? value
    : value
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean);
  const [chips, setChips] = React.useState<string[]>(parsedValue);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    setChips(
      Array.isArray(value)
        ? value
        : value
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean)
    );
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const newValue = inputValue.trim();
      if (newValue && !chips.includes(newValue)) {
        const updatedChips = [...chips, newValue];
        setChips(updatedChips);
        setInputValue('');
        onChange?.(updatedChips);
      }
    }
  };

  const handleRemoveChip = (chip: string) => {
    const updatedChips = chips.filter((c) => c !== chip);
    setChips(updatedChips);
    onChange?.(updatedChips);
  };

  return (
    <div
      className={cn('flex w-full flex-col rounded-md border  p-1', className)}
    >
      <div className="flex flex-wrap gap-2 rounded-md shadow-sm">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="flex items-center rounded-md bg-muted px-2 py-1 text-sm"
          >
            {chip}
            <button
              onClick={() => handleRemoveChip(chip)}
              className="ml-1 text-destructive opacity-75 hover:opacity-100"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <input
          type="text"
          ref={ref}
          className={cn(
            'min-w-[100px] flex-1  bg-transparent px-2 py-1 text-sm outline-none',
            'placeholder:text-muted-foreground'
          )}
          disabled={disabled}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
});

MultiInputChips.displayName = 'MultiInputChips';

export { MultiInputChips };
