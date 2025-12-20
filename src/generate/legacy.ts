// import * as path from "node:path";
// import * as fs from "node:fs";

// import type { CompleteConfig } from "./config";

// const recurseNodes = (node: string): string[] => (fs.statSync(node).isFile() ? [node] : fs.readdirSync(node).reduce<string[]>((memo, n) => memo.concat(recurseNodes(path.join(node, n))), []));

// export function srcWarning(config: CompleteConfig) {
//   if (config.outExt === ".ts") {
//     return; // if .ts extension is explicitly set, our legacy detection code fails
//   }

//   const legacyFolderName = "dorjo";
//   const legacyFolderPath = path.join(config.outDir, legacyFolderName);
//   const legacySchemaName = "schema.ts";
//   const legacySchemaPath = path.join(legacyFolderPath, legacySchemaName);
//   const legacySchemaExists = fs.existsSync(legacySchemaPath);
//   const legacySrcName = "src";
//   const legacySrcPath = path.join(legacyFolderPath, legacySrcName);
//   const legacySrcExists = fs.existsSync(legacySrcPath);
//   const legacyCustomName = "custom";
//   const legacyCustomPath = path.join(legacyFolderPath, legacyCustomName);
//   const legacyCustomPathExists = fs.existsSync(legacyCustomPath);
//   const legacyCustomTypes = !legacyCustomPathExists ? [] : recurseNodes(legacyCustomPath).filter((f) => !f.match(/[.]d[.]ts$/));
//   const legacyCustomTypesExist = legacyCustomTypes.length > 0;

//   if (legacySchemaExists || legacySrcExists || legacyCustomTypesExist) {
//     const warn = config.warningListener === true ? console.log : config.warningListener || (() => void 0);

//     warn(
//       `
// *** IMPORTANT: DORJO NO LONGER COPIES ITS SOURCE TO YOUR SOURCE TREE ***

// To convert your codebase, please do the following:

// * Make sure dorjo is a "dependency" (not merely a "devDependency") in your npm
//   'package.json'

// * Remove the "srcMode" key, if present, from 'dorjoconfig.json' or the config
//   argument passed to 'generate'
// ` +
//         (legacySchemaExists
//           ? `
// * Delete the file 'dorjo/schema.ts' (but leave 'dorjo/schema.d.ts')
// `
//           : ``) +
//         (legacySrcExists
//           ? `
// * Delete the folder 'dorjo/src' and all its contents
// `
//           : ``) +
//         (legacyCustomTypesExist
//           ? `
// * Transfer any customised type declarations in 'dorjo/custom' from the plain
//   old '.ts' files to the new '.d.ts' files

// * Delete all the plain '.ts' files in 'dorjo/custom', including 'index.ts'
// `
//           : ``) +
//         `
// * Ensure that the '.d.ts' files in 'dorjo' are picked up by your TypeScript
//   configuration (e.g. check the "files" or "include" key in 'tsconfig.json')

// * If you use 'ts-node' or 'node -r ts-node/register', pass the --files option
//   ('ts-node' only) or set 'TS_NODE_FILES=true' (in either case)

// * Make the following changes to your imports (you can use VS Code's 'Replace in
//   Files' command, remembering to toggle Regular Expressions on):

//    1) Change:  import * as dorjo from 'dorjo'
//       To:      import * as dorjo from 'dorjo/generate'

//       Search:  ^(\\s*import[^"']*['"])dorjo(["'])
//       Replace: $1dorjo/generate$2

//    2) Change:  import * as db from './path/to/dorjo/src'
//       To:      import * as db from 'dorjo/db'

//       Search:  ^(\\s*import[^"']*['"])[^"']*/dorjo/src(["'])
//       Replace: $1dorjo/db$2

//    3) Change:  import * as s from './path/to/dorjo/schema'
//       To:      import type * as s from 'dorjo/schema'
//                       ^^^^
//                       be sure to import type, not just import

//       Search:  ^(\\s*import\\s*)(type\\s*)?([^"']*['"])[^"']*/(dorjo/schema["'])
//       Replace: $1type $3$4

// Thank you.
// `,
//     );
//   }
// }
