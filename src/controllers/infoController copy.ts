import { Request, Response } from 'express';
import User from '../models/Users';
import Equips from '../models/Equips';
import options from '../models/options';
import Os from '../models/Os';


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

export const oss = async(req: Request, res: Response)=>{
  const prefixo = req.params.prefixo
  const osss = await Os.findOne({vtr: prefixo})
  const os2 = await Os.find({vtr: prefixo})
  

  
  res.render('pages/inicio', {
      menu: {
          ordens: true,
          title: 'ORDENS DE SERVIÇO',
      },
      osss,
      os2
      
  });
};

export const exibir = async(req: Request, res: Response)=>{
  const os = req.params.os
  const ordem = await Os.findOne({os: os})
  
  console.log(ordem)
  
  res.render('pages/inicio', {
      menu: {
          ordens: true,
          title: 'ORDEN DE SERVIÇO',
      },
      ordem
      
  });
};

export const relatorios = async(req: Request, res: Response)=>{
  const os = req.params.os
  
  
  
  
  
  res.render('pages/inicio', {
      menu: {
          relatorios: true,
          title: 'RELATÓRIOS SERVIÇO',
      }
      
  });
};

export const tabelas = async(req: Request, res: Response)=>{
  const os = req.params.os
  
  
 
  
  
  res.render('pages/tabelas', {
      menu: {
          relatorios: true,
          title: 'RELATÓRIOS SERVIÇO',
      },
      
      
  });
};

export const buscasos = async(req: Request, res: Response)=>{
  const os = req.body
  console.log(os)
  const data = req.body.data
  const texto = req.body.pesquisa
  const mes = req.body.mes
  
  const filtroMes = {
    data: {
      $regex: `^${mes}`,
    },
  };

  const filtrotexto = {
    data: {
      $regex: `^${mes}`,
    },
  };

  let relatorios;
  
  if (!texto && !data) {
    relatorios = await Os.find(filtroMes)
  }
  
  if (!data && !mes) {
    relatorios = await Os.find({
      $or: [
        { oficina: { $regex: new RegExp(texto, 'i') } },
        { status: { $regex: new RegExp(texto, 'i') } },
        { os: { $regex: new RegExp(texto, 'i') } },
        { vtr: { $regex: new RegExp(texto, 'i') } },

      ]
    });
  }

  if (!texto && !mes) {
    relatorios = await Os.find({
      $or: [
        { data: { $regex: new RegExp(data, 'i') } }

      ]
    });
  }

  if (data && texto && !mes) {
    relatorios = await Os.find({
      $and: [
        {
          $or: [
            { oficina: { $regex: new RegExp(texto, 'i') } },
            { status: { $regex: new RegExp(texto, 'i') } },
            { os: { $regex: new RegExp(texto, 'i') } },
            { vtr: { $regex: new RegExp(texto, 'i') } },
          ]
        },
        { data: { $regex: new RegExp(data, 'i') } },
      ]
    });
  }

  if (mes && texto && !data) {
    relatorios = await Os.find({
      $and: [
        {
          $or: [
            { oficina: { $regex: new RegExp(texto, 'i') } },
            { status: { $regex: new RegExp(texto, 'i') } },
            { os: { $regex: new RegExp(texto, 'i') } },
            { vtr: { $regex: new RegExp(texto, 'i') } },
          ]
        },
        { data: { $regex: `^${mes}` } },
      ]
    });
  }
  
  console.log(relatorios)
  
  res.render('pages/tabelas', {
      menu: {
          relatorios: true,
          title: 'RELATÓRIOS SERVIÇO',
      },
      relatorios
      
      
  });
};

export const download = async(req: Request, res: Response)=>{
  const express = require('express');
const fs = require('fs');

const app = express();

// Rota para fazer o download do arquivo CSV
app.get('/download', (req:Request, res:Response) => {
  const csvFilePath = '/dados.csv';

  // Define o cabeçalho do Content-Disposition para forçar o download do arquivo
  res.setHeader('Content-Disposition', 'attachment; filename=dados.csv');

  // Faz a leitura do arquivo CSV e envia o conteúdo para o cliente
  fs.createReadStream(csvFilePath).pipe(res);
});

// Inicia o servidor na porta 3000 (ou outra porta de sua escolha)
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
  
  
};