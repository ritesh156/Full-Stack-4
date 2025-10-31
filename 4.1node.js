const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const employees = [];

function showMenu() {
  console.log('\nEmployee Management System');
  console.log('1. Add Employee');
  console.log('2. List Employees');
  console.log('3. Remove Employee');
  console.log('4. Exit');
  rl.question('\nEnter your choice: ', handleChoice);
}

function handleChoice(choice) {
  switch (choice.trim()) {
    case '1':
      addEmployee();
      break;
    case '2':
      listEmployees();
      break;
    case '3':
      removeEmployee();
      break;
    case '4':
      rl.close();
      break;
    default:
      showMenu();
  }
}

function addEmployee() {
  rl.question('Enter employee name: ', name => {
    rl.question('Enter employee ID: ', id => {
      employees.push({ name, id });
      console.log('Employee added successfully.');
      showMenu();
    });
  });
}

function listEmployees() {
  console.log('\nEmployee List:');
  if (employees.length === 0) {
    console.log('No employees found.');
  } else {
    employees.forEach(emp => {
      console.log(`Name: ${emp.name} (ID: ${emp.id})`);
    });
  }
  showMenu();
}

function removeEmployee() {
  rl.question('Enter employee ID to remove: ', id => {
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      employees.splice(index, 1);
      console.log('Employee removed successfully.');
    } else {
      console.log('Employee not found.');
    }
    showMenu();
  });
}

showMenu();
