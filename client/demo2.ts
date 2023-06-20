abstract class A {
  abstract name: string;
  abstract age: string;
  abstract getName(): string;
}
class B extends A {
  readonly name: string;
  readonly age: string;
  constructor(public readonly a: string = 'a') {
    super();
    this.name = 'B';
    this.age = '18';
    console.log('class B constructor');
  }
  getName() {
    return this.name;
  }
}

const b = new B();

console.log(b.age, b.getName(), b.name, b.a);

class C extends B {}
export {};
