import { create } from "zustand"
import type { ITarea } from "../types/ITarea";

interface ITareaStore {

    tareas: ITarea[];
    tareaActiva: ITarea | null;
    setTareaActiva: (tareaActiva: ITarea | null) => void
    setArrayTareas: (arrayDeTareas: ITarea[]) => void
    agragrNuevaTarea: (nuevaTarea: ITarea) => void
    editarUnaTarea: (TareaActializada: ITarea) => void
    eliminarUnaTarea: (idTarea: string) => void

}

export const tareaStore = create<ITareaStore>((set) => ({

    tareas: [],
    tareaActiva: null,

    setArrayTareas: (arrayDeTareas) => set(() => ({ tareas: arrayDeTareas })),

    agragrNuevaTarea: (nuevaTarea) => set((state) => ({ tareas: [...state.tareas, nuevaTarea] })),

    editarUnaTarea: (tareaEditada) => set((state) => {
        const arregloTareas = state.tareas.map((tarea) => tarea.id === tareaEditada.id ? { ...tarea, ...tareaEditada } : tarea)
        return { tareas: arregloTareas }
    }),

    eliminarUnaTarea: (idTarea) => set((state) => {
        const arregloTareas = state.tareas.filter((tarea) => tarea.id !== idTarea)
        return { tareas: arregloTareas }
    }),

    setTareaActiva: (tareaActivaIn) => set(() => ({ tareaActiva: tareaActivaIn }))
    
}))