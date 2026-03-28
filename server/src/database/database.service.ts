import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    await this.initializeDatabase();
  }

  private async initializeDatabase(): Promise<void> {
    try {
      // Check if tables already exist
      const tableExists = await this.checkTablesExist();
      if (tableExists) {
        this.logger.log(
          'Database tables already exist, skipping initialization',
        );
        return;
      }

      this.logger.log('Initializing database with SQL scripts...');

      // Execute scripts in order
      const scriptsPath = path.join(__dirname, '..', '..', 'db');
      const scripts = ['01_create_tables.sql', '02_seed.sql'];

      for (const script of scripts) {
        const scriptPath = path.join(scriptsPath, script);
        await this.executeScript(scriptPath);
        this.logger.log(`✓ Executed ${script}`);
      }

      this.logger.log('Database initialization completed successfully');
    } catch (error) {
      this.logger.error('Database initialization failed', error);
      throw error;
    }
  }

  private async checkTablesExist(): Promise<boolean> {
    try {
      const result = await this.dataSource.query(
        `SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_name = 'users'
        );`,
      );
      return result[0].exists;
    } catch {
      return false;
    }
  }

  private async executeScript(scriptPath: string): Promise<void> {
    const sql = fs.readFileSync(scriptPath, 'utf-8');
    const statements = sql
      .split(';')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith('--'));

    for (const statement of statements) {
      await this.dataSource.query(statement);
    }
  }
}
