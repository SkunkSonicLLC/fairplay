// import React, { useState } from 'react';

interface CollaborationToolsProps {
  collaborators: string[];
  onInvite: (email: string) => void;
  onRemove?: (userId: string) => void;
}

const CollaborationTools: React.FC<CollaborationToolsProps> = ({ 
  collaborators, 
  onInvite, 
  onRemove 
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleInvite = () => {
    if (!email) {
      setError('Please enter an email address');
      return;
    }
    
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    onInvite(email);
    setEmail('');
  };

  return (
    <div className="border-t mt-6 pt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Collaboration Tools
      </h3>
      
      <div className="space-y-4">
        <div className="flex space-x-4">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="Enter collaborator's email"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            onClick={handleInvite}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Invite
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        {collaborators.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Current Collaborators
            </h4>
            <div className="flex flex-wrap gap-2">
              {collaborators.map((userId) => (
                <span
                  key={userId}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {userId}
                  {onRemove && (
                    <button
                      onClick={() => onRemove(userId)}
                      className="ml-1.5 text-indigo-600 hover:text-indigo-800 focus:outline-none"
                    >
                      ×
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="text-sm text-gray-500">
          <p>Each collaborator can:</p>
          <ul className="list-disc list-inside mt-1">
            <li>Add new verses</li>
            <li>Edit their own verses</li>
            <li>Leave comments</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CollaborationTools;
