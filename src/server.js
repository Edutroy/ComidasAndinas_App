import express from "express";
import morgan from "morgan";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import exphbs from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser';
import IndexController from "./controller/index.js";
//import ViewsController  from './controller/views_controller.js'
import RecetaRouter from './controller/RecetaRouter.js';
import APIController from "./model/API_controller.js";
import RecetasController from "./model/Rectas_Controller.js";

class Server {
  constructor() {
    this.app = express();
    this.setup();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  setup() {
    const __filename = fileURLToPath(import.meta.url);
    this.__dirname = dirname(__filename);
    this.app.use(express.static(path.join(this.__dirname, 'public')));

    this.app.set('views', path.join(this.__dirname, 'views'));
    this.app.engine('.hbs', exphbs.engine({
      defaultLayout: 'main',
      layoutsDir: path.join(this.app.get('views'), 'layouts'),
      partialsDir: path.join(this.app.get('views'), 'partials'),
      extname: '.hbs',
    }));
    this.app.set('view engine', '.hbs');
    
    this.recetaModel = {}; // Aquí puedes definir tu objeto recetaModel o asignar los datos correspondientes
    this.url = 'https://edutroy.github.io/andean_foods/andean_foods.json'; // Aquí puedes establecer la URL correspondiente


 /*    const recetaRouter= new RecetaRouter();
const apiController = new APIController(fetch.bind(global), recetaRouter.recetaController); */

const apiController = new APIController();
apiController.setURL(this.url); // Establece la URL en el controlador APIController
const recetasController = new RecetasController(apiController);
this.recetasController = recetasController;

  
/* const url = 'https://edutroy.github.io/andean_foods/andean_foods.json';
      
     apiController.setURL(url);
    apiController.getData();
    apiController.getbyid(1);
    apiController.getByIngredientes("Sal");
    
  */
    
  }

  middlewares() {
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    
  }

  routes() {
   /*  const indexController = new IndexController();
    this.app.use('/', indexController.router); */
    
    const indexController = new IndexController();
    const recetaRouter = new RecetaRouter({recetaModel:this.recetaModel, url:this.url});
    this.app.use('/', indexController.router);
    this.app.use('/recetas', recetaRouter.router);
     
  }

  errorHandler() {
    this.app.use((req, res, next) => {
      res.status(404).json({ message: "Not found" });
    });
  }

  listen(port) {
    this.app.listen(port, () => {
      console.log(`El servidor está escuchando en http://localhost:${port}`);
    });
  }
}

export default Server;
