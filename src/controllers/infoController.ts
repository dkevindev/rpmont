import { Request, Response } from 'express';
import User from '../models/Users';
import Equips from '../models/Equips';
import options from '../models/options';
import Os from '../models/Os';
import Vtrs from '../models/Vtrs';


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
  const path = require('path');
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
  
  
  








  const fs = require('fs');
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  
  // ... Seu código existente para realizar a pesquisa e obter os resultados
  
  // Configurar o escritor CSV
  const csvWriter = createCsvWriter({
    path: path.join(__dirname, '../../public', 'relatorios.csv'), // Defina o caminho do arquivo CSV
    header: [
      { id: 'os', title: 'OS' },
      { id: 'data', title: 'Data' },
      { id: 'vtr', title: 'VTR' },
      { id: 'oficina', title: 'Oficina' },
      { id: 'status', title: 'Status' },
    ],
  });
  
  // Escrever os dados no arquivo CSV
  csvWriter
    .writeRecords(relatorios)
    .then(() => {
      console.log('Dados exportados para o arquivo resultados.csv');
    })
    .catch((error:any) => {
      console.error('Erro ao exportar dados para o arquivo CSV:', error);
    });





  




  
  res.render('pages/tabelas', {
      menu: {
          relatorios: true,
          title: 'RELATÓRIOS SERVIÇO',
      },
      relatorios
      
      
  });
};

export const pagar = async(req: Request, res: Response)=>{
  const os = req.params.os
  console.log(os)
  const os2:any = await Os.find({os: os})
  let vtrs:any = await Vtrs.findOne({prefixo: os2[0].vtr})
 
  


  const fs = require('fs');
  const Docxtemplater = require('docxtemplater');
  const JSZip = require('jszip');
  
  // Leitura do arquivo
  const content = fs.readFileSync('modelo.docx', 'binary');
  
  // Criação de um objeto Docxtemplater a partir do conteúdo do arquivo
  const zip = new JSZip(content);
  const doc = new Docxtemplater().loadZip(zip);
  
  // Definição dos dados a serem utilizados para substituição
  const context = {
    os: os2[0].os,
    prefixo: os2[0].vtr,
    valor: os2[0].valor,
    modelo: vtrs.modelo,
    placa: vtrs.placa,
    itens: os2[0].itens
  };
  
  // Opções de configuração da biblioteca
  const options = {
    delimiters: {
      start: '#',
      end: '#'
    }
  };
  
  doc.setOptions(options)
  
  // Substituição dos marcadores pelos dados fornecidos
  doc.setData(context);
  doc.render();
  
  // Gravação do arquivo de saída
  const buffer = doc.getZip().generate({ type: 'nodebuffer' });
  const outputFilePath = 'resultado.docx';
  fs.writeFileSync('resultado.docx', buffer);

  res.setHeader('Content-Disposition', 'attachment; filename=resultado.docx');
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');


  const fileStream = fs.createReadStream(outputFilePath);
  fileStream.pipe(res);
  
  // Envio do arquivo para o usuário fazer o download
  fileStream.on('close', () => {
    fs.unlinkSync(outputFilePath);
  });




};

