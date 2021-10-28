const OUTDOOR_TEMPERATURE = +process.argv[2];

class IceCreamError extends Error {
  constructor(message: string) {
    super(message);
    this.isVerySad = true;
  }
}

class Scoop {
  constructor(flavor) {
    this.flavor = flavor;
    this.nextScoop = null;
  }
}

class IceCream {
  constructor(formFactor = 'cone', scoopsPaidFor = 1) {
    this.formFactor = formFactor;
    this.scoopsPaidFor = scoopsPaidFor;
    this.scoops = 0;
    this.topScoop = null;
    if (OUTDOOR_TEMPERATURE > 70) {
      setTimeout(() => {
        const meltInterval = setInterval(() => {
          if (this.scoops) this.melt();
          else clearInterval(meltInterval);
        }, 5000);
      }, 15000);
    }
  }

  set amount(_am) {

  }

  get amount() {
    return this.amount;
  }

  addScoop(scoop) {
    if (this.scoops < this.scoopsPaidFor) {
      console.log('Added another delicious scoop of', scoop.flavor);
      scoop.nextScoop = this.topScoop;
      this.topScoop = scoop;
      this.scoops++;
    } else throw new IceCreamError('TOO MANY SCOOPS >:(');
  }

  removeTopScoop() {
    if (this.scoops) {
      this.scoops--;
      const staging = this.topScoop;
      this.topScoop = staging.nextScoop;
      staging.nextScoop = null;
      return staging;
    } else throw new IceCreamError('NO SCOOPS LEFT :\'(');
  }

  eatScoop() {
    return this.removeTopScoop();
  }

  melt() {
    this.removeTopScoop();
    console.log('OH NO I\'M MELTING :\'(');
  }
}

const iceCream = new IceCream('cup', 5);
setInterval(() => iceCream.addScoop(new Scoop('vanilla')), 1000);
