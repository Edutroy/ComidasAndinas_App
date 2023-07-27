import express from 'express';
import RecetasController from '../model/Rectas_Controller.js';

class RecetaRouter {
  constructor({ recetaModel, url }) {
    this.recetaModel = recetaModel;
    this.url = url;
    this.recetasController = new RecetasController(this.recetaModel,this.url);
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    
   // this.router.get('/:id', this.recetasController.getRecetaById.bind(this.recetasController));
    //this.router.post('/', this.recetasController.getRecetas.bind(this.recetasController));
    this.router.post('/', this.recetasController.getRecetas.bind(this.recetasController));
    this.router.get('/:id', this.recetasController.showRecipeDetails.bind(this.recetasController));
  }
}

export default RecetaRouter;
