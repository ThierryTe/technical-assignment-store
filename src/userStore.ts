import { Restrict } from "./decorator/restrict-decorator";
import {  Store } from "./store";

export class UserStore extends Store {
  @Restrict("rw")
  name: string = "John Doe";

  constructor() {
    super();
    this.defaultPolicy = "rw";
  }
}
