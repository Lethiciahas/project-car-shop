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

describe('Teste CarModel', () => {
    const carModel = new CarModel();
    before(async () => {
        sinon.stub(Model, 'find').resolves([carMockWithId]);
    });
    
    after(()=>{
    sinon.restore();
})
    describe('searching a car', () => {
        it('_id not found', async () => {
            try{
                await carModel.readOne('123ERRADO')
            } catch (error: any) {
                expect(error.message).to.be.eq('InvalidMongoId');
            }
        })
    });

});