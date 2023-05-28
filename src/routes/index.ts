import { Router } from 'express';

import * as HomeController from '../controllers/homeController';
import * as InfoController from '../controllers/infoController';
import * as UserController from '../controllers/userController';

const router = Router();

router.get('/', HomeController.home);
router.get('/home', HomeController.pms);
router.get('/material', HomeController.material);
router.get('/vtrs', HomeController.vtrs);
router.get('/edit2', HomeController.edit);
router.get('/policiais', HomeController.policiais);
router.get('/viaturas', HomeController.viaturas);
router.get('/equipamentos', HomeController.equipamentos);
router.get('/diversos', HomeController.diversos);
router.get('/:matricula', HomeController.cautelas);
router.get('/:matricula/additem', InfoController.additem);
router.post('/:matricula/inserir', InfoController.inserir);
router.post('/buscareqp', InfoController.buscareqp);
router.post('/buscarpm', InfoController.buscarpm);
router.post('/login', UserController.login);
router.post('/newuser', UserController.newuser);
router.post('/newequip', UserController.newequip);




export default router;