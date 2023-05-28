import { Request, Response } from 'express';
import User from '../models/Users';
import Equips from '../models/Equips';
import options from '../models/options';


export const additem = async(req: Request, res: Response)=>{
    let matricula = req.params.matricula
    let user_find = await User.find({matricula})
    let armacautelada = await Equips.find({
        'cautela.mat': matricula
    })
    let armamento = await Equips.find({
        'cautela.mat': ''
    })



    res.render('pages/inicio', {
        menu: {
            cautelas: true,
            title: 'EFETIVO RPMONT',
            additem: true
        },
        armacautelada,
        user_find,
        armamento,
        matricula

        
    });
};


export const inserir = async(req: Request, res: Response)=>{
    let matricula = req.params.matricula
    let nseriefind = req.body.nserie
    let ncautela = req.body.ncautela
    let data = req.body.data
    let qtd = req.body.qtd
    let obs = req.body.obs

    await Equips.updateOne(
        {nserie: nseriefind},
        {cautela: {
            ncautela: ncautela,
            data: data,
            mat: matricula,
            qtd: qtd
        },
        situacao: 'Cautelado',
        obs: obs
    }
    )



    res.redirect('/home')
};

export const buscareqp = async(req: Request, res: Response)=>{
    let texto = req.body.busca
    let eqps_findd = await Equips.find({
        $or: [
          { nserie: { $regex: new RegExp(texto, 'i') } },
          { nome: { $regex: new RegExp(texto, 'i') } },
          { "cautela.ncautela": { $regex: new RegExp(texto, 'i') } },
          { "cautela.mat": { $regex: new RegExp(texto, 'i') } },
        ]
      });
    
    res.render('pages/inicio', {
        menu: {
            material: true,
            title: 'CARGA/EQUIPAMENTOS RPMONT',
            title2: 'NºSérie/Cautela',
            busca: '/buscareqp'
        },
        eqps_findd
        
        
    });
};



export const buscarpm = async(req: Request, res: Response)=>{
    let users = await User.find({}).sort({ ord: 1, num: 1  })
    let texto = req.body.busca
    let texto2 = texto
    let pms_findd;

    if (!isNaN(texto2) && texto2 !== '' ) {
        var numero2 = parseInt(texto2, 10);
        pms_findd = await User.find({
          $or: [
            { nome: { $regex: new RegExp(texto, 'i') } },
            { matricula: { $regex: new RegExp(texto, 'i') } },
            { qra: { $regex: new RegExp(texto, 'i') } },
            { num: numero2},
          ]
        });
      } else {
        pms_findd = await User.find({
          $or: [
            { nome: { $regex: new RegExp(texto, 'i') } },
            { matricula: { $regex: new RegExp(texto, 'i') } },
            { qra: { $regex: new RegExp(texto, 'i') } },
          ]
        });
      }


    


    let pms = 'pms';

    res.render('pages/inicio', {
        pms,
        menu: {
            pms: true,
            title: 'EFETIVO RPMONT',
            title2: 'nome/matrícula do PM',
            busca: '/buscarpm'
        },
        pms_findd
    });
};