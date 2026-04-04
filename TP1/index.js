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

// resto de código
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
//resto de codigo

// consola parcial
async function main() {
  try {
    console.log("  TP1 – API Thrones - Programación III");

    await agregar_al_final();
    await ordenar_por_nombre_decreciente();
  } catch (error) {
    console.error("Error general en main:", error.message);
    process.exit(1);
  }
}

main();
