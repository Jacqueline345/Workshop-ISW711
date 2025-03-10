function assignEditEvents() {
  for (let el of document.getElementsByClassName('edit_button')) {
    el.addEventListener('click', (e) => {
      console.log(e.target.id);
      alert(`element with id ${e.target.id} clicked`);
      e.preventDefault();
    });
  }

}

async function getTeachers() {
  const response = await fetch("http://localhost:3001/teachers");
  const teachers = await response.json();
  console.log('teachers:', teachers);

  if(teachers) {
    const container = document.getElementById('result');
    container.innerHTML = '';
    teachers.forEach(element => {
      const item = document.createElement('li');
      item.innerHTML = `${element.first_name} ${element.last_name} <a href="../client/edit.html?id=${element._id}">Edit</a>  <a href="#" onclick="deleteTeacher('id=${element._id}')">Delete</a>`;
      item.setAttribute('data-id',element._id);
      container.appendChild(item)
    });
    assignEditEvents();
  }
}

async function createTeacher() {
  let teacher =  {
    first_name: document.getElementById('first_name').value,
    last_name: document.getElementById('last_name').value,
    cedula: document.getElementById('cedula').value,
    age: document.getElementById('age').value
  }

  const response = await fetch("http://localhost:3001/teachers",{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(teacher)
  });

  if(response && response.status == 201){
    teacher = await response.json();
    console.log('Teacher saved', teacher);
    alert('Usuario guardado');
  } else {
    alert("Shit's on fire! ");
  }
}

  async function updateTeacher() {
    let teacher =  {
      first_name: document.getElementById('first_name').value,
      last_name: document.getElementById('last_name').value,
      cedula: document.getElementById('cedula').value,
      age: document.getElementById('age').value
    }
  
    const response = await fetch(`http://localhost:3001/teachers?id=${document.getElementById('teacher_id').value}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(teacher)
    });
  
    if(response && response.ok){
      teacher = await response.json();
      console.log('Teacher updated', teacher);
      alert('Usuario actualizado');
    } else {
      alert("Hubo un problema al actualizar el profesor");
    }
  }

  async function deleteTeacher() {
    const response = await fetch(`http://localhost:3001/teachers?id=${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if(response && response.ok){
      console.log('Teacher deleted');
      alert('Usuario eliminado');
      const teacherElement = document.getElementById(id); // Si cada profesor tiene un id único en el DOM
      if (teacherElement) {
        teacherElement.remove();
      }
    } else {
      alert("Hubo un problema al eliminar el profesor");
    }
  }
  async function createTeacher() {
    let teacher =  {
      first_name: document.getElementById('first_name').value,
      last_name: document.getElementById('last_name').value,
      cedula: document.getElementById('cedula').value,
      age: document.getElementById('age').value
    }
  
    const response = await fetch("http://localhost:3001/teachers",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(teacher)
    });
  
    if(response && response.status == 201){
      teacher = await response.json();
      console.log('Teacher saved', teacher);
      alert('Usuario guardado');
    } else {
      alert("Shit's on fire! ");
    }
  }