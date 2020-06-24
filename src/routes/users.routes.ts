import { Router } from 'express';

const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
  try {
    return response.json({});
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRoutes;
