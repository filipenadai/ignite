import express from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRouter = express.Router();

const categoriesRepository = new CategoriesRepository();

categoriesRouter.post('/', (request, response) => {
  const { name, description } = request.body;

  const createCategory = new CreateCategoryService(categoriesRepository);

  createCategory.execute({
    name,
    description,
  });

  return response.status(201).send();
});

export { categoriesRouter };
