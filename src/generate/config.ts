import * as fs from "node:fs";
import * as path from "node:path";
import type * as pg from "pg";

export interface BaseConfig {
  db: pg.ClientConfig;
  outDir: string;
  outExt: string;
  schemas: SchemaRules;
  debugListener: boolean | ((s: string) => void);
  progressListener: boolean | ((s: string) => void);
  warningListener: boolean | ((s: string) => void);
  customTypesTransform: "PgMy_type" | "my_type" | "PgMyType" | ((s: string) => string);
  columnOptions: ColumnOptions;
  schemaJSDoc: boolean;
  unprefixedSchema: string | null;
  customJsonParsingForLargeNumbers: boolean;
}

interface SchemaRules {
  [schema: string]: {
    include: "*" | string[];
    exclude: "*" | string[];
  };
}

interface ColumnOptions {
  [k: string]: {
    // table name or "*"
    [k: string]: {
      // column name
      insert?: "auto" | "excluded" | "optional";
      update?: "auto" | "excluded";
    };
  };
}

export type Config = Partial<BaseConfig>;
export type CompleteConfig = BaseConfig;

const defaultConfig: Config = {
  outDir: ".",
  outExt: ".d.ts",
  schemas: { public: { include: "*", exclude: [] } },
  debugListener: false,
  progressListener: false,
  warningListener: true,
  customTypesTransform: "my_type",
  columnOptions: {},
  schemaJSDoc: true,
  unprefixedSchema: "public",
  customJsonParsingForLargeNumbers: false,
};

// export const moduleRoot = () => {
//   // import.meta.dirname could be either ./generate (ts) or ./dist/generate (js)
//   const parentDir = path.join(import.meta.dirname, "..");
//   return fs.existsSync(path.join(parentDir, "package.json")) ? parentDir : path.join(parentDir, "..");
// };

export const finaliseConfig = (config: Config) => {
  const finalConfig = { ...defaultConfig, ...config };
  return finalConfig as CompleteConfig;
};
