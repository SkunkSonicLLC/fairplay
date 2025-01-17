import { SystemModule, GridPosition, CellData, ModuleConfig } from '../types/core';

export abstract class BaseModule implements SystemModule {
  id: string;
  name: string;
  version: string;
  cells: CellData[];
  protected config: ModuleConfig;

  constructor(id: string, name: string, version: string, config: ModuleConfig) {
    this.id = id;
    this.name = name;
    this.version = version;
    this.cells = [];
    this.config = config;
  }

  abstract initialize(): Promise<void>;

  getCellContent(position: GridPosition): CellData | null {
    return this.cells.find(
      cell => 
        cell.position.row === position.row && 
        cell.position.col === position.col
    ) || null;
  }

  abstract processCellInteraction(position: GridPosition, action: string): Promise<void>;

  protected validatePosition(position: GridPosition): boolean {
    return (
      position.row >= 0 && 
      position.row < this.config.gridSize && 
      position.col >= 0 && 
      position.col < this.config.gridSize
    );
  }

  protected async loadCellData(): Promise<void> {
    // Implement cell data loading logic
    throw new Error('loadCellData must be implemented by child class');
  }

  protected async saveCellData(): Promise<void> {
    // Implement cell data saving logic
    throw new Error('saveCellData must be implemented by child class');
  }

  protected getModuleMetrics(): Record<string, any> {
    return {
      totalCells: this.cells.length,
      gridSize: this.config.gridSize,
      maxVerses: this.config.maxVerses,
      features: this.config.features,
    };
  }
}
