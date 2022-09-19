import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId, invalidCarMock } from '../../mocks/carMock';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;

describe('Sua descrição', () => {
    const carModel = new CarModel();
    const carService = new CarService(carModel);

    before(async () => {
        sinon.stub(carModel, 'create').resolves(carMockWithId);
        sinon.stub(carModel, 'read').resolves([carMockWithId]);
        sinon.stub(carModel, 'readOne').onCall(0).resolves(carMockWithId).onCall(1).resolves(null)
        sinon.stub(carModel, 'update').onCall(0).resolves(carMockWithId).onCall(1).resolves(null)
        sinon.stub(carModel, 'delete').onCall(0).resolves(carMockWithId).onCall(1).resolves(null)
    });

    after(()=>{ sinon.restore();
    })

    describe('Post Car', () => {
        it('Success', async () => {
        const cars = await carService.create(carMock);
        expect(cars).to.be.deep.equal(carMockWithId)
        });

        it('Error', async () => {
            try{
                await carService.create(invalidCarMock as any);
            } catch (error) {
                expect(error).to.be.instanceOf(ZodError);
            }
        });
    });
    describe('Search cars', () => {
        it('Success', async () => {
        const cars = await carService.read();
        expect(cars).to.be.deep.equal([carMockWithId])
        });
    });

    describe('Search cars ID', () => {
        it('Success', async () => {
        const cars = await carService.readOne(carMockWithId._id);
        expect(cars).to.be.deep.equal(carMockWithId)
        });
        it('Failure', async () => {
            let error;
        try {
            await carService.readOne(carMockWithId._id);
            } catch (err: any) {
            error = err;
            }
            expect(error, "error should not be undefined").not.to.be.undefined;
            expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
            });
        });

    describe('Delete Car', () => {
		it('Success', async () => {
			const cars = await carService.delete(carMockWithId._id);
			expect(cars).to.be.deep.equal(carMockWithId);
		});
		it('Failure', async () => {
      let error;
			try {
				await carService.delete(carMockWithId._id);
			} catch (err: any) {
        error = err
			}
      expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
		});
	});
    describe('Update Frame', () => {
        it('Success', async () => {
            const cars = await carService.update(carMockWithId._id, carMock);
            expect(cars).to.be.deep.equal(carMockWithId);
        });
        it('Failure: invalid body', async () => {
            let error;
            try { 
                await carService.update(carMockWithId._id, carMockWithId as any);
            } catch (err: any) {
                error = err;
            }
            expect(error).to.be.instanceOf(ZodError);
        });
        it('Failure id not found', async () => {
            let error;
            try {
                await carService.update(carMockWithId._id, carMock);
            } catch (err: any) {
                error = err;
            }
            expect(error.message).to.be.deep.equal(ErrorTypes.EntityNotFound);
        });
    });
});