let page = 1;

let sort = "";

let order = "asc";

let editingId = null;

let editingClassId = null;

const API = "http://localhost:5000";

/* ---------- ELEMENTS ---------- */

const nameInput =
  document.getElementById("name");

const emailInput =
  document.getElementById("email");

const ageInput =
  document.getElementById("age");

const classIdInput =
  document.getElementById("classId");

const classNameInput =
  document.getElementById("className");

const searchInput =
  document.getElementById("search");

const saveBtn =
  document.getElementById("saveBtn");

/* ---------- LOCAL STORAGE ---------- */

window.addEventListener(
  "DOMContentLoaded",
  () => {

    const savedSearch =
      localStorage.getItem(
        "studentSearch"
      );

    if (
      savedSearch &&
      searchInput
    ) {

      searchInput.value =
        savedSearch;

    }

  }
);

/* ---------- SAVE SEARCH ---------- */

if (searchInput) {

  searchInput.addEventListener(
    "keyup",
    () => {

      localStorage.setItem(
        "studentSearch",
        searchInput.value
      );

    }
  );

}

/* ---------- MOBILE NAV ---------- */

function toggleMenu() {

  document
    .getElementById("navLinks")
    .classList.toggle("show-menu");

}

/* ---------- LOAD CLASSES ---------- */

async function loadClasses() {

  try {

    const res =
      await fetch(
        `${API}/classes`
      );

    const classes =
      await res.json();

    const select =
      document.getElementById(
        "classId"
      );

    const list =
      document.getElementById(
        "classList"
      );

    if (select) {

      select.innerHTML = `
        <option value="">
          Select Class
        </option>
      `;

    }

    if (list) {

      list.innerHTML = "";

    }

    classes.forEach(c => {

      /* ---------- SELECT ---------- */

      if (select) {

        const option =
          document.createElement(
            "option"
          );

        option.value = c.id;

        option.textContent =
          c.name;

        select.appendChild(option);

      }

      /* ---------- CLASS LIST ---------- */

      if (list) {

        const li =
          document.createElement(
            "li"
          );

        li.innerHTML = `

          <span>
            ${c.name}
          </span>

          <div>

            <button
              onclick="editClass(${c.id}, '${c.name}')"
              class="action-btn"
            >
              Edit
            </button>

            <button
              onclick="deleteClass(${c.id})"
              class="action-btn btn-danger"
            >
              Delete
            </button>

          </div>

        `;

        list.appendChild(li);

      }

    });

  } catch(error) {

    console.log(error);

  }

}

/* ---------- ADD CLASS ---------- */

async function addClass() {

  try {

    const name =
      classNameInput.value.trim();

    if (!name) {

      alert(
        "Please enter class name"
      );

      return;

    }

    if (editingClassId) {

      await fetch(
        `${API}/classes/${editingClassId}`,
        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({
            name
          })

        }
      );

      editingClassId = null;

    } else {

      await fetch(
        `${API}/classes`,
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body: JSON.stringify({
            name
          })

        }
      );

    }

    classNameInput.value = "";

    loadClasses();

  } catch(error) {

    console.log(error);

  }

}

/* ---------- EDIT CLASS ---------- */

function editClass(id, name) {

  editingClassId = id;

  classNameInput.value = name;

}

/* ---------- DELETE CLASS ---------- */

async function deleteClass(id) {

  try {

    const confirmDelete =
      confirm(
        "Delete this class?"
      );

    if (!confirmDelete)
      return;

    await fetch(
      `${API}/classes/${id}`,
      {
        method: "DELETE"
      }
    );

    loadClasses();

    loadStudents();

  } catch(error) {

    console.log(error);

  }

}

/* ---------- LOAD STUDENTS ---------- */

