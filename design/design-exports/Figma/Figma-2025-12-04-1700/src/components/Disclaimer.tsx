import { AlertTriangle } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="bg-yellow-50 border-t-4 border-yellow-400 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-yellow-900 mb-3">
              Important Disclaimer
            </h3>
            <div className="space-y-2 text-yellow-800">
              <p>
                This Q&A assistant provides <strong>objective information and educational content only</strong>. 
                It does not provide investment advice, recommendations, or suggestions to buy or sell securities.
              </p>
              <p>
                All information is for reference purposes. Users should conduct their own research and 
                consult with licensed financial advisors before making any investment decisions.
              </p>
              <p>
                Market data and regulatory information may change. Always verify critical information 
                with official sources such as HKEX and the SFC.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
