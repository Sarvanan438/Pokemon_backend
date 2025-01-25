import { Id } from "./Id";

export default class UUID implements Id {
  constructor(private id: string) {}

  toString = () => this.id;
}
