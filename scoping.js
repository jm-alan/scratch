const someFunction = () => someVariable;
const someVariable = 7;
console.log(someFunction());

const outerScope = () => {
  const noArgsClosure = () => {
    console.log(a);
    console.log(b);
  };

  const a = 6;
  const b = 'blah';
  noArgsClosure();
};

outerScope();
