import { Router } from 'express';
const router = Router();
import { sysLogsServe } from '../src/serve/index';

router.get('/list', (req, res) => {
  console.log('get /');
  res.send('get /');
});

export default router;
