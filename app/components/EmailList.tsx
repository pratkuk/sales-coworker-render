'use client';

interface Email {
  id: string;
  subject: string;
  from: string;
  time: string;
}

interface EmailListProps {
  emails: Email[];
  onSelect: (email: Email) => void;
  selectedId?: string;
}

export function EmailList({ emails, onSelect, selectedId }: EmailListProps) {
  return (
    <div>
      <h1 className="text-4xl mb-8">Sales Inbox</h1>
      <div className="space-y-4">
        {emails.map((email) => (
          <div 
            key={email.id}
            onClick={() => onSelect(email)}
            className={`cursor-pointer ${selectedId === email.id ? 'bg-gray-100' : ''}`}
          >
            <div className="font-medium text-lg">{email.subject}</div>
            <div>From: {email.from}</div>
            <div>{email.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}