import { Router } from 'express';
import CarController from '../controllers/CarControler';
import CarModel from '../models/CarModel';
import CarService from '../services/CarService';

const route = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

route.post('/cars', (req, res) => carController.create(req, res));
route.get('/cars', (req, res) => carController.read(req, res));
route.get('/cars/:id', (req, res) => carController.readOne(req, res));
route.put('/cars', (req, res) => carController.update(req, res));

export default route;