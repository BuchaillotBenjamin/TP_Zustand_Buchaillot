import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import { editarTarea, eliminarTareaPorID, getAllTareas, postNuevaTarea } from "../http/tarea";
import type { ITarea } from "../types/ITarea";
import Swal from "sweetalert2";

export const useTareas = () => {

    const { tareas, setArrayTareas, agragrNuevaTarea, eliminarUnaTarea, editarUnaTarea } = tareaStore(

        useShallow((state) => ({

            tareas: state.tareas,
            setArrayTareas: state.setArrayTareas,
            agragrNuevaTarea: state.agragrNuevaTarea,
            eliminarUnaTarea: state.eliminarUnaTarea,
            editarUnaTarea: state.editarUnaTarea,

        }))

    )

    const getTareas = async () => {

        const data = await getAllTareas();

        if (data) {
            
            setArrayTareas(data);

        }

    }

    const crearTarea = async (nuevaTarea: ITarea) => {

        agragrNuevaTarea(nuevaTarea);

        try {

            await postNuevaTarea(nuevaTarea);
            Swal.fire("Éxito", "Tarea creada correctamente", "success");

        } catch (error) {

            eliminarUnaTarea(nuevaTarea.id!)
            console.log("Algo salio mal al crear la tarea");

        }

    }

    const putTareaEditar = async (tareaEditada: ITarea) => {

        const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id);
        editarUnaTarea(tareaEditada)

        try {

            await editarTarea(tareaEditada);
            Swal.fire("Éxito", "Tarea actualizada correctamente", "success");

        } catch (error) {

           if(estadoPrevio) editarUnaTarea(estadoPrevio);
            console.log("Algo salio mal al editar la tarea");

        }

    }

    const eliminarTarea = async (idTarea: string) => {

        const estadoPrevio = tareas.find((el) => el.id === idTarea);
        const confirm = await Swal.fire({

            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",

        })

        if(!confirm.isConfirmed)return;

        eliminarUnaTarea(idTarea);

        try {

            await eliminarTareaPorID(idTarea);
            Swal.fire("Eliminado", "La tarea se eliminó correctamente", "success");

        } catch (error) {

            if(estadoPrevio) agragrNuevaTarea(estadoPrevio)
            console.log("Algo salio mal al eliminar la tarea");

        }
    }

    return {

        tareas,
        getTareas,
        crearTarea,
        putTareaEditar,
        eliminarTarea,
        
    }
}
