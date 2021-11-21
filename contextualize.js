var obby = {
  returnThis: () => this
};

class Obby {
  returnThis = () => this;
}

const obby2 = new Obby();

console.log(obby.returnThis());
console.log(obby2.returnThis());

function ObbyGenerator () {
  this.returnThis = () => this;
}
