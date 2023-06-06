import { Request, Response } from 'express';
import User from '../models/Users';
import Equips from '../models/Equips';
import options from '../models/options';
import Vtrsinfo from '../models/Vtrsinfo';
import Vtrs from '../models/Vtrs';
import Os from '../models/Os';

export const home = async(req: Request, res: Response)=>{
    let users = await User.find({})
    


    let home = 'Home';



    
    res.render('pages/home', {
        users,
        home,
        
    });
};

export const pms = async(req: Request, res: Response)=>{
    let users = await User.find({}).sort({ ord: 1, num: 1  })


    


    let pms = 'pms';

    res.render('pages/inicio', {
        users,
        pms,
        menu: {
            pms: true,
            title: 'EFETIVO RPMONT',
            title2: 'nome/matrícula do PM',
            busca: '/buscarpm'
        },
        
    });
};

export const material = async(req: Request, res: Response)=>{
    let equips = await Equips.find({})
    

    const aggregateResult = await Equips.aggregate([
        {
          $group: {
            _id: {
              nome: "$nome",
              situacao: "$situacao",
              img: "$img"
            },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            item: "$_id",
            count: 1,
            _id: 0
          }
        }, 
        {
            $sort: {
              "item.nome": 1
            }
        }
      ]);
    
    

    

    res.render('pages/inicio', {
        menu: {
            material: true,
            title: 'CARGA/EQUIPAMENTOS RPMONT',
            title2: 'NºSérie/Cautela',
            busca: '/buscareqp'
        },
        equips,
        aggregateResult
        
        
    });
};

export const vtrs = async(req: Request, res: Response)=>{
    let users = await User.find({})
    let vtrsinfos = await Vtrsinfo.find({})
    let vtrs2 = await Vtrs.find({})

    
    console.log(vtrs);
    


    res.render('pages/inicio', {
        menu: {
            vtrs: true,
            title: 'ACOMPANHAMENTO DE VIATURAS',
            title2: 'prefixo da VTR',
            vtrop: true,
            vtrs2
        }
        
        
    });
};

export const edit = async(req: Request, res: Response)=>{
    let users2 = await User.find({})
    let options2 = await options.find({})
    


    res.render('pages/inicio', {
        menu: {
            edit: true,
            title: 'EDITAR / CADASTRAR INFORMAÇÕES'
        },
        users2,
        options2,
        
        
    });
};


export const cautelas = async(req: Request, res: Response)=>{
    let matricula = req.params.matricula
    let user_find = await User.find({matricula})
    let armacautelada = await Equips.find({
        'cautela.mat': matricula
    })


    res.render('pages/inicio', {
        menu: {
            cautelas: true,
            title: 'EFETIVO RPMONT'
        },
        user_find,
        armacautelada
        
    });
};


export const policiais = async(req: Request, res: Response)=>{
    let users2 = await User.find({})
    let options2 = await options.find({})

    res.render('pages/inicio', {
        menu: {
            policiais: true,
            edit: true,
            title: 'CADASTRAR NOVO POLICIAL'
        },
        users2,
        options2
    });
};

export const viaturas = async(req: Request, res: Response)=>{
    let users2 = await User.find({})
    let options2 = await options.find({})
    res.render('pages/inicio', {
        menu: {
            viaturas: true,
            edit: true,
            title: 'CADASTRAR NOVA VIATURA'
        },
        users2,
        options2
    });
};

export const equipamentos = async(req: Request, res: Response)=>{
    let users2 = await User.find({})
    let options2 = await options.find({})
    res.render('pages/inicio', {
        menu: {
            equipamentos: true,
            edit: true,
            title: 'CADASTRAR EQUIPAMENTOS'
        },
        users2,
        options2
    });
};

export const diversos = async(req: Request, res: Response)=>{
    let users2 = await User.find({})
    let options2 = await options.find({})
    res.render('pages/inicio', {
        menu: {
            diversos: true,
            edit: true,
            title: 'OUTROS'
        },
        users2,
        options2
    });
};

export const os = async(req: Request, res: Response)=>{
    let listapms = await User.find({}).sort({ ord: 1, num: 1  })
    let options2 = await options.find({})
    let listavtrs = await Vtrs.find({})
    
    


    res.render('pages/inicio', {
        menu: {
            os: true,
            title: 'ADICIONAR ORDEM DE SERVIÇO'
        },
        listavtrs,
        listapms

        
        
        
    });
};

export const baixar = async(req: Request, res: Response)=>{
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '../../public', 'relatorios.csv');

    const fileContent = fs.readFileSync(filePath, 'utf-8');


  // Define o cabeçalho do Content-Disposition para forçar o download do arquivo
    res.setHeader('Content-disposition', 'attachment; filename=relatorios.csv');
    res.setHeader('Content-type', 'text/csv');

  // Faz a leitura do arquivo CSV e envia o conteúdo para o cliente
    

  // Faz o pipe da stream para a resposta
    res.send(fileContent);
                



    res.render('pages/inicio', {
       

        
        
        
    });
};