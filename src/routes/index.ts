import { Router } from 'express';
import rentRouter from './rent.route';
import userRouter from './user.route';

const router = Router();

// Endpoint co check server status
router.get('/health-check', async (req, res) => {
  const healthCheck: any = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    res.send(healthCheck);
  } catch (e) {
    healthCheck.message = e;
    res.status(503).send();
  }
});

// Import all user routes
router.use('/users', userRouter);

// Import all rent routes
router.use('/rents', rentRouter);

export default router;
