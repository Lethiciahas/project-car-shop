import IService from '../interfaces/IService';
import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

class CarService implements IService<ICar> {
  private _car:IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._car = model;
  }
  public async create(obj:ICar):Promise<ICar> {
    CarZodSchema.parse(obj);
    return this._car.create(obj);
  }

  public async read():Promise<ICar[]> {
    return this._car.read();
  }

  public async readOne(_id: string):Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id:string, obj:ICar):Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    
    const updateCar = await this._car.update(_id, obj);
    if (!updateCar) throw new Error(ErrorTypes.EntityNotFound);
    return updateCar;
  }

  public async delete(_id:string): Promise<ICar> {
    const car = await this._car.delete(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }
}

export default CarService;