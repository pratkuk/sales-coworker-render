'use client';

interface WidgetProps {
  activeApp: string;
  selectedItem?: any;
  suggestions: string[];
}

export function SalesWidget({ activeApp, selectedItem, suggestions }: WidgetProps) {
  return (
    <div className="fixed right-4 top-20 w-80">
      <div className="bg-white p-4 rounded shadow">
        <div className="mb-4">
          <h2 className="font-medium">Sales Assistant ({activeApp})</h2>
          <div className="inline-block border p-1">
            <span className="text-lg">⤢</span>
          </div>
        </div>
        
        <div>
          <h3>Suggested actions:</h3>
          <div className="space-y-2 mt-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="block w-full text-left border rounded px-3 py-2 hover:bg-gray-50"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}