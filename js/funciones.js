import Citas from './clases/Citas.js';
import UI from './clases/UI.js';

import { 
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    formulario 
} from './selectores.js';

const administrarCitas = new Citas();
const ui = new UI(administrarCitas);
let editando;

// Objeto principal
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

// Agrega datos al objeto de la cita
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

// Valida y agrega nueva cita a la clase de citas
export function nuevaCita(e) {
    e.preventDefault();

    // Extraer la informacion del objeto cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validacion
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        ui.imprimirAlert('Todos los campos son Obligatorios', 'error');

        return;
    }

    if (editando) {
        ui.imprimirAlert('Editado correctamente');

        // Pasar el objeto de la cita a edicion
        administrarCitas.editarCita({ ...citaObj });

        // Regresando el texto del boton a su estado inicial
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        // Quitando modo edicion
        editando = false;
    } else {
        // Generando id unico
        citaObj.id = Date.now();

        // Creando una nueva cita
        administrarCitas.agregarCita({ ...citaObj });

        // Mensaje de agregado correctamente
        ui.imprimirAlert('Se agrego correctamente');
    }

    // Reiniciando el objeto
    reiniciarObjeto();

    // Reiniciando el formulario
    formulario.reset();

    // Mostrar html de las citas
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id) {
    // Eliminando la cita
    administrarCitas.eliminarCita(id);

    // Mostrando un mensaje
    ui.imprimirAlert('La cita se elimino correctamente');

    // Refrescando lista de citas en html
    ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Llenando el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Llenando los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    editando = true;
}