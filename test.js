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

callTodos();
sayHi();