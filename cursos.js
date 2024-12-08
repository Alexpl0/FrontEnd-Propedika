//Elementos Propios de la pagina especifica
const idC = document.getElementById('id');
const titulo= document.getElementById('titulo');
const fuente = document.getElementById('fuente');
const url = document.getElementById('url');

// Constante para la tabla de contenido
const formContenido = document.querySelector('.tablaContenido');

btnAgregar;

const initDataTableContenido = async () => {
    if(dataTableIsInitialized){
        dataTable.destroy();
    }

    await listContenidos();

    dataTable = $("#datatable").DataTable(dataTableOptions);
    dataTableIsInitialized = true;
};

const listContenidos= async () => {
    try{
        const response = await fetch('http://localhost:8080/contenido');
        const contenido = await response.json();

        let content='';
        contenido.forEach((contenido, index) => {
            content+=`
            <tr>
            <div>
                <td><input type="checkbox" id="checkbox"></td>
                <td id="contenidoID">${contenido.id}</td>
                <td id="titulo">${contenido.titulo}</td>
                <td id="fuente">${contenido.fuente}</td>
                <td id="url">${contenido.url}</td>
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

    //Con esto comienza todo
    document.getElementById('selectCursos').addEventListener('click', async () => {
        initDataTableContenido();
        title.innerText = 'Lista de Contenidos';
        descrip.innerText = 'Aqui puedes ver la lista de Contenidos';
    });
    //----------------------------------------------


    //Codigo para Agrergar contenido
    document.getElementById('btnAddInfo').addEventListener('click', async (e) => {
    
    e.preventDefault();

    console.log(nombre.value);
    if (titulo.value === '' || fuente.value === '' || url.value === '') {
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
            titulo: titulo.value,
            fuente: fuente.value,
            url: url.value
        })
    })
    .then((response) => response.json())
    .then((data) => {
        const dataArr = [];
        dataArr.push(data);
        Swal.fire({
            title: 'Agregado!',
            text: 'El contenido se agregó correctamente',
            icon: 'success',
        }).then(() => {
            window.location.reload();
        });
        addcontenido.reset();
        initDataTableContenido();
    })
    .catch((error) => {
        Swal.fire({
            title: 'Error!',
            text: 'Hubo un error al agregar el contenido',
            icon: 'error',
        });
    });
});

//Codigo para Borrar y Editar contenido
formContenido.addEventListener('click', (e) => {
    //console.log(e.target.id);
    e.preventDefault();

    let deleteButton = e.target.id=='borrar';
    let editButton = e.target.id=='editar';
    
    let id= e.target.parentElement.parentElement.querySelector('#contenidoID').textContent;

    if(deleteButton){
        console.log('borrar contenido');
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
                        'El contenido ha sido borrado.',
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
        console.log('editar contenido');
        console.log(parent);
        let idE = parent.querySelector('#contenidoID').textContent;
        let tituloE = parent.querySelector('#titulo').textContent;
        let fuenteE = parent.querySelector('#fuente').textContent;
        let urlE = parent.querySelector('#url').textContent;
        console.log(idE, tituloE, fuenteE, urlE);
        
        titulo.value = tituloE;
        fuente.value = fuenteE;
        url.value = urlE;

        
    btnAgregar.textContent = 'Actualizar';
    document.getElementById('btnAddInfo').addEventListener('click', async (e) => {
        e.preventDefault();
        console.log('actualizar contenido');
    
        fetch(`${web}/${idE}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },

                body: JSON.stringify({
                    id: idE,
                    titulo: titulo.value,
                    fuente: fuente.value,
                    url: url.value
                })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            Swal.fire({
                title: 'Actualizado!',
                text: 'El contenido se actualizó correctamente',
                icon: 'success',
            }).then(() => {
                window.location.reload();
            });
            addcontenido.reset();
            initDataTableContenido();
        })
        .catch((error) => {
            Swal.fire({
                title: 'Error!',
                text: 'Hubo un error al actualizar el contenido',
                icon: 'error',
            });
        });
    });
    };
});

document.getElementById('selectCursos').addEventListener('click', async () => {
    await formContenidoShow();
});

const formContenidoShow= async () => {
    try{
    let formHtml = `
        <div class="Nuevocontenido">
            <form class="addcontenidoForm">
                <h3>Info Contenido</h3>
                <input type="text" id="titulo" placeholder="Titulo" required><br>
                <input type="text" id="fuente" placeholder="Fuente" required><br>
                <input type="text" id="url" placeholder="URL" required><br>
                <button type="submit" class="btnAddInfo" id="btnAddInfo">Agregar contenido</button>
                <br>
            </form>
        </div>
    `;

    formContainer.innerHTML = formHtml;

    }catch(error){
        console.log(error);
    }
};