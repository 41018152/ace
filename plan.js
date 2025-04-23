// plan.js
const days = 4;
const budgetData = JSON.parse(localStorage.getItem('budgets') || '{}');

function loadData(day) {
  const data = localStorage.getItem(`day${day}-entries`);
  return data ? JSON.parse(data) : [];
}

function saveData(day, data) {
  localStorage.setItem(`day${day}-entries`, JSON.stringify(data));
}

function updateTotalBudgetDisplay() {
  const total = Object.values(budgetData).reduce((acc, val) => acc + Number(val || 0), 0);
  document.getElementById('total-budget-display').textContent = `總預算: $${total}`;
}

function createEntry(day, data, index, container) {
  const entryDiv = document.createElement('div');
  entryDiv.className = 'entry';

  const displaySpan = document.createElement('span');
  const inputPlace = document.createElement('input');
  const inputTime = document.createElement('input');
  const inputMap = document.createElement('input');

  inputPlace.type = inputTime.type = inputMap.type = 'text';
  inputPlace.placeholder = '景點';
  inputTime.placeholder = '時間';
  inputMap.placeholder = '地圖連結';

  const editBtn = document.createElement('button');
  const saveBtn = document.createElement('button');
  const delBtn = document.createElement('button');
  const doneBtn = document.createElement('button');

  editBtn.textContent = '編輯';
  saveBtn.textContent = '完成';
  delBtn.textContent = '刪除';
  doneBtn.textContent = '觀光完成';

  editBtn.className = 'edit-btn';
  saveBtn.className = 'save-btn';
  delBtn.className = 'delete-btn';
  doneBtn.className = 'done-btn';

  function renderDisplay() {
    const d = data[index];
    displaySpan.innerHTML = `景點: ${d.place}，時間: ${d.time}，<a href="${d.map}" target="_blank">地圖</a>`;
    displaySpan.className = d.done ? 'done' : '';
  }

  editBtn.onclick = () => {
    const d = data[index];
    inputPlace.value = d.place;
    inputTime.value = d.time;
    inputMap.value = d.map;

    displaySpan.style.display = 'none';
    inputPlace.style.display = 'inline';
    inputTime.style.display = 'inline';
    inputMap.style.display = 'inline';
    saveBtn.style.display = 'inline';
    editBtn.style.display = 'none';
  };

  saveBtn.onclick = () => {
    data[index] = {
      place: inputPlace.value,
      time: inputTime.value,
      map: inputMap.value,
      done: false
    };
    saveData(day, data);
    renderDisplay();
    displaySpan.style.display = 'inline';
    inputPlace.style.display = 'none';
    inputTime.style.display = 'none';
    inputMap.style.display = 'none';
    saveBtn.style.display = 'none';
    editBtn.style.display = 'inline';
  };

  delBtn.onclick = () => {
    data.splice(index, 1);
    saveData(day, data);
    container.innerHTML = '';
    data.forEach((_, i) => createEntry(day, data, i, container));
  };

  doneBtn.onclick = () => {
    data[index].done = !data[index].done;
    saveData(day, data);
    renderDisplay();
  };

  entryDiv.appendChild(displaySpan);
  entryDiv.appendChild(inputPlace);
  entryDiv.appendChild(inputTime);
  entryDiv.appendChild(inputMap);
  entryDiv.appendChild(editBtn);
  entryDiv.appendChild(saveBtn);
  entryDiv.appendChild(doneBtn);
  entryDiv.appendChild(delBtn);

  inputPlace.style.display = 'none';
  inputTime.style.display = 'none';
  inputMap.style.display = 'none';
  saveBtn.style.display = 'none';

  renderDisplay();
  container.appendChild(entryDiv);
}

const container = document.getElementById('plan-container');
for (let d = 1; d <= days; d++) {
  const section = document.createElement('div');
  section.className = 'day-section';

  const title = document.createElement('h2');
  title.textContent = `第 ${d} 天`;
  section.appendChild(title);

  const entriesContainer = document.createElement('div');
  section.appendChild(entriesContainer);

  const data = loadData(d);
  if (data.length === 0) {
    data.push({ place: '', time: '', map: '', done: false });
    saveData(d, data);
  }

  data.forEach((_, i) => createEntry(d, data, i, entriesContainer));

  const addBtn = document.createElement('button');
  addBtn.textContent = '新增景點';
  addBtn.className = 'save-btn';
  addBtn.onclick = () => {
    data.push({ place: '', time: '', map: '', done: false });
    createEntry(d, data, data.length - 1, entriesContainer);
    saveData(d, data);
  };

  const budgetLabel = document.createElement('label');
  budgetLabel.textContent = '預算: $';
  const budgetInput = document.createElement('input');
  budgetInput.type = 'number';
  budgetInput.className = 'budget-input';
  budgetInput.value = budgetData[d] || 0;
  budgetInput.onchange = () => {
    budgetData[d] = budgetInput.value;
    localStorage.setItem('budgets', JSON.stringify(budgetData));
    updateTotalBudgetDisplay();
  };

  section.appendChild(addBtn);
  section.appendChild(budgetLabel);
  section.appendChild(budgetInput);
  container.appendChild(section);
}

updateTotalBudgetDisplay();

// 編輯程式碼按鈕
const editCodeButton = document.createElement('button');
editCodeButton.textContent = '編輯此 JS 檔';
editCodeButton.className = 'main-btn';
document.body.appendChild(editCodeButton);

// 編輯 JS 檔案的功能
editCodeButton.onclick = function() {
  let editorHTML = document.createElement("textarea");
  editorHTML.id = "js-editor";
  editorHTML.rows = 20;
  editorHTML.style.width = "100%";
  editorHTML.value = localStorage.getItem("planJS") || `// 這是計劃程式碼
function loadData(day) {
  const data = localStorage.getItem('day' + day + '-entries');
  return data ? JSON.parse(data) : [];
}`;
  
  const saveBtn = document.createElement('button');
  saveBtn.textContent = '儲存修改';
  saveBtn.className = 'save-btn';
  
  document.body.appendChild(editorHTML);
  document.body.appendChild(saveBtn);
  
  saveBtn.onclick = function() {
    let editedJS = document.getElementById("js-editor").value;
    localStorage.setItem("planJS", editedJS);  // 儲存程式碼
    alert("修改已儲存！");
  };
};

// 預加載儲存的程式碼
window.onload = function() {
  let savedJS = localStorage.getItem("planJS");
  if (savedJS) {
    eval(savedJS);  // 執行儲存的 JavaScript 程式碼
  }
};
