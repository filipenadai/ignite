import express from 'express';

import { SpecificationsRepository } from '../modules/cars/repositories/implementations/SpecificationsRepository';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationRouter = express.Router();

const specificationsRepository = new SpecificationsRepository();

specificationRouter.post('/', (request, response) => {
  const { name, description } = request.body;

  const createSpecification = new CreateSpecificationService(
    specificationsRepository,
  );

  createSpecification.execute({
    name,
    description,
  });

  return response.status(201).send();
});

export { specificationRouter };
