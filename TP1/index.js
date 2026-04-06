import fs from "fs";

async function obtener_personajes() {
  try {
    const response = await fetch("https://thronesapi.com/api/v2/Characters");
    if (!response.ok) throw new Error("Error al obtener la lista");
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

async function buscar_personaje(id) {
  try {
    const response = await fetch(
      `https://thronesapi.com/api/v2/Characters/${id}`,
    );
    if (!response.ok) throw new Error("Error al obtener el personaje");
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

async function agregar_personaje() {
  try {
    const personaje = {
      id: 992,
      firstName: "Marito",
      lastName: "Barak",
      fullName: "Marito Barak",
      title: "Sir",
      family: "House Bananero",
      image: "Sir Marito Barak",
      imageUrl: "https://assets.dev-filo.dift.io/img/2020/03/04/portada_sq.jpg",
    };

    const response = await fetch("https://thronesapi.com/api/v2/Characters", {
      method: "POST",
      body: JSON.stringify(personaje),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error("Error al agregar personaje");
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

function guardar_json(json) {
  try {
    const archivo = fs.writeFileSync("personajes.json", json);
  } catch (error) {
    console.error("Error al escribir el archivo");
  }
}

// LISTAR PERSONAJES - 1-a
const personajes = await obtener_personajes();
console.log(personajes);

// AGREGAR PESONAJE - 1-b
const nuevo_personaje = await agregar_personaje();
console.log(nuevo_personaje);

//BUSCAR PERSONAJE - 1-c
const personaje = await buscar_personaje(52);
console.log(personaje);

//GUARDAR PERSONAKE EN UN ARCHIVO - 1-d
const lista_personajes = await obtener_personajes();
guardar_json(JSON.stringify(lista_personajes, null, 2));

// resto de código
// función de utilidad para leer json local
async function leer_archivo() {
  try {
    const contenido = await fs.readFile(ARCHIVO_PERSONAJES, "utf-8");
    return JSON.parse(contenido);
  } catch (error) {
    if (error.code === "ENOENT") return [];
    console.error("Error al leer el archivo:", error.message);
    throw error;
  }
}
// guardar array actualizado en el archivo json local
async function guardar_archivo(personajes) {
  try {
    await fs.writeFile(
      ARCHIVO_PERSONAJES,
      JSON.stringify(personajes, null, 2),
      "utf-8",
    );
  } catch (error) {
    console.error("Error al guardar el archivo:", error.message);
    throw error;
  }
}

// se genera un id unico que se basa en el máximo id existente
function generar_id(personajes) {
  if (personajes.length === 0) return 1;
  return Math.max(...personajes.map((p) => p.id)) + 1;
}

// 2-a) agregar un personaje al final del archivo

async function agregar_al_final() {
  try {
    const personajes = await leer_archivo();

    const nuevo = {
      id: generar_id(personajes),
      firstName: "Adrian",
      lastName: "Perez",
      fullName: "Adrian Perez",
      title: "El Bananero",
      family: "House Bananero",
      image: "adrian.jpg",
      imageUrl: "https://thronesapi.com/assets/images/adrian.jpg",
    };

    personajes.push(nuevo);
    await guardar_archivo(personajes);

    console.log("2a) Personaje agregado al FINAL");
    console.log("Personaje agregado:", nuevo);
    console.log(`Total de personajes: ${personajes.length}`);
  } catch (error) {
    console.error("Error en agregar_al_final:", error.message);
    throw error;
  }
}

// 2-b) agregar dos personajes al inicio del archivo
async function agregar_al_inicio() {
  try {
    const personajes = await leer_archivo();

    const personaje1 = {
      id: generar_id(personajes),
      firstName: "Juanito",
      lastName: "Stark",
      fullName: "Juanito Stark",
      title: "Guardián del Norte",
      family: "House Stark",
      image: "juanito.jpg",
      imageUrl: "https://thronesapi.com/assets/images/juanito.jpg",
    };

    const personaje2 = {
      id: personaje1.id + 1,
      firstName: "Jacquie",
      lastName: "Targaryen",
      fullName: "Jacquie Targaryen",
      title: "Reina Dragón",
      family: "House Targaryen",
      image: "jacquie.jpg",
      imageUrl: "https://thronesapi.com/assets/images/jacquie.jpg",
    };

    personajes.unshift(personaje1, personaje2);
    await guardar_archivo(personajes);

    console.log("2b) Dos personajes agregados al INICIO");
    console.log("Personaje 1 agregado:", personaje1);
    console.log("Personaje 2 agregado:", personaje2);
    console.log(`Total de personajes: ${personajes.length}`);
  } catch (error) {
    console.error("Error en agregar_al_inicio:", error.message);
    throw error;
  }
}

// 2-c) Eliminar el primer personaje, mostrar en consola el elemento eliminado
async function eliminar_primer_personaje() {
  try {
    const personajes = await leer_archivo();

    const eliminado = personajes.shift();
    await guardar_archivo(personajes);

    console.log("2c) Primer personaje ELIMINADO:", eliminado);
    console.log(`Total de personajes restantes: ${personajes.length}`);
    return eliminado;
  } catch (error) {
    console.error("Error en eliminar_primer_personaje:", error.message);
    throw error;
  }
}

// 2-d) Crear un nuevo archivo que solo contenga id y fullName de cada personaje
async function guardar_nueva_lista() {
  try {
    const personajes = await leer_archivo();

    const contenido = personajes.map((personaje) => ({
      id: personaje.id,
      fullName: personaje.fullName,
    }));

    await fs.writeFile(
      ARCHIVO_NOMBRES,
      JSON.stringify(contenido, null, 2),
      "utf-8",
    );

    console.log("2d) Lista reducida (id + fullName) guardada en archivo");
    console.log("Primeros 3:", contenido.slice(0, 3));
  } catch (error) {
    console.error("Error en guardar_nueva_lista:", error.message);
    throw error;
  }
}
// 2-e) Ordenar los nombres de forma decreciente
async function ordenar_por_nombre_decreciente() {
  try {
    const contenido = await fs.readFile(ARCHIVO_NOMBRES, "utf-8");
    const solo_nombres = JSON.parse(contenido);

    // sort con localeCompare en orden decreciente, b antes que a
    const ordenados = [...solo_nombres].sort((a, b) =>
      b.fullName.localeCompare(a.fullName),
    );

    console.log("2e) Personajes ordenados por nombre DECRECIENTE");
    console.log(ordenados);
    return ordenados;
  } catch (error) {
    console.error("Error en ordenar_por_nombre_decreciente:", error.message);
    throw error;
  }
}

// consola parcial
async function main() {
  try {
    console.log("  TP1 – API Thrones - Programación III");

    await agregar_al_final();
    await agregar_al_inicio();
    await eliminar_primer_personaje();
    await guardar_nueva_lista();
    await ordenar_por_nombre_decreciente();
  } catch (error) {
    console.error("Error general en main:", error.message);
    process.exit(1);
  }
}

main();
