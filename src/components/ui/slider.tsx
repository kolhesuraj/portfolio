import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  variant?: 'primary' | 'ternary';
}

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, variant = 'primary', ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={`relative h-1.5 w-full grow overflow-hidden rounded-full ${variant === 'ternary' ? 'bg-ternary/20' : 'bg-primary/20'}`}
    >
      <SliderPrimitive.Range
        className={`absolute h-full ${variant === 'ternary' ? 'bg-ternary' : 'bg-primary'}`}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={`block h-4 w-4 rounded-full border ${variant === 'ternary' ? 'border-ternary/50' : 'border-primary/50'} bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50`}
    />
  </SliderPrimitive.Root>
));

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
