// src/lib/moduleManager.ts
import { SystemModule, ModuleConfig } from '../types/core';
import { KathySystem } from '../modules/KathySystem';
import { LumaSystem } from '../modules/LumaSystem';

class ModuleManager {
  private static instance: ModuleManager;
  private modules: Map<string, SystemModule>;

  private constructor() {
    this.modules = new Map();
  }

  static getInstance(): ModuleManager {
    if (!ModuleManager.instance) {
      ModuleManager.instance = new ModuleManager();
    }
    return ModuleManager.instance;
  }

  async initializeModule(moduleType: 'kathy' | 'luma'): Promise<SystemModule> {
    let module: SystemModule;

    switch (moduleType) {
      case 'kathy':
        module = new KathySystem();
        break;
      case 'luma':
        module = new LumaSystem();
        break;
      default:
        throw new Error(`Unknown module type: ${moduleType}`);
    }

    await module.initialize();
    this.modules.set(moduleType, module);
    return module;
  }

  getModule(moduleType: 'kathy' | 'luma'): SystemModule | undefined {
    return this.modules.get(moduleType);
  }

  async resetModule(moduleType: 'kathy' | 'luma'): Promise<void> {
    const module = await this.initializeModule(moduleType);
    this.modules.set(moduleType, module);
  }

  getAllModules(): SystemModule[] {
    return Array.from(this.modules.values());
  }
}

export const moduleManager = ModuleManager.getInstance();
