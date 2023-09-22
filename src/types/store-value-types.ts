
import { JSONArray, JSONObject } from "./json-types";
import { StoreResult } from "./store-result-types";

export type StoreValue = | JSONObject
  | JSONArray
  | StoreResult
  | (() => StoreResult);
