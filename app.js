//import Swal from 'sweetalert2';

let dataTable;
let dataTableIsInitialized = false;

//const web='http://localhost:8080/alumno';
const addAlumno = document.querySelector('.addAlumnoForm');
const nombre= document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const email = document.getElementById('email');
const edad = document.getElementById('edad');
const telefono = document.getElementById('telefono');
const sexo = document.getElementById('sexo');

const dataTableOptions = {
    //scrollX: "2000px",
    destroy: true,
    select: true,
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
                <td><input type="checkbox" id="checkbox"></td>
                <td>${alumno.id}</td>
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${alumno.email}</td>
                <td>${alumno.edad}</td>
                <td>${alumno.telefono}</td>
                <td>${alumno.sexo}</td>
                <td>
                        <button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></i></button>
                        <button class="btn btn-sm btn-danger"><<i class="fa-solid fa-trash"></i>></i></button>
                </td>

                </tr>`;
        });
        bodyAlumno.innerHTML = content;
    }
        catch(error){
            console.log(error);
        }
    };

    window.addEventListener("load", async () => {
        initDataTable();
    });

    /*
addAlumno.addEventListener('submit', ( e ) => {
    
    e.preventDefault();

    console.log(nombre.value);
    fetch(web, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nombre: addAlumno.nombre.value,
            apellido: addAlumno.apellido.value,
            email: addAlumno.email.value,
            edad: addAlumno.edad.value,
            telefono: addAlumno.telefono.value,
            sexo: addAlumno.sexo.value,
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        const dataArr = [];
        dataArr.push(data);
        Swal.fire({
            title: 'Agregado!',
            text: 'El alumno se agrego correctamente',
            icon: 'success',
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
*/
