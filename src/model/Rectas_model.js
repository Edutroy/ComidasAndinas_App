import APIController from "./Api_model.js";

class RecetasController {
  constructor(apiController) {
    this.apiController = new APIController();
  }

   async getRecetas(req, res) {
    try {
      
      const ingredientexinput = req.body.ingredientexinput;
      const ingredient=ingredientexinput;
      const data = await this.apiController.fetchData(this.apiController.url);
      const comidasConIngrediente = data.comidas.filter((comida) =>
        comida.ingredientes.includes(ingredient)
      );
      const isMealsEmpty = comidasConIngrediente.length === 0;
      res.render('recetas', { meals: comidasConIngrediente , isMealsEmpty});
      if (comidasConIngrediente.length > 0) {
        console.log(
          `El ingrediente "${ingredient}" se encuentra en las siguientes comidas:`
        );
        comidasConIngrediente.forEach((comida) => {

          console.log("Nombre: ", comida.nombre);
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
  } 



  async showRecipeDetails(req, res) {
    try {
      const id = parseInt(req.params.id); // Asumiendo que la ruta tiene el parámetro de ID
      const data = await this.apiController.fetchData();
      const receta = data.comidas.find((receta) => receta.id === id);

      if (receta) {
        // Obtener los detalles de la receta para el modal
        const recipeDetails = {
          title: receta.nombre,
          ingredients: receta.ingredientes,
          preparation: receta.preparacion
        };

        // Renderizar la vista 'recetas' con la receta seleccionada y los detalles para el modal
        res.render('recetas', { meals: [receta], isMealsEmpty: false, recipeDetails });
      } else {
        res.status(404).json({ message: "Receta no encontrada" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener la receta" });
    }
  }
}

export default RecetasController;
