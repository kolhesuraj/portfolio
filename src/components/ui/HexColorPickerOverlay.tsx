import { useEffect, useRef, useState } from "react";

type HexRange = {
  color: string;
  start: number;
  end: number;
};

const HEX_REGEX = /#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})/g;

function getHexAtCursor(text: string, cursor: number): HexRange | null {
  let match;
  while ((match = HEX_REGEX.exec(text))) {
    const start = match.index;
    const end = start + match[0].length;
    if (cursor >= start && cursor <= end) {
      return { color: match[0], start, end };
    }
  }
  return null;
}

function getCaretCoordinates(el: HTMLTextAreaElement, pos: number) {
  const div = document.createElement("div");
  const style = window.getComputedStyle(el);

  for (const prop of style) {
    div.style[prop] = style[prop];
  }

  div.style.position = "absolute";
  div.style.visibility = "hidden";
  div.style.whiteSpace = "pre-wrap";
  div.style.wordWrap = "break-word";
  div.style.width = el.offsetWidth + "px";

  div.textContent = el.value.substring(0, pos);

  const span = document.createElement("span");
  span.textContent = el.value.substring(pos) || ".";
  div.appendChild(span);

  document.body.appendChild(div);
  const rect = span.getBoundingClientRect();
  document.body.removeChild(div);

  return { top: rect.top + window.scrollY, left: rect.left + window.scrollX };
}

type Props = {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  value: string;
  onChange: (value: string) => void;
};

export default function HexColorPickerOverlay({
  textareaRef,
  value,
  onChange,
}: Props) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const activeRange = useRef<HexRange | null>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const openPicker = () => {
      const cursor = textarea.selectionStart;
      const match = getHexAtCursor(value, cursor);
      if (!match) return;

      activeRange.current = match;
      setActiveColor(match.color);
      const caretPos = getCaretCoordinates(textarea, cursor);
      setPos({ top: caretPos.top + 20, left: caretPos.left });
    };

    textarea.addEventListener("dblclick", openPicker);
    return () => textarea.removeEventListener("dblclick", openPicker);
  }, [textareaRef, value]);

  if (!pos || !activeColor) return null;

  return (
    <input
      type="color"
      autoFocus
      className="fixed z-50 w-8 h-8 p-0 border rounded shadow"
      style={{ top: pos.top, left: pos.left }}
      defaultValue={activeColor}
      onChange={(e) => {
        const { start, end } = activeRange.current!;
        onChange(value.slice(0, start) + e.target.value + value.slice(end));
      }}
      onBlur={() => setPos(null)}
    />
  );
}
