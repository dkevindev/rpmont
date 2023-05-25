import { Request, Response } from 'express';
import User from '../models/Users';
import Equips from '../models/Equips';

export const home = async(req: Request, res: Response)=>{
    let users = await User.find({})
    


    let home = 'Home';



    
    res.render('pages/home', {
        users,
        home,
        
    });
};

export const pms = async(req: Request, res: Response)=>{
    let users = await User.find({})
    
    let pms = 'pms';

    res.render('pages/inicio', {
        users,
        pms,
        menu: {
            pms: true,
            title: 'EFETIVO RPMONT'
        }
        
    });
};

export const material = async(req: Request, res: Response)=>{
    let users = await User.find({})
    let equips = await Equips.find({})
    

    res.render('pages/inicio', {
        menu: {
            material: true,
            title: 'CARGA/EQUIPAMENTOS RPMONT'
        },
        equips
        
        
    });
};

export const vtrs = async(req: Request, res: Response)=>{
    let users = await User.find({})
    


    res.render('pages/inicio', {
        menu: {
            vtrs: true,
            title: 'ACOMPANHAMENTO DE VIATURAS'
        }
        
        
    });
};

export const edit = async(req: Request, res: Response)=>{
    let users2 = await User.find({})
    


    res.render('pages/inicio', {
        menu: {
            edit: true,
            title: 'EDITAR / CADASTRAR INFORMAÇÕES'
        },
        users2
        
        
    });
};


export const cautelas = async(req: Request, res: Response)=>{
    let matricula = req.params.matricula
    let user_find = await User.find({matricula})

    res.render('pages/inicio', {
        menu: {
            cautelas: true,
            title: 'EFETIVO RPMONT'
        },
        user_find
        
    });
};