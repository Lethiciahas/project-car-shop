import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMock';
import sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
const { expect } = chai;

describe('Teste CarModel', () => {
    const carModel = new CarModel();
    before(async () => {
        sinon.stub(Model, 'create').resolves(carMockWithId);
    });
    
    after(()=>{
    sinon.restore();
})
    describe('creating a car', () => {
        it('successfully created', async () => {
            const newCar = await carModel.create(carMock);
            expect(newCar).to.be.deep.equal(carMockWithId)
        })
    });

});