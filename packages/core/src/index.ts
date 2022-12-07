import { version } from "../package.json";

class Guider {
  version: string;

  constructor() {
    this.version = version;
  }

  hello() {
    console.log(this.version);
  }
}

export default Guider;
