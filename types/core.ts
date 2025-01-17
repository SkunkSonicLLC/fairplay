export type GridPosition = {
  row: number;
  col: number;
};

export type CellData = {
  id: string;
  position: GridPosition;
  content: string;
  type: 'kathy' | 'luma';
  metadata?: Record<string, any>;
};

export type SystemModule = {
  id: string;
  name: string;
  version: string;
  cells: CellData[];
  initialize: () => Promise<void>;
  getCellContent: (position: GridPosition) => CellData | null;
  processCellInteraction: (position: GridPosition, action: string) => Promise<void>;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  timestamp?: number;
  metadata?: Record<string, any>;
};

export type UserProgress = {
  userId: string;
  completedCells: string[];
  achievements: Achievement[];
  score: number;
  lastActivity: number;
};

export type ModuleConfig = {
  gridSize: number;
  maxVerses: number;
  features: string[];
};
