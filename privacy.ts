const OUTDOOR_TEMPERATURE = +process.argv[2];

class IceCreamError extends Error {
  isVerySad: boolean;

  constructor(message: string) {
    super(message);
    this.isVerySad = true;
  }
}

class Scoop {
  flavor: string;
  nextScoop: Scoop;

  constructor(flavor: string) {
    this.flavor = flavor;
    this.nextScoop = null;
  }
}

class IceCream {
  formFactor: string;
  scoopsPaidFor: number;
  private scoops: number;
  topScoop: Scoop;

  constructor(formFactor: string = 'cone', scoopsPaidFor: number = 1) {
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

  get amount(): number {
    return this.amount;
  }

  addScoop(scoop: Scoop): void {
    if (this.scoops < this.scoopsPaidFor) {
      console.log('Added another delicious scoop of', scoop.flavor);
      scoop.nextScoop = this.topScoop;
      this.topScoop = scoop;
      this.scoops++;
    } else throw new IceCreamError('YOU HAVEN\'T PAID FOR THAT MANY SCOOPS >:(');
  }

  removeTopScoop(): Scoop {
    if (this.scoops) {
      this.scoops--;
      const staging: Scoop = this.topScoop;
      this.topScoop = staging.nextScoop;
      staging.nextScoop = null;
      return staging;
    } else throw new IceCreamError('NO SCOOPS LEFT :\'(');
  }

  eatScoop(): Scoop {
    return this.removeTopScoop();
  }

  melt(): void {
    this.removeTopScoop();
    console.log('OH NO I\'M MELTING :\'(');
  }
}

const flavors: string[] = [
  'vanilla',
  'chocolate',
  'strawberry',
  'dulce de leche',
  'cookie dough',
  'rocky road',
  'mint chip'
];

const iceCream = new IceCream('cup', 5);
setInterval(() => iceCream.addScoop(new Scoop(flavors[Math.floor(Math.random() * 6)])), 1000);
