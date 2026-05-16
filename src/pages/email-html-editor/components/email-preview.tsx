import { Eye } from "lucide-react";

export default function EmailPreview({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) {
  return (
    <>
      {/* Preview Panel - Gmail Style */}
      <div className="w-auto resize-x flex flex-col bg-email-preview-light dark:bg-email-preview-dark h-full ">
        {/* Header */}
        <div className="px-4 py-3 flex items-center space-x-2 dark:border-email-border-dark">
          <Eye size={16} className="email-text" />
          <span className="text-sm font-semibold email-text">Preview</span>
        </div>

        {/* Gmail Email Header */}
        <div className="p-4 border-b border-email-border-light dark:border-email-border-dark">
          <div className="text-lg font-normal mb-3 email-text border-b border-email-border-light dark:border-email-border-dark pb-2">
            {subject}
          </div>

          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mr-3 bg-blue-500">
              YC
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm email-text">
                    Your Company
                  </div>
                  <div className="text-xs email-text-secondary">to me</div>
                </div>
                <div className="text-xs email-text-secondary">now</div>
              </div>
            </div>
          </div>
        </div>

        {/* Email Body */}
        <div className="flex-1 overflow-y-auto p-4 bg-white text-black">
          <div
            className="email-body-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </>
  );
}
