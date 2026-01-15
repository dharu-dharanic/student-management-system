let page = 1;
let sort = "";
let order = "asc";
let editingId = null;
let editingClassId = null;

const API = "http://localhost:5000";

// ---------------- CLASSES ----------------
async function loadClasses() {
  const res = await fetch(`${API}/classes`);
  const classes = await res.json();

  const select = document.getElementById("classId");
  const list = document.getElementById("classList");

  select.innerHTML = "";
  list.innerHTML = "";

  classes.forEach(c => {
    // dropdown
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.name;
    select.appendChild(opt);

    // class list
    const li = document.createElement("li");
    li.className = "flex justify-between bg-gray-100 p-2 rounded";

    li.innerHTML = `
      <span>${c.name}</span>
      <div>
        <button onclick="editClass(${c.id}, '${c.name}')" class="text-blue-600 mr-2">Edit</button>
        <button onclick="deleteClass(${c.id})" class="text-red-600">Delete</button>
      </div>
    `;

    list.appendChild(li);
  });
}

async function addClass() {
  const name = document.getElementById("className").value.trim();
  if (!name) return alert("Enter class name");

  if (editingClassId) {
    await fetch(`${API}/classes/${editingClassId}`, {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ name })
    });
    editingClassId = null;
  } else {
    await fetch(`${API}/classes`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ name })
    });
  }

  document.getElementById("className").value = "";
  loadClasses();
}

function editClass(id, name) {
  editingClassId = id;
  document.getElementById("className").value = name;
}

async function deleteClass(id) {
  if (!confirm("Delete this class?")) return;
  await fetch(`${API}/classes/${id}`, { method: "DELETE" });
  loadClasses();
  loadStudents();
}

// ---------------- STUDENTS ----------------
async function loadStudents() {
  const search = document.getElementById("search").value;

  const res = await fetch(
    `${API}/students?search=${search}&page=${page}&limit=5&sort=${sort}&order=${order}`
  );
  const data = await res.json();

  const tbody = document.getElementById("students");
  tbody.innerHTML = "";

  data.students.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="border p-2">${s.name}</td>
      <td class="border p-2">${s.email}</td>
      <td class="border p-2">${s.age}</td>
      <td class="border p-2">${s.Class.name}</td>
      <td class="border p-2">
        <button onclick="editStudent(${s.id}, '${s.name}', '${s.email}', ${s.age}, ${s.classId})" class="text-blue-600">Edit</button>
        <button onclick="deleteStudent(${s.id})" class="text-red-600 ml-2">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("page").innerText = page;
}

async function saveStudent() {
  const name = nameInput.value;
  const email = emailInput.value;
  const age = ageInput.value;
  const classId = classIdInput.value;

  if (!name || !email || !age || !classId) return alert("All fields required");

  if (editingId) {
    await fetch(`${API}/students/${editingId}`, {
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({name,email,age,classId})
    });
    editingId = null;
    saveBtn.textContent = "Add Student";
  } else {
    await fetch(`${API}/students`, {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({name,email,age,classId})
    });
  }

  nameInput.value = emailInput.value = ageInput.value = "";
  loadStudents();
}

function editStudent(id,name,email,age,classId){
  editingId=id;
  nameInput.value=name;
  emailInput.value=email;
  ageInput.value=age;
  classIdInput.value=classId;
  saveBtn.textContent="Update Student";
}

async function deleteStudent(id){
  if(!confirm("Delete student?")) return;
  await fetch(`${API}/students/${id}`,{method:"DELETE"});
  loadStudents();
}

// Pagination
function next(){ page++; loadStudents(); }
function prev(){ if(page>1) page--; loadStudents(); }

// Sorting
function sortBy(col){
  sort=col;
  order = order==="asc"?"desc":"asc";
  loadStudents();
}

// Init
loadClasses();
loadStudents();
