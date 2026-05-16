import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { MdOutlineSwitchAccessShortcut } from "react-icons/md";

export default function Sidebar({
  variables,
  insertVariable,
}: {
  variables: { name: string; value: string; desc: string }[];
  insertVariable: (varName: string) => void;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <>
      {/* Sidebar */}

      {sidebarOpen ? (
        <div className="w-auto resize-x mt-16 border-r overflow-y-auto bg-email-sidebar-light dark:bg-email-sidebar-dark border-email-border-light dark:border-email-border-dark">
          <div className="p-3 border-b border-email-border-light dark:border-email-border-dark">
            <div className="text-xs font-semibold uppercase tracking-wide email-text-secondary mb-2">
              Variables
            </div>
            <div className="text-xs email-text-secondary">
              Click to insert into editor
            </div>
          </div>

          <div className="p-2">
            {variables.map((v, i) => (
              <button
                key={i}
                onClick={() => insertVariable(v.name)}
                className="
                w-full text-left px-2 py-2 mb-1 rounded text-sm
                email-hover transition-colors
              ">
                <div className="font-mono text-sm text-[#4EC9B0]">
                  {"{{"}
                  {v.name}
                  {"}}"}
                </div>
                <div className="text-xs mt-1 email-text-secondary">
                  {v.desc}
                </div>
                <div className="text-xs mt-1 email-text-secondary">
                  {v.value ? `- e.g. ${v.value}` : ""}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="
        w-15 mt-16 border-r overflow-y-auto
        bg-email-sidebar-light dark:bg-email-sidebar-dark
        border-email-border-light dark:border-email-border-dark
      ">
          <div
            className="
          p-3 border-b
          border-email-border-light dark:border-email-border-dark
        ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="
                  cursor-pointer font-semibold uppercase tracking-wide
                  email-text-secondary flex
                ">
                    <MdOutlineSwitchAccessShortcut />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-slate p-2 text-xs text-white">
                  Template Variables
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      )}

      {/* Toggle Sidebar */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="
        fixed left-0 top-10 z-40 p-1 rounded-r border
        bg-email-sidebar-light dark:bg-email-sidebar-dark
        border-email-border-light dark:border-email-border-dark
      ">
        <ChevronRight
          size={16}
          className={cn(
            "email-text transition-transform",
            sidebarOpen && "rotate-180",
          )}
        />
      </button>
    </>
  );
}
