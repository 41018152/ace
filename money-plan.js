// 存錢規劃功能

// 顯示儲蓄進度
function updateProgress() {
  let goal = parseFloat(document.getElementById("savings-goal").value);
  let current = parseFloat(document.getElementById("current-savings").value);
  let monthly = parseFloat(document.getElementById("monthly-contribution").value);

  if (isNaN(goal) || isNaN(current) || isNaN(monthly)) {
    document.getElementById("progress-display").innerHTML = "請輸入有效的數字。";
    return;
  }

  let monthsRemaining = Math.ceil((goal - current) / monthly);
  if (monthsRemaining < 0) {
    document.getElementById("progress-display").innerHTML = "您已經達到儲蓄目標！";
  } else {
    document.getElementById("progress-display").innerHTML = "距離目標還需要 " + monthsRemaining + " 個月。";
  }
}

// 儲存儲蓄計劃
document.getElementById("save-money-plan").onclick = function() {
  let goal = document.getElementById("savings-goal").value;
  let current = document.getElementById("current-savings").value;
  let monthly = document.getElementById("monthly-contribution").value;

  if (goal && current && monthly) {
    localStorage.setItem("savingsGoal", goal);
    localStorage.setItem("currentSavings", current);
    localStorage.setItem("monthlyContribution", monthly);
    updateProgress();
    alert("儲蓄計劃已儲存！");
  } else {
    alert("請輸入所有必要的資訊！");
  }
};

// 預先填充儲蓄計劃（如果存在的話）
window.onload = function() {
  if (localStorage.getItem("savingsGoal")) {
    document.getElementById("savings-goal").value = localStorage.getItem("savingsGoal");
    document.getElementById("current-savings").value = localStorage.getItem("currentSavings");
    document.getElementById("monthly-contribution").value = localStorage.getItem("monthlyContribution");
    updateProgress();
  }
};

// 編輯 JS 程式碼
document.getElementById('edit-js-btn').onclick = function() {
  const editor = document.getElementById('js-editor');
  const scriptContent = `// 存錢規劃功能

// 顯示儲蓄進度
function updateProgress() {
  let goal = parseFloat(document.getElementById("savings-goal").value);
  let current = parseFloat(document.getElementById("current-savings").value);
  let monthly = parseFloat(document.getElementById("monthly-contribution").value);

  if (isNaN(goal) || isNaN(current) || isNaN(monthly)) {
    document.getElementById("progress-display").innerHTML = "請輸入有效的數字。";
    return;
  }

  let monthsRemaining = Math.ceil((goal - current) / monthly);
  if (monthsRemaining < 0) {
    document.getElementById("progress-display").innerHTML = "您已經達到儲蓄目標！";
  } else {
    document.getElementById("progress-display").innerHTML = "距離目標還需要 " + monthsRemaining + " 個月。";
  }
}

// 儲存儲蓄計劃
document.getElementById("save-money-plan").onclick = function() {
  let goal = document.getElementById("savings-goal").value;
  let current = document.getElementById("current-savings").value;
  let monthly = document.getElementById("monthly-contribution").value;

  if (goal && current && monthly) {
    localStorage.setItem("savingsGoal", goal);
    localStorage.setItem("currentSavings", current);
    localStorage.setItem("monthlyContribution", monthly);
    updateProgress();
    alert("儲蓄計劃已儲存！");
  } else {
    alert("請輸入所有必要的資訊！");
  }
};

// 預先填充儲蓄計劃（如果存在的話）
window.onload = function() {
  if (localStorage.getItem("savingsGoal")) {
    document.getElementById("savings-goal").value = localStorage.getItem("savingsGoal");
    document.getElementById("current-savings").value = localStorage.getItem("currentSavings");
    document.getElementById("monthly-contribution").value = localStorage.getItem("monthlyContribution");
    updateProgress();
  }
};`;

  editor.value = scriptContent;
  editor.style.display = 'block';
  document.getElementById('save-js-btn').style.display = 'inline';
};

// 儲存並應用 JS 變更
document.getElementById('save-js-btn').onclick = function() {
  const editor = document.getElementById('js-editor');
  const newScriptContent = editor.value;

  // 儲存新的程式碼
  localStorage.setItem('moneyPlanJsScript', newScriptContent);

  // 重啟頁面以應用新的程式碼
  location.reload();
};
