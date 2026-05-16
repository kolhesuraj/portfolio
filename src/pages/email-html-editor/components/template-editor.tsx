import { cn } from "@/lib/utils";
import { Code } from "lucide-react";
import { useRef, useState } from "react";

export default function TemplateEditor({
  html,
  setHtml,
  subject,
  setSubject,
  variables,
}: {
  html: string;
  setHtml: (html: string) => void;
  subject: string;
  variables: { name: string; value: string; desc: string }[];
  setSubject: (subject: string) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [cursorPos, setCursorPos] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<
    { name: string; desc?: string }[]
  >([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const htmlTags = [
    "div",
    "span",
    "p",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "a",
    "img",
    "ul",
    "ol",
    "li",
    "table",
    "tr",
    "td",
    "th",
    "strong",
    "em",
    "br",
    "hr",
    "button",
    "input",
    "form",
  ];

  const handleTextChange = (e, isSubject) => {
    const value = e.target.value;
    const pos = e.target.selectionStart;

    if (isSubject) {
      setSubject(value);
    } else {
      setHtml(value);
      setCursorPos(pos);

      const textBeforeCursor = value.substring(0, pos);
      const lastOpenBracket = textBeforeCursor.lastIndexOf("{{");
      const lastCloseBracket = textBeforeCursor.lastIndexOf("}}");

      if (lastOpenBracket > lastCloseBracket) {
        const searchTerm = textBeforeCursor
          .substring(lastOpenBracket + 2)
          .toLowerCase();
        const filtered = variables.filter((v) =>
          v.name.toLowerCase().includes(searchTerm),
        );
        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
        setActiveSuggestionIndex(0);
      } else {
        const lastOpenTag = textBeforeCursor.lastIndexOf("<");
        const lastCloseTag = textBeforeCursor.lastIndexOf(">");

        if (
          lastOpenTag > lastCloseTag &&
          textBeforeCursor[lastOpenTag + 1] !== "/"
        ) {
          const searchTerm = textBeforeCursor
            .substring(lastOpenTag + 1)
            .toLowerCase();
          const filtered = htmlTags.filter(
            (tag) => tag.startsWith(searchTerm) && searchTerm.length > 0,
          );
          setSuggestions(
            filtered.map((tag) => ({ name: tag, value: "", desc: "HTML tag" })),
          );
          setShowSuggestions(filtered.length > 0);
          setActiveSuggestionIndex(0);
        } else {
          setShowSuggestions(false);
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" || e.key === "Tab") {
      if (suggestions.length > 0) {
        e.preventDefault();
        insertSuggestion(suggestions[activeSuggestionIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const insertSuggestion = (suggestion) => {
    const textBeforeCursor = html.substring(0, cursorPos);
    const textAfterCursor = html.substring(cursorPos);

    let newText = "";
    let newCursorPos = cursorPos;

    const lastOpenBracket = textBeforeCursor.lastIndexOf("{{");
    const lastOpenTag = textBeforeCursor.lastIndexOf("<");
    const lastCloseTag = textBeforeCursor.lastIndexOf(">");

    if (lastOpenBracket > -1 && lastOpenBracket > lastOpenTag) {
      newText =
        textBeforeCursor.substring(0, lastOpenBracket) +
        "{{" +
        suggestion.name +
        "}}" +
        textAfterCursor;
      newCursorPos = lastOpenBracket + suggestion.name.length + 4;
    } else if (lastOpenTag > lastCloseTag) {
      const beforeTag = textBeforeCursor.substring(0, lastOpenTag + 1);
      newText =
        beforeTag +
        suggestion.name +
        ">" +
        "</" +
        suggestion.name +
        ">" +
        textAfterCursor;
      newCursorPos = beforeTag.length + suggestion.name.length + 1;
    }

    setHtml(newText);
    setShowSuggestions(false);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = newCursorPos;
        textareaRef.current.selectionEnd = newCursorPos;
        textareaRef.current.focus();
      }
    }, 0);
  };

  const lineCount = html.split("\n").length;
  return (
    <div className="flex-1 flex flex-col email-bg email-text h-full overflow-hidden">
      {/* Tab Bar */}
      <div
        className="
      flex items-center border-b
      bg-email-sidebar-light dark:bg-email-sidebar-dark
      border-email-border-light dark:border-email-border-dark
    ">
        <div
          className="
        px-4 py-2 text-sm flex items-center space-x-2 border-r
        email-text
        border-email-border-light dark:border-email-border-dark
      ">
          <Code size={14} />
          <span>email-template.html</span>
        </div>
      </div>

      {/* Subject Line */}
      <div
        className="
      p-4 border-b
      border-email-border-light dark:border-email-border-dark
    ">
        <label
          className="
        block text-xs font-semibold uppercase tracking-wide mb-2
        email-text-secondary
      ">
          Subject Line
        </label>

        <input
          type="text"
          value={subject}
          onChange={(e) => handleTextChange(e, true)}
          placeholder="Enter email subject..."
          className="w-full px-3 py-2 rounded text-sm border email-input focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/50
        "
        />
      </div>

      {/* Editor */}
      <div className="flex-1 flex">
        {/* Line Numbers */}
        <div className="w-12 py-4 text-right pr-4 select-none border-r bg-email-sidebar-light dark:bg-email-sidebar-dark border-email-border-light dark:border-email-border-dark">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="text-xs leading-6 email-text-secondary">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Editor */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={html}
            onChange={(e) => handleTextChange(e, false)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            style={{ tabSize: 2 }}
            className="w-full h-full p-4 font-mono text-sm leading-6 resize-none focus:outline-none email-editor"
          />

          {/* Autocomplete Suggestions */}
          {showSuggestions && (
            <div
              style={{ top: "60px", left: "0" }}
              className="
              absolute mt-1 ml-4 z-10 max-h-64 overflow-y-auto rounded shadow-lg border
              email-suggestion
            ">
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  onClick={() => insertSuggestion(s)}
                  className={cn(
                    "px-3 py-2 cursor-pointer text-sm",
                    i === activeSuggestionIndex
                      ? "bg-email-active-light dark:bg-email-active-dark"
                      : "email-hover",
                  )}>
                  <div className="font-mono font-semibold text-[#4EC9B0]">
                    {s.name}
                  </div>

                  {s.desc && (
                    <div className="text-xs mt-0.5 email-text-secondary">
                      {s.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-6 px-4 mb-1 flex items-center justify-between text-xs border-t border-email-border-light dark:border-email-border-dark text-white">
        <div className="flex items-center space-x-4">
          <span>HTML</span>
          <span>UTF-8</span>
          <span>
            Ln {html.substring(0, cursorPos).split("\n").length}, Col{" "}
            {cursorPos - html.substring(0, cursorPos).lastIndexOf("\n")}
          </span>
        </div>
        <div>{html.length} chars</div>
      </div>
    </div>
  );
}
