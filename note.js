// note.js
let notes = JSON.parse(localStorage.getItem('notes') || '[]');

// 儲存筆記
function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// 創建筆記元素
function createNoteElement(note, index) {
  const noteDiv = document.createElement('div');
  noteDiv.className = 'note';

  const noteContent = document.createElement('textarea');
  noteContent.value = note.content;
  noteContent.disabled = true;
  noteContent.className = 'note-content';

  const editBtn = document.createElement('button');
  const saveBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  editBtn.textContent = '編輯';
  saveBtn.textContent = '完成';
  deleteBtn.textContent = '刪除';

  editBtn.className = 'edit-btn';
  saveBtn.className = 'save-btn';
  deleteBtn.className = 'delete-btn';

  editBtn.onclick = () => {
    noteContent.disabled = false;
    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline';
  };

  saveBtn.onclick = () => {
    note.content = noteContent.value;
    saveNotes();
    noteContent.disabled = true;
    editBtn.style.display = 'inline';
    saveBtn.style.display = 'none';
  };

  deleteBtn.onclick = () => {
    notes.splice(index, 1);
    saveNotes();
    noteDiv.remove();
  };

  noteDiv.appendChild(noteContent);
  noteDiv.appendChild(editBtn);
  noteDiv.appendChild(saveBtn);
  noteDiv.appendChild(deleteBtn);
  saveBtn.style.display = 'none';

  return noteDiv;
}

// 載入筆記
function loadNotes() {
  const container = document.getElementById('note-container');
  container.innerHTML = '';
  notes.forEach((note, index) => {
    const noteElement = createNoteElement(note, index);
    container.appendChild(noteElement);
  });
}

// 新增筆記
document.getElementById('add-note-btn').onclick = () => {
  const newNote = { content: '' };
  notes.push(newNote);
  saveNotes();
  loadNotes();
};

// 清除所有筆記
document.getElementById('clear-all-btn').onclick = () => {
  notes = [];
  saveNotes();
  loadNotes();
};

// 編輯 JS 程式碼
document.getElementById('edit-js-btn').onclick = () => {
  const editor = document.getElementById('js-editor');
  const scriptContent = `let notes = JSON.parse(localStorage.getItem('notes') || '[]');\n\nfunction saveNotes() {\n  localStorage.setItem('notes', JSON.stringify(notes));\n}\n\nfunction createNoteElement(note, index) {\n  const noteDiv = document.createElement('div');\n  noteDiv.className = 'note';\n\n  const noteContent = document.createElement('textarea');\n  noteContent.value = note.content;\n  noteContent.disabled = true;\n  noteContent.className = 'note-content';\n\n  const editBtn = document.createElement('button');\n  const saveBtn = document.createElement('button');\n  const deleteBtn = document.createElement('button');\n\n  editBtn.textContent = '編輯';\n  saveBtn.textContent = '完成';\n  deleteBtn.textContent = '刪除';\n\n  editBtn.className = 'edit-btn';\n  saveBtn.className = 'save-btn';\n  deleteBtn.className = 'delete-btn';\n\n  editBtn.onclick = () => {\n    noteContent.disabled = false;\n    editBtn.style.display = 'none';\n    saveBtn.style.display = 'inline';\n  };\n\n  saveBtn.onclick = () => {\n    note.content = noteContent.value;\n    saveNotes();\n    noteContent.disabled = true;\n    editBtn.style.display = 'inline';\n    saveBtn.style.display = 'none';\n  };\n\n  deleteBtn.onclick = () => {\n    notes.splice(index, 1);\n    saveNotes();\n    noteDiv.remove();\n  };\n\n  noteDiv.appendChild(noteContent);\n  noteDiv.appendChild(editBtn);\n  noteDiv.appendChild(saveBtn);\n  noteDiv.appendChild(deleteBtn);\n  saveBtn.style.display = 'none';\n\n  return noteDiv;\n}\n\nfunction loadNotes() {\n  const container = document.getElementById('note-container');\n  container.innerHTML = '';\n  notes.forEach((note, index) => {\n    const noteElement = createNoteElement(note, index);\n    container.appendChild(noteElement);\n  });\n}\n\nloadNotes();\n`;

  editor.value = scriptContent;
  editor.style.display = 'block';
  document.getElementById('save-js-btn').style.display = 'inline';
};

// 儲存並應用 JS 變更
document.getElementById('save-js-btn').onclick = () => {
  const editor = document.getElementById('js-editor');
  const newScriptContent = editor.value;

  // 儲存新的程式碼
  localStorage.setItem('noteJsScript', newScriptContent);

  // 重啟頁面以應用新的程式碼
  location.reload();
};

// 預先載入筆記
loadNotes();
