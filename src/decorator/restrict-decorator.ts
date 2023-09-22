import { Permission } from "../types/permission-types";
import 'reflect-metadata';

export function Restrict(permission: Permission): any {
    return function (target: any, key: string) {
    Reflect.defineMetadata("permission", permission, target, key);
  };
}