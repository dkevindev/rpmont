import { Router } from 'express';

import * as HomeController from '../controllers/homeController';
import * as InfoController from '../controllers/infoController';
import * as UserController from '../controllers/userController';

const router = Router();

router.get('/', HomeController.home);
router.get('/home', HomeController.pms);
router.get('/material', HomeController.material);
router.get('/vtrs', HomeController.vtrs);
router.get('/edit', HomeController.edit);
router.get('/:matricula', HomeController.cautelas);
router.post('/login', UserController.login);
router.post('/newuser', UserController.newuser);




export default router;