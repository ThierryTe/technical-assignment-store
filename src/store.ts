
import { IStore } from "./interface/store-interface";
import {JSONObject, JSONValue} from "./types/json-types";
import { Permission } from "./types/permission-types";
import { StoreResult } from "./types/store-result-types";

export class Store implements IStore {

  defaultPolicy: Permission="none";
  private data: JSONObject = {}
  
  constructor() {
  
  }

  allowedToRead(key: string): boolean {
     const permission = Reflect.getMetadata("permission", this, key);
    return (
      this.defaultPolicy === "rw" ||
      this.defaultPolicy === "r" ||
      permission === "rw" ||
      permission === "r"
    );
  }


  allowedToWrite(key: string): boolean {
     const permission = Reflect.getMetadata("permission", this, key);
    return (
      this.defaultPolicy === "rw" ||
      this.defaultPolicy === "w" ||
      permission === "rw" ||
      permission === "w"
    );
  }

  read(path: string):StoreResult {
    const keys = path.split(":");
    let currentData = this.data;
    for (const key of keys) {
      if (!currentData.hasOwnProperty(key) || !this.allowedToRead(key)) {
        throw new Error("Read Access Denied");
      }
      currentData = currentData[key] as JSONObject;
    }
    return currentData as unknown as StoreResult;
  }

  write(path: string, value: JSONValue): JSONValue {
   const keys = path.split(":");
    let currentData = this.data;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!currentData.hasOwnProperty(key) || !this.allowedToWrite(key)) {
            throw new Error("Write Access Denied");
        }
        if (!currentData[key] || typeof currentData[key] !== "object") {
            currentData[key] = {};
        }
        currentData = currentData[key] as JSONObject;
    }
    const lastKey = keys[keys.length - 1];
    if (!currentData.hasOwnProperty(lastKey) || !this.allowedToWrite(lastKey)) {
        throw new Error("Write Access Denied");
    }
    currentData[lastKey] = value as JSONValue;
    return value;
  }

  writeEntries(entries: JSONObject): void {
     for (const key in entries) {
      if (entries.hasOwnProperty(key) && this.allowedToWrite(key)) {
        this.data[key] = entries[key];
      }
    }
  }

  entries(): JSONObject {
     const result: JSONObject = {};
  for (const key of Object.keys(this.data)) {
    if (this.allowedToRead(key)) {
      result[key] = this.data[key];
    }
  }
  return result;
  }
}
