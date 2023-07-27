class APIController {
  //Uso de singleton  
    constructor() {
      if (APIController.instance) {
        return APIController.instance;
      }
      this.url = null; // Asegúrate de inicializar la URL en null
      APIController.instance = this;
    } 
    
    setURL(url) {
      this.url = url;
    }
    setID(){
      this.id=id;
    }
  
    fetchData() {
      return fetch(this.url)
        .then(response => {
          console.log('Conexión a la API exitosa');
          return response.json();})
        .catch(error => {
          throw new Error(`Error al obtener los datos de la API: ${error.message}`);
        });
    } 
  
   async getData() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      console.log(data); 
      return data;
    } catch (error) {
      console.log('Error:', error);
    }
    }
    async getbyid(id) {

      try {
        const response = await fetch(this.url);
        const data = await response.json();
        
        // Buscar la receta por ID en los datos obtenidos
        const receta = data.comidas.find((receta) => receta.id === id);
    
        if (receta) {
          // Aquí puedes realizar la lógica adicional para procesar los datos de la receta
          const nombre = receta.nombre;
          const ingredientes = receta.ingredientes;
          const preparacion = receta.preparacion;
          const imagen = receta.imagen;
          console.log("heloooooooooooooo")
          console.log("Nombre: ", nombre);
          console.log("Ingredientes: ", ingredientes);
          console.log("Preparación: ", preparacion);
          console.log("Imagen: ", imagen);
        } else {
          console.log("Receta no encontrada");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    async getByIngredientes(ingredient) {
      try {
        const response = await fetch(this.url);
        const data = await response.json();
  
        // Buscar el ingrediente en las comidas
        const comidasConIngrediente = data.comidas.filter(comida =>
          comida.ingredientes.includes(ingredient)
        );
  
        if (comidasConIngrediente.length > 0) {
          console.log(`El ingrediente "${ingredient}" se encuentra en las siguientes comidas:`);
          comidasConIngrediente.forEach(comida => {
            console.log('Nombre: ', comida.nombre);
            console.log('Ingredientes: ', comida.ingredientes);
            //console.log('Preparación: ', comida.preparacion);
            //console.log('Imagen: ', comida.imagen);
            console.log('------------------');
          });
        } else {
          console.log(`El ingrediente "${ingredient}" no se encuentra en ninguna comida.`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    

    
  }
  
export default APIController;