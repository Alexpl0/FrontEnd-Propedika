let dataTable;
let dataTableIsInitialized = false;

const web='http://localhost:8080/alumno';
const title = document.getElementById('title');
const descrip = document.getElementById('descrip');
const addAlumno = document.getElementById('addAlumnoForm');
//Elementos Propios de la pagina especifica
const id = document.getElementById('id');
const nombre= document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const email = document.getElementById('email');
const edad = document.getElementById('edad');
const telefono = document.getElementById('telefono');
const sexo = document.getElementById('sexo');

// creo que estos elementos no son necesarios
const tablaAlumnos = document.querySelector('.table');
const formAlumno = document.querySelector('.tablaContenido');

const btnAgregar = document.querySelector('.btnAddInfo');

const dataTableOptions ={
    //scrollX: "2000px",
    destroy: true,
    select: false,
};

const initDataTable = async () => {
    if(dataTableIsInitialized){
        dataTable.destroy();
    }

    await listAlumnos();

    dataTable = $("#datatable").DataTable(dataTableOptions);
    dataTableIsInitialized = true;
};

const listAlumnos= async () => {
    try{
        const response = await fetch('http://localhost:8080/alumno');
        const alumno = await response.json();

        let content='';
        alumno.forEach((alumno, index) => {
            content+=`
            <tr>
            <div>
                <td><input type="checkbox" id="checkbox"></td>
                <td id="alumnoID">${alumno.id}</td>
                <td id="nombre">${alumno.nombre}</td>
                <td id="apellido">${alumno.apellido}</td>
                <td id="email">${alumno.email}</td>
                <td id="edad">${alumno.edad}</td>
                <td id="telefono">${alumno.telefono}</td>
                <td id="sexo">${alumno.sexo}</td>
                <div>
                <td>
                    <button class="btn btn-sm btn-primary" id="editar" class="editar"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn btn-sm btn-danger" id="borrar" class="borrar"><i class="fa-solid fa-trash"></i></button>
                </td>
                </div>
            </div>
            </tr>`;
        });
        bodyTable.innerHTML = content;
    }
        catch(error){
            console.log(error);
        }
    };

    //Con esto comienza todo la primera vez
    window.addEventListener("load", async () => {
        initDataTable();
        title.innerText = 'Lista de Alumnos';
        descrip.innerText = 'Aqui puedes ver la lista de alumnos';
    });



    //Codigo para Agrergar Alumno
    document.getElementById('btnAddInfo').addEventListener('click', async (e) => {
    
    e.preventDefault();

    console.log(nombre.value);
    if (nombre.value === '' || apellido.value === '' || email.value === '' || edad.value === '' || telefono.value === '' || sexo.value === '') {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor, complete todos los campos',
            icon: 'error',
        });
        return;
    }
    fetch(web, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre.value,
            apellido: apellido.value,
            email: email.value,
            edad: edad.value,
            telefono: telefono.value,
            sexo: sexo.value
        })
    })
    .then((response) => response.json())
    .then((data) => {
        const dataArr = [];
        dataArr.push(data);
        Swal.fire({
            title: 'Agregado!',
            text: 'El alumno se agregó correctamente',
            icon: 'success',
        }).then(() => {
            window.location.reload();
        });
        addAlumno.reset();
        initDataTable();
    })
    .catch((error) => {
        Swal.fire({
            title: 'Error!',
            text: 'Hubo un error al agregar el alumno',
            icon: 'error',
        });
    });
});

//Codigo para Borrar y Editar Alumno
formAlumno.addEventListener('click', (e) => {
    //console.log(e.target.id);
    e.preventDefault();

    let deleteButton = e.target.id=='borrar';
    let editButton = e.target.id=='editar';
    
    let id= e.target.parentElement.parentElement.querySelector('#alumnoID').textContent;

    if(deleteButton){
        console.log('borrar alumno');
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrarlo!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${web}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                    
                })
                
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(`${web}/${id}`);
                    Swal.fire(
                        'Borrado!',
                        'El alumno ha sido borrado.',
                        'success'
                    ).then(() => {
                        window.location.reload();
                    });
                })
                .catch((error) => {
                    console.error('There was a problem with the fetch operation:', error);
                });
                window.location.reload();
            }
        });
    }

    if(editButton){
        let parent = e.target.parentElement.parentElement;
        console.log('editar alumno');
        console.log(parent);
        let idE = parent.querySelector('#alumnoID').textContent;
        let nombreE = parent.querySelector('#nombre').textContent;
        let apellidoE = parent.querySelector('#apellido').textContent;
        let emailE = parent.querySelector('#email').textContent;
        let edadE = parent.querySelector('#edad').textContent;
        let telefonoE = parent.querySelector('#telefono').textContent;
        let sexoE = parent.querySelector('#sexo').textContent;
        console.log(idE, nombreE, apellidoE, emailE, edadE, telefonoE, sexoE);
        
        nombre.value = nombreE;
        apellido.value = apellidoE;
        email.value = emailE;
        edad.value = edadE;
        telefono.value = telefonoE;
        sexo.value = sexoE;
        
    btnAgregar.textContent = 'Actualizar';
document.getElementById('btnAddInfo').addEventListener('click', async (e) => {
        e.preventDefault();
        console.log('actualizar alumno');
    
        fetch(`${web}/${idE}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },

                body: JSON.stringify({
                    id: idE,
                    nombre: nombre.value,
                    apellido: apellido.value,
                    email: email.value,
                    edad: edad.value,
                    telefono: telefono.value,
                    sexo: sexo.value
                })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            Swal.fire({
                title: 'Actualizado!',
                text: 'El alumno se actualizó correctamente',
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
            addAlumno.reset();
            initDataTable();
        })
        .catch((error) => {
            Swal.fire({
                title: 'Error!',
                text: 'Hubo un error al actualizar el alumno',
                icon: 'error',
            });
        });
    });
    };
});

//Cargar el formulario de Alumno la primera vez
window.addEventListener('load', async () => {
    await formAlumnoShow();
});

const formAlumnoShow= async () => {
    try{
    let formHtml = `
        <div class="NuevoAlumno">
            <form class="addAlumnoForm">
                <h3>Info Alumno</h3>
                <input type="text" id="nombre" placeholder="Nombre" required><br>
                <input type="text" id="apellido" placeholder="Apellido" required><br>
                <input type="text" id="email" placeholder="Email" required><br>
                <input type="text" id="edad" placeholder="Edad" required><br>
                <input type="text" id="telefono" placeholder="Telefono" required><br>
                <input type="text" id="sexo" placeholder="Sexo" required><br>
                <button type="submit" class="btnAddInfo" id="btnAddInfo">Agregar Alumno</button>
                <br>
            </form>
        </div>
    `;

    formContainer.innerHTML = formHtml;

    }catch(error){
        console.log(error);
    }
};

document.getElementById('selectAlumnos').addEventListener('click', async () => {
        initDataTable();
        await formAlumnoShow();
        title.innerText = 'Lista de Alumnos';
        descrip.innerText = 'Aqui puedes ver la lista de alumnos';
    });