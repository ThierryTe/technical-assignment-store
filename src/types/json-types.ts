export type JSONPrimitive = string | number | boolean | null;

export type JSONValue = JSONPrimitive | JSONArray | JSONObject;

export interface JSONObject {
  [key: string]: JSONValue;
}

export type JSONArray = JSONValue[];
