// Select elements
const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

// Initialize expenses array and load from localStorage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Add new expense
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('expense-name').value;
  const amount = parseFloat(document.getElementById('expense-amount').value);
  const category = document.getElementById('expense-category').value;
  const date = document.getElementById('expense-date').value || new Date().toISOString().split('T')[0];

  if (name === '' || isNaN(amount) || amount <= 0 || category === '') {
    alert('Please fill in all required fields correctly.');
    return;
  }

  const expense = {
    id: Date.now(),
    name,
    amount,
    category,
    date
  };

  expenses.push(expense);
  saveExpenses();
  renderExpenses();
  form.reset();
});

// Save expenses to localStorage
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Render expense list
function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;

  expenses.forEach(expense => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${expense.name} - $${expense.amount} - ${expense.category} - ${expense.date}
      <button class="edit-btn" onclick="editExpense(${expense.id})">Edit</button>
      <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
    `;
    expenseList.appendChild(li);
    total += expense.amount;
  });

  totalAmount.textContent = total.toFixed(2);
}

// Delete expense
function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
  saveExpenses();
  renderExpenses();
}

// Edit expense
function editExpense(id) {
  const expense = expenses.find(expense => expense.id === id);
  document.getElementById('expense-name').value = expense.name;
  document.getElementById('expense-amount').value = expense.amount;
  document.getElementById('expense-category').value = expense.category;
  document.getElementById('expense-date').value = expense.date;

  deleteExpense(id);  // Remove old entry before editing
}

// Initial render
renderExpenses();
