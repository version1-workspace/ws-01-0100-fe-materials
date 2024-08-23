import { v4 as uuid } from "uuid";

export class UserModel {
  id;
  _raw;

  constructor(params) {
    this.id = params.uuid || uuid();
    this._raw = params;

  }

  get raw() {
    return this._raw;
  }
}

