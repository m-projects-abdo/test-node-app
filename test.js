let objTest = {
  user_1: {
    value: 'username',
    flag: 'user-name'
  },
  user_2: {
    value: 'username_2',
    flag: 'user-name-2'
  },
};

let testArr = [
  {
    status: 'active'
  },
  {
    status: 'unActive'
  }
];

// Object.keys(objTest).forEach(el => console.table(objTest[el]))

//every return boolean
let status_every = testArr.every(el => el.status != 'unActive');
let status_some = testArr.some(el => el.status != 'unActive');
let newArr = testArr.map(el => {
  return {
    ...el,
    name: 'hi'
  }
});
testArr = newArr;

let newFilter = testArr.filter(el => el.name == 'hi')


async function resturnData() {
  setTimeout(() => {
    return {
      name: 'hi'
    };
  }, 1200);
}

async function callTodos() {
  const res = await resturnData();
  console.log(res);
}

function sayHi() {
  console.log('hi');
}

// callTodos();
// sayHi();


const testAsync = async _=> Promise.resolve('hi');
// testAsync().then(console.log);

testInit = {
  user: (res = 2) => {
    console.log(res)
  },
  user2: {}
}

// testInit.user(123);

// const test = console.log
// test(12);

class AppError extends Error {
  errors_arr;
  
  constructor(message) {
    super(message);
    this.errors_arr = message;
  }

  get errors() {
    return this.errors_arr;
  }
}

const testErrorClass = async () => {
  try {
    const arr = [
      {
        message: 'Not found..'
      }
    ]

    const test = 'test';

    throw new AppError(arr);
  } catch(err) {
    console.log(err.errors);
  }
}

let testingS = ['hi','man'];
// console.log(testingS.join(','))

// testErrorClass();


class Test {
  number = 0;

  incNumber() {
    this.number++;
    return this;
  }

  multiNumber() {
    this.number = this.number * 2;
    return this
  }
}

let testClass = new Test();
console.log(testClass.multiNumber().number);
console.log(testClass.incNumber().number);
console.log(testClass.incNumber().multiNumber().number);