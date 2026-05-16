import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailInputChipsProps {
  value?: string; // comma-separated string
  onChange?: (value: string) => void; // returns comma-separated string
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  truncate?: boolean;
}

const EmailInputChips = React.forwardRef<
  HTMLInputElement,
  EmailInputChipsProps
>(
  (
    { value = '', onChange, placeholder, className, disabled, truncate },
    ref
  ) => {
    const [chips, setChips] = React.useState(
      value
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
    );
    const [inputValue, setInputValue] = React.useState('');

    React.useEffect(() => {
      const parsed = value
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean);
      setChips(parsed);
    }, [value]);

    const updateChips = (newChips: string[]) => {
      setChips(newChips);
      onChange?.(newChips.join(','));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        const email = inputValue.trim();
        if (email && !chips.includes(email)) {
          updateChips([...chips, email]);
          setInputValue('');
        }
      }
    };

    const handleRemoveChip = (email: string) => {
      updateChips(chips.filter((e) => e !== email));
    };

    const handleBlur = () => {
      const trimmed = inputValue.trim();
      if (trimmed && !chips.includes(trimmed)) {
        const updated = [...chips, trimmed];
        updateChips(updated);
        setInputValue('');
      }
    };

    return (
      <div
        className={cn('flex w-full flex-col rounded-md border p-1', className)}
      >
        <div className="flex flex-wrap gap-2">
          {chips.map((email, index) => {
            const displayEmail =
              truncate && email.length > 20
                ? email.slice(0, 10) + '...' + email.slice(-7) // 👈 truncation rule
                : email;

            return (
              <div
                key={index}
                className="flex items-center rounded-md bg-muted px-2 py-1 text-sm"
                title={email}
              >
                {displayEmail}
                <button
                  type="button"
                  onClick={() => handleRemoveChip(email)}
                  className="ml-1 text-destructive opacity-75 hover:opacity-100"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
          <input
            ref={ref}
            type="text"
            disabled={disabled}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            onBlur={handleBlur}
            className="min-w-[100px] flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
    );
  }
);

// EmailInputChips.displayName = 'EmailInputChips';

export { EmailInputChips };
