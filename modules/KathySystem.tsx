// KathySystem.tsx
export type KathyTheme = 'water' | 'environment' | 'community' | 'social' | 'education';

export interface KathyCell {
    id: string;
    row: number;
    col: number;
    theme: KathyTheme;
    text: string;
    isLocked: boolean;
}

export class KathySystem {
    private grid: KathyCell[][];
    private static instance: KathySystem;

    private constructor() {
        this.grid = this.initializeGrid();
    }

    public static getInstance(): KathySystem {
        if (!KathySystem.instance) {
            KathySystem.instance = new KathySystem();
        }
        return KathySystem.instance;
    }

    private initializeGrid(): KathyCell[][] {
        const grid: KathyCell[][] = [];
        const themes: KathyTheme[] = ['water', 'environment', 'community', 'social', 'education'];
        
        for (let i = 0; i < 4; i++) {
            grid[i] = [];
            for (let j = 0; j < 4; j++) {
                grid[i][j] = {
                    id: `kathy-${i}-${j}`,
                    row: i,
                    col: j,
                    theme: themes[Math.floor(Math.random() * themes.length)],
                    text: this.getDefaultText(i, j),
                    isLocked: false
                };
            }
        }
        return grid;
    }

    private getDefaultText(row: number, col: number): string {
        // Default text mapping - you can expand this
        const texts = [
            "Water Conservation",
            "Community Action",
            "Environmental Impact",
            "Social Change",
            "Educational Access",
            // Add more default texts as needed
        ];
        return texts[(row * 4 + col) % texts.length];
    }

    public getCell(row: number, col: number): KathyCell | null {
        if (row >= 0 && row < 4 && col >= 0 && col < 4) {
            return this.grid[row][col];
        }
        return null;
    }

    public getAllCells(): KathyCell[][] {
        return this.grid;
    }

    public updateCell(row: number, col: number, updates: Partial<KathyCell>): boolean {
        if (row >= 0 && row < 4 && col >= 0 && col < 4) {
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

    public getThemeCells(theme: KathyTheme): KathyCell[] {
        const cells: KathyCell[] = [];
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (this.grid[row][col].theme === theme) {
                    cells.push(this.grid[row][col]);
                }
            }
        }
        return cells;
    }
}
