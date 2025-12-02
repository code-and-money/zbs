import type { Insertable } from "@codeandmoney/dorjo/schema";
import { cols as sqlCols, Default, sql, vals as sqlVals } from "./core";
import { completeKeysWithDefaultValue, completeKeysWithDefaultValueObject, mapWithSeparator } from "./utils";

export function getStuffForArray(values: Insertable | Insertable[], params?: { defaultValue?: any }) {
  const completedValues = Array.isArray(values) ? completeKeysWithDefaultValue(values, params?.defaultValue) : completeKeysWithDefaultValueObject(values, params?.defaultValue);
  const cols = sqlCols(Array.isArray(completedValues) ? completedValues[0]! : completedValues);
  const vals = Array.isArray(completedValues) ? mapWithSeparator(completedValues as Insertable[], sql`, `, (v) => sql`(${sqlVals(v)})`) : sql`(${sqlVals(completedValues)})`;
  return { cols, vals };
}
