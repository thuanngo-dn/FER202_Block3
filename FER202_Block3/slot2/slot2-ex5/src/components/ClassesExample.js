import React from "react";

class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound.`;
  }
}

class Dog extends Animal {
  speak() {
    return `${this.name} barks.`;
  }
}

function ClassesExample() {
  const dog = new Dog("Buddy");

  return (
    <div>
      <h2>Classes Example</h2>
      <p>{dog.speak()}</p>
    </div>
  );
}

export default ClassesExample;
