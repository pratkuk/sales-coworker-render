// HubspotView.tsx
export const HubspotView = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Deals</h1>
    <div className="border rounded">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4">Deal Name</th>
            <th className="text-left p-4">Amount</th>
            <th className="text-left p-4">Stage</th>
            <th className="text-left p-4">Owner</th>
            <th className="text-left p-4">Last Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-4">
              <div>Acme Corp</div>
              <div className="text-sm text-gray-500">Technical Review</div>
            </td>
            <td className="p-4">$50,000</td>
            <td className="p-4">Proposal</td>
            <td className="p-4">Unassigned</td>
            <td className="p-4">2024-12-05</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// ClariView.tsx
export const ClariView = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Pipeline Forecast</h1>
    <div className="bg-white p-6 rounded border">
      <div className="space-y-4">
        <div className="flex justify-between border-b pb-4">
          <span>Current Quarter Pipeline</span>
          <span className="font-bold">$1,245,000</span>
        </div>
        <div className="flex justify-between border-b pb-4">
          <span>Forecast</span>
          <span className="font-bold">$890,000</span>
        </div>
      </div>
    </div>
  </div>
);

// DealhubView.tsx
export const DealhubView = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Quotes & Proposals</h1>
    <div className="bg-white p-6 rounded border">
      <div className="space-y-4">
        <div className="border-b pb-4">
          <div className="font-bold">Acme Corp - Enterprise Package</div>
          <div className="text-sm text-gray-500">Last modified: Dec 5, 2024</div>
        </div>
      </div>
    </div>
  </div>
);

// GmailView.tsx
export const GmailView = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Sales Inbox</h1>
    <div className="bg-white rounded border">
      <div className="border-b p-4">
        <div className="font-bold">RE: Technical Review Meeting</div>
        <div className="text-sm text-gray-500">From: john@acme.com</div>
      </div>
    </div>
  </div>
);