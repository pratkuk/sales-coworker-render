'use client';

export const Walkthrough = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-xl w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Welcome to Sales Assistant!</h2>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-600">
            This tool helps you manage your sales workflow effectively. Here is how it works:
          </p>
          
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 mt-1">1</div>
              <p>Use the app switcher at the top to navigate between different sales tools</p>
            </div>
            
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 mt-1">2</div>
              <p>Click on any item to select it and see contextual AI suggestions</p>
            </div>
            
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 mt-1">3</div>
              <p>Use the AI Assistant widget to get help with your current task</p>
            </div>
          </div>
        </div>

        <button
          onClick={onComplete}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Ok, lets go!
        </button>
      </div>
    </div>
  );
};