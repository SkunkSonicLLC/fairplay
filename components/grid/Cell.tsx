import React from 'react';
import { GridPosition } from '../../types/core';

interface CellProps {
  position: GridPosition;
  content: string;
  type: 'kathy' | 'luma';
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ position, content, type, onClick }) => {
  const baseClasses = "p-4 rounded-lg shadow-md transition-all duration-200 cursor-pointer hover:shadow-lg relative min-h-[100px]";
  const typeClasses = type === 'kathy' 
    ? "bg-emerald-50 hover:bg-emerald-100" 
    : "bg-purple-50 hover:bg-purple-100";

  return (
    <div 
      className={`${baseClasses} ${typeClasses}`}
      onClick={onClick}
    >
      <h3 className="text-sm font-medium mb-2 text-gray-700">
        {`${String.fromCharCode(65 + position.row)}${position.col + 1}`}
      </h3>
      <p className="text-xs text-gray-600">{content}</p>
      <div className="absolute bottom-2 right-2 text-xs text-gray-400">
        {type === 'kathy' ? 'K' : 'L'}
      </div>
    </div>
  );
};

export default Cell;
