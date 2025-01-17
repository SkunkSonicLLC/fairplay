// src/components/grid/Grid.tsx
import React from 'react';
import Cell from './Cell';
import { GridPosition } from '../../types/core';
import { moduleManager } from '../../lib/moduleManager';

interface GridProps {
  systemType: 'kathy' | 'luma';
  onCellClick: (position: GridPosition) => void;
}

const Grid: React.FC<GridProps> = ({ systemType, onCellClick }) => {
  const module = moduleManager.getModule(systemType);
  const gridSize = systemType === 'kathy' ? 4 : 5;

  const renderGrid = () => {
    const cells = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const position = { row, col };
        const cellData = module?.getCellContent(position);
        cells.push(
          <Cell
            key={`${row}-${col}`}
            position={position}
            content={cellData?.content || ''}
            type={systemType}
            onClick={() => onCellClick(position)}
          />
        );
      }
    }
    return cells;
  };

  return (
    <div 
      className="grid gap-4 p-4"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
      }}
    >
      {renderGrid()}
    </div>
  );
};

export default Grid;

// src/components/grid/Cell.tsx
import React from 'react';
import { GridPosition } from '../../types/core';

interface CellProps {
  position: GridPosition;
  content: string;
  type: 'kathy' | 'luma';
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ position, content, type, onClick }) => {
  const baseClasses = "p-4 rounded-lg shadow-md transition-all duration-200 cursor-pointer hover:shadow-lg";
  const typeClasses = type === 'kathy' 
    ? "bg-emerald-50 hover:bg-emerald-100" 
    : "bg-purple-50 hover:bg-purple-100";

  return (
    <div 
      className={`${baseClasses} ${typeClasses}`}
      onClick={onClick}
    >
      <h3 className="text-sm font-medium mb-1">
        {`${String.fromCharCode(65 + position.row)}${position.col + 1}`}
      </h3>
      <p className="text-xs">{content}</p>
    </div>
  );
};

export default Cell;

// src/components/grid/GridControls.tsx
import React from 'react';

interface GridControlsProps {
  onReset: () => void;
  onSave: () => void;
  onExport?: () => void;
}

const GridControls: React.FC<GridControlsProps> = ({ 
  onReset, 
  onSave, 
  onExport 
}) => {
  return (
    <div className="flex justify-end space-x-4 mb-4">
      <button
        onClick={onReset}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Reset Grid
      </button>
      <button
        onClick={onSave}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        Save Progress
      </button>
      {onExport && (
        <button
          onClick={onExport}
          className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50"
        >
          Export
        </button>
      )}
    </div>
  );
};

export default GridControls;
