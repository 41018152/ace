// 編輯 HTML 相關功能

// 開啟編輯器
document.getElementById("open-html-editor").onclick = function() {
  let editorHTML = document.createElement("textarea");
  editorHTML.id = "html-editor";
  editorHTML.rows = 15;
  editorHTML.style.width = "100%";
  document.getElementById("edit-buttons").innerHTML = "";
  document.getElementById("edit-buttons").appendChild(editorHTML);
  document.getElementById("edit-buttons").innerHTML += '<button id="save-html" class="main-btn">儲存修改</button>';
};

// 儲存編輯過的 HTML
document.getElementById("save-html")?.onclick = function() {
  let editedHTML = document.getElementById("html-editor").value;
  localStorage.setItem("editedHTML", editedHTML);
  alert("修改已儲存！");
};

// 預加載儲存的 HTML（如果存在）
window.onload = function() {
  if (localStorage.getItem("editedHTML")) {
      document.getElementById("html-editor").value = localStorage.getItem("editedHTML");
  }
};

// 編輯 JS 程式碼
document.getElementById('edit-js-btn').onclick = function() {
  const editor = document.getElementById('js-editor');
  const scriptContent = `// 編輯 HTML 相關功能

// 開啟編輯器
document.getElementById("open-html-editor").onclick = function() {
  let editorHTML = document.createElement("textarea");
  editorHTML.id = "html-editor";
  editorHTML.rows = 15;
  editorHTML.style.width = "100%";
  document.getElementById("edit-buttons").innerHTML = "";
  document.getElementById("edit-buttons").appendChild(editorHTML);
  document.getElementById("edit-buttons").innerHTML += '<button id="save-html" class="main-btn">儲存修改</button>';
};

// 儲存編輯過的 HTML
document.getElementById("save-html")?.onclick = function() {
  let editedHTML = document.getElementById("html-editor").value;
  localStorage.setItem("editedHTML", editedHTML);
  alert("修改已儲存！");
};

// 預加載儲存的 HTML（如果存在）
window.onload = function() {
  if (localStorage.getItem("editedHTML")) {
      document.getElementById("html-editor").value = localStorage.getItem("editedHTML");
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
  localStorage.setItem('editHtmlJsScript', newScriptContent);

  // 重啟頁面以應用新的程式碼
  location.reload();
};
