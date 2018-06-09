import express from 'express';
import homeRoutes from './home.route';
import adminRoutes from './admin.route';


const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);


// mount auth routes at /auth
router.use('/', homeRoutes);

router.use('/', adminRoutes);


export default router;
