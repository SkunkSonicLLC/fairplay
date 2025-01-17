// LumaSystem.tsx
export type LumaElement = 'light' | 'shadow' | 'motion' | 'stillness' | 'transformation';

export interface LumaCell {
    id: string;
    row: number;
    col: number;
    element: LumaElement;
    text: string;
    isActive: boolean;
}

export class LumaSystem {
    private grid: LumaCell[][];
    private static instance: LumaSystem;

    private constructor() {
        this.grid = this.initializeGrid();
    }

    public static getInstance(): LumaSystem {
        if (!LumaSystem.instance) {
            LumaSystem.instance = new LumaSystem();
        }
        return LumaSystem.instance;
    }

    private initializeGrid(): LumaCell[][] {
        const grid: LumaCell[][] = [];
        const elements: LumaElement[] = ['light', 'shadow', 'motion', 'stillness', 'transformation'];
        
        for (let i = 0; i < 5; i++) {
            grid[i] = [];
            for (let j = 0; j < 5; j++) {
                grid[i][j] = {
                    id: `luma-${i}-${j}`,
                    row: i,
                    col: j,
                    element: elements[Math.floor(Math.random() * elements.length)],
                    text: this.getDefaultText(i, j),
                    isActive: false
                };
            }
        }
        return grid;
    }

    private getDefaultText(row: number, col: number): string {
        // Default text mapping - you can expand this
        const texts = [
            "Light and Shadow",
            "Motion in Stillness",
            "Transformative Moments",
            "Shadow Dance",
            "Luminous Path",
            // Add more default texts as needed
        ];
        return texts[(row * 5 + col) % texts.length];
    }

    public getCell(row: number, col: number): LumaCell | null {
        if (row >= 0 && row < 5 && col >= 0 && col < 5) {
            return this.grid[row][col];
        }
        return null;
    }

    public getAllCells(): LumaCell[][] {
        return this.grid;
    }

    public updateCell(row: number, col: number, updates: Partial<LumaCell>): boolean {
        if (row >= 0 && row < 5 && col >= 0 && col < 5) {
            this.grid[row][col] = {
                ...this.grid[row][col],
                ...updates
            };
            return true;
        }
        return false;
    }

    public resetSystem(): void {
        this.grid = this.initializeGrid();
    }

    public getElementCells(element: LumaElement): LumaCell[] {
        const cells: LumaCell[] = [];
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (this.grid[row][col].element === element) {
                    cells.push(this.grid[row][col]);
                }
            }
        }
        return cells;
    }

    public activateCell(row: number, col: number): boolean {
        if (row >= 0 && row < 5 && col >= 0 && col < 5) {
            this.grid[row][col].isActive = true;
            return true;
        }
        return false;
    }

    public deactivateCell(row: number, col: number): boolean {
        if (row >= 0 && row < 5 && col >= 0 && col < 5) {
            this.grid[row][col].isActive = false;
            return true;
        }
        return false;
    }
}
