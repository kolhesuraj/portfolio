import { useState, useRef, useEffect } from "react";
import { Sun, Moon, Code } from "lucide-react";

import EmailPreview from "./components/email-preview";
import TemplateEditor from "./components/template-editor";
import Sidebar from "./components/sidebar";

export default function EmailEditor() {
  const [html, setHtml] =
    useState(`<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #1a73e8;">Hello {{firstName}}!</h2>
  <p>Thank you for your purchase of <strong>{{productName}}</strong>.</p>
  <p>Your order #{{orderId}} will be delivered to {{email}}.</p>
  <div style="background: #949292; padding: 15px; border-radius: 8px; margin: 20px 0;">
    <p style="margin: 0;">Total: <strong>{{totalAmount}}</strong></p>
  </div>
  <a href="#" style="display: inline-block; background: #1a73e8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Track Order</a>
</div>`);

  const [subject, setSubject] = useState(
    "Your order #{{orderId}} has been confirmed!",
  );

  const containerRef = useRef<HTMLDivElement>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  // Initial widths in pixels
  const [sidebarWidth, setSidebarWidth] = useState(250); // px
  const [previewWidth, setPreviewWidth] = useState(384); // 24rem = 384px

  const dragState = useRef<{
    type: "sidebar" | "preview";
    startX: number;
    startWidth: number;
  } | null>(null);

  // Mouse move handler
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragState.current) return;

    const dx = e.clientX - dragState.current.startX;

    if (dragState.current.type === "sidebar") {
      const newWidth = dragState.current.startWidth + dx;
      if (newWidth > 64 && newWidth < 300) setSidebarWidth(newWidth);
    } else if (dragState.current.type === "preview") {
      const newWidth = dragState.current.startWidth - dx;
      if (newWidth > 200 && newWidth < 1000) setPreviewWidth(newWidth);
    }
  };

  // Mouse up handler
  const handleMouseUp = () => {
    dragState.current = null;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const startDrag = (type: "sidebar" | "preview", e: React.MouseEvent) => {
    dragState.current = {
      type,
      startX: e.clientX,
      startWidth: type === "sidebar" ? sidebarWidth : previewWidth,
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const [darkMode, setDarkMode] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("theme") || "true") ?? false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const variables = [
    { name: "firstName", value: "John", desc: "Customer first name" },
    { name: "lastName", value: "Doe", desc: "Customer last name" },
    { name: "email", value: "john@example.com", desc: "Customer email" },
    { name: "orderId", value: "12345", desc: "Order ID" },
    { name: "productName", value: "Wireless Headphones", desc: "Product name" },
    { name: "totalAmount", value: "$99.99", desc: "Total amount" },
    { name: "companyName", value: "Your Company", desc: "Company name" },
  ];

  const processHTML = (htmlStr, subjectStr) => {
    const processed = { html: htmlStr, subject: subjectStr };
    variables.forEach((v) => {
      const regex = new RegExp("{{" + v.name + "}}", "g");
      processed.html = processed.html.replace(regex, v.value);
      processed.subject = processed.subject.replace(regex, v.value);
    });
    return processed;
  };

  const insertVariable = (varName) => {
    const pos = textareaRef.current
      ? textareaRef.current.selectionStart
      : html.length;
    const newHtml =
      html.substring(0, pos) + "{{" + varName + "}}" + html.substring(pos);
    setHtml(newHtml);
    setTimeout(() => {
      if (textareaRef.current) {
        const newPos = pos + varName.length + 4;
        textareaRef.current.selectionStart = newPos;
        textareaRef.current.selectionEnd = newPos;
        textareaRef.current.focus();
      }
    }, 0);
  };

  const processed = processHTML(html, subject);

  return (
    <>
      <div
        ref={containerRef}
        className="h-screen email-bg dark:email-bg-dark email-text hidden lg:flex">
        {/* Top Bar */}
        <div className="fixed top-0 left-0 right-0 h-9 z-50 flex items-center px-2 border-b border-email-border-light dark:border-email-border-dark">
          <div className="flex items-center space-x-2">
            <Code size={16} className="text-blue-500" />
            <span className="text-xs font-medium text-white">Email Editor</span>
          </div>

          <div className="flex-1" />

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded hover:bg-white/10 transition-colors">
            {darkMode ? (
              <Sun size={16} className="text-gray-300" />
            ) : (
              <Moon size={16} className="text-gray-800" />
            )}
          </button>
        </div>

        {/* Sidebar */}
        <div
          style={{ width: sidebarWidth }}
          className=" flex-shrink-0 transition-all duration-10">
          <Sidebar variables={variables} insertVariable={insertVariable} />
        </div>

        {/* Drag handle for Sidebar */}
        <div
          onMouseDown={(e) => startDrag("sidebar", e)}
          className="w-1 cursor-col-resize email-bg border-l email-border z-10"
        />

        {/* Editor */}
        <div className="flex-1 overflow-auto transition-all duration-10">
          <TemplateEditor
            html={html}
            setHtml={setHtml}
            subject={subject}
            setSubject={setSubject}
            variables={variables}
          />
        </div>

        {/* Drag handle for Preview */}
        <div
          onMouseDown={(e) => startDrag("preview", e)}
          className="w-1 cursor-col-resize email-bg  border-l email-border z-10"
        />

        {/* Preview */}
        <div
          style={{ width: previewWidth }}
          className="flex-shrink-0 transition-all duration-10">
          <EmailPreview subject={processed.subject} html={processed.html} />
        </div>
      </div>
      <div className="lg:hidden flex flex-col items-center justify-center h-screen w-full bg-gray-50 dark:bg-gray-900 text-center px-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-blue-500 mb-4 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12h6m-3-3v6m9-9v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Email Editor is Desktop Only
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          To use the full-featured email editor, please switch to a desktop or a
          larger screen.
        </p>
      </div>
    </>
  );
}
