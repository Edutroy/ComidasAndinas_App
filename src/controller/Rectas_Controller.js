import APIController from "./API_controller.js";

class RecetasController {
  constructor(apiController) {
    this.apiController = new APIController();
  }

 /*  async getRecetas(req, res) {
    try {
      
      const ingredientexinput = req.body.ingredientexinput;
      
      const ingredient=ingredientexinput;
      const data = await this.apiController.fetchData(this.apiController.url);
      const comidasConIngrediente = data.comidas.filter((comida) =>
        comida.ingredientes.includes(ingredient)
      );
      res.render('recetas', { meals: comidasConIngrediente });
      if (comidasConIngrediente.length > 0) {
        console.log(
          `El ingrediente "${ingredient}" se encuentra en las siguientes comidas:`
        );
        comidasConIngrediente.forEach((comida) => {
          console.log("Nombre: ", comida.nombre);
         // console.log("Ingredientes: ", comida.ingredientes);
          //console.log('Preparación: ', comida.preparacion);
          //console.log('Imagen: ', comida.imagen);
          console.log("------------------");
        });
      } else {
        console.log(
          `El ingrediente "${ingredient}" no se encuentra en ninguna comida.`
        );
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las recetas" });
      console.log(error);
    }
  } */

  /* async getRecetaById(req, res) {
    const id = parseInt(req.params.id);
    try {
      const data = await this.apiController.fetchData(this.apiController.url);
      const receta = data.comidas.find((receta) => receta.id === id);
      if (receta) {
        res.render("receta", { receta });
      } else {
        res.status(404).json({ message: "Receta no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la receta" });
    }
  } */
}

export default RecetasController;