async function loadStudents() {

  try {

    const tbody =
      document.getElementById(
        "students"
      );

    if (!tbody) return;

    const search =
      searchInput
        ? searchInput.value
        : "";

    const res =
      await fetch(

        `${API}/students?search=${search}&page=${page}&limit=5&sort=${sort}&order=${order}`

      );

    const data =
      await res.json();

    tbody.innerHTML = "";

    /* ---------- DATALIST ---------- */

    const datalist =
      document.getElementById(
        "studentSuggestions"
      );

    if (datalist) {

      datalist.innerHTML = "";

    }

    /* ---------- EMPTY STATE ---------- */

    if (
      !data.students.length
    ) {

      tbody.innerHTML = `

        <tr>

          <td colspan="5" class="empty-state">

            No Students Found

          </td>

        </tr>

      `;

      return;

    }

    data.students.forEach(
      student => {

        const tr =
          document.createElement(
            "tr"
          );

        tr.innerHTML = `

          <td>
            ${student.name}
          </td>

          <td>
            ${student.email}
          </td>

          <td>
            ${student.age}
          </td>

          <td>
            ${student.Class.name}
          </td>

          <td>

            <button
              onclick="editStudent(
                ${student.id},
                '${student.name}',
                '${student.email}',
                ${student.age},
                ${student.classId}
              )"
              class="action-btn"
            >
              Edit
            </button>

            <button
              onclick="deleteStudent(${student.id})"
              class="action-btn btn-danger"
            >
              Delete
            </button>

          </td>

        `;

        tbody.appendChild(tr);

        /* ---------- SEARCH LIST ---------- */

        if (datalist) {

          const option =
            document.createElement(
              "option"
            );

          option.value =
            student.name;

          datalist.appendChild(
            option
          );

        }

      }
    );

    document.getElementById(
      "page"
    ).textContent = page;

  } catch(error) {

    console.log(error);

  }

}

/* ---------- SAVE STUDENT ---------- */

async function saveStudent() {

  try {

    const name =
      nameInput.value.trim();

    const email =
      emailInput.value.trim();

    const age =
      ageInput.value;

    const classId =
      classIdInput.value;

    if (
      !name ||
      !email ||
      !age ||
      !classId
    ) {

      alert(
        "All fields required"
      );

      return;

    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(email)
    ) {

      alert(
        "Invalid Email"
      );

      return;

    }

    const payload = {

      name,
      email,
      age,
      classId

    };

    if (editingId) {

      await fetch(
        `${API}/students/${editingId}`,
        {

          method: "PUT",

          headers: {

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify(
              payload
            )

        }
      );

      editingId = null;

      saveBtn.textContent =
        "Add Student";

    } else {

      await fetch(
        `${API}/students`,
        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify(
              payload
            )

        }
      );

    }

    /* ---------- RESET ---------- */

    nameInput.value = "";

    emailInput.value = "";

    ageInput.value = "";

    classIdInput.selectedIndex = 0;

    loadStudents();

  } catch(error) {

    console.log(error);

  }

}

/* ---------- EDIT STUDENT ---------- */

function editStudent(
  id,
  name,
  email,
  age,
  classId
) {

  editingId = id;

  nameInput.value = name;

  emailInput.value = email;

  ageInput.value = age;

  classIdInput.value = classId;

  saveBtn.textContent =
    "Update Student";

}

/* ---------- DELETE STUDENT ---------- */

async function deleteStudent(id) {

  try {

    const confirmDelete =
      confirm(
        "Delete this student?"
      );

    if (!confirmDelete)
      return;

    await fetch(
      `${API}/students/${id}`,
      {
        method: "DELETE"
      }
    );

    loadStudents();

  } catch(error) {

    console.log(error);

  }

}

/* ---------- PAGINATION ---------- */

function next() {

  page++;

  loadStudents();

}

function prev() {

  if (page > 1) {

    page--;

  }

  loadStudents();

}

/* ---------- SORT ---------- */

function sortBy(column) {

  sort = column;

  order =
    order === "asc"
      ? "desc"
      : "asc";

  loadStudents();

}

/* ---------- INIT ---------- */

loadClasses();

loadStudents();