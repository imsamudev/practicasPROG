const fs = require('fs').promises;
async function agregarDosPersonajesAlInicio() {
  try {
    const data = await fs.readFile('personajes.json', 'utf-8');
    let personajes = JSON.parse(data);

    const personaje1 = {
      id: 101,
      firstName: "Juanito",
      lastName: "Stark",
      fullName: "Juanito Stark",
      title: "Guardián del Norte",
      family: "Stark"
    };

    const personaje2 = {
      id: 102,
      firstName: "Jacquie",
      lastName: "Targaryen",
      fullName: "Jacquie Targaryen",
      title: "Reina Dragón",
      family: "Targaryen"
    };

    personajes.unshift(personaje1, personaje2);

    await fs.writeFile(
      'personajes.json',
      JSON.stringify(personajes, null, 2)
    );

    console.log(" 2 Personajes agregados al inicio");

  } catch (error) {
    console.error( error );
  }
}

agregarDosPersonajesAlInicio();