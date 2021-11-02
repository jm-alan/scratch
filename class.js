class Thing {
  static whoCares () {
    return '';
  }
}

class OtherThing extends Thing {
  constructor () {
    OtherThing.test();
    super();
    // console.log(super.whoCares());
  }

  static test () {
    super.whoCares();
  }
}

console.log(new OtherThing());
