import fs from "fs";
import fsPromises from "fs/promises";

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
//const nuevo_personaje = await agregar_personaje();
//console.log(nuevo_personaje)

//BUSCAR PERSONAJE - 1-c
const personaje = await buscar_personaje(52);
console.log(personaje);

//GUARDAR PERSONAKE EN UN ARCHIVO - 1-d
const lista_personajes = await obtener_personajes();
guardar_json(JSON.stringify(lista_personajes, null, 2));


// 2-C - Eliminar el primer personaje, mostrar en consola el elemento eliminado.
async function eliminar_primer_personaje() {
    try {
        // Leer y convertir el JSON a un array de objetos
        const data = await fsPromises.readFile("personajes.json", "utf-8");
        const personajes = JSON.parse(data);

        // Eliminar el primer personaje
        const eliminado = personajes.shift();

        // Guardar el JSON actualizado
        await fsPromises.writeFile(
            "personajes.json",
            JSON.stringify(personajes, null, 2)
        );

        // Retornar el personaje eliminado
        return eliminado;

    } catch (error) {
        console.error("\nError al eliminar el personaje:", error);
    }
}

// Ejecutar la función y mostrar (2-C)
const personaje_eliminado = await eliminar_primer_personaje();
console.log("\nPersonaje eliminado:", personaje_eliminado);
