import { Router } from 'express';
import multer from 'multer'

import * as HomeController from '../controllers/homeController';
import * as InfoController from '../controllers/infoController';
import * as UserController from '../controllers/userController';




const upload = multer({ dest: 'uploads/' })
const router = Router();

router.get('/', HomeController.home);
router.get('/home', HomeController.pms);
router.get('/material', HomeController.material);
router.get('/vtrs', HomeController.vtrs);
router.get('/relatorios', InfoController.relatorios);
router.get('/tabelas', InfoController.tabelas);
router.get('/edit2', HomeController.edit);
router.get('/policiais', HomeController.policiais);
router.get('/:prefixo/os', InfoController.oss);
router.get('/exibir/:os', InfoController.exibir);
router.get('/pg/:os', InfoController.pg);
router.post('/confirmar/:os', InfoController.confirmar);
router.get('/confirmar/:os', InfoController.confirmar);
router.get('/oss', HomeController.os);
router.get('/baixar', HomeController.baixar);
router.get('/equipamentos', HomeController.equipamentos);
router.get('/diversos', HomeController.diversos);
router.get('/pagar/:os', InfoController.pagar);
router.get('/baixar/:os', HomeController.baixaros);
router.get('/:matricula', HomeController.cautelas);
router.get('/:matricula/additem', InfoController.additem);
router.post('/:matricula/inserir', InfoController.inserir);
router.post('/buscareqp', InfoController.buscareqp);
router.post('/buscarpm', InfoController.buscarpm);
router.post('/login', UserController.login);
router.post('/newuser', UserController.newuser);
router.post('/newequip', UserController.newequip);
router.post('/newos', upload.single('docanexo'),UserController.newos);
router.post('/buscasos', InfoController.buscasos);




export default router;