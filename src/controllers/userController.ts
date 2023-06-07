import { Request, Response } from 'express';
import User from '../models/Users';
import Equips from '../models/Equips';
import options from '../models/options';
import Os from '../models/Os';
import path from 'path'
import fs from 'fs'




export const login = async (req: Request, res: Response) => {
    const matricula = req.body.mat
    const senha = parseInt(req.body.senha)
    
    let users = await User.findOne({
        matricula: matricula
    })

    if (users && users.matricula == matricula && users.senha == senha) {
        res.redirect('/home')
    } else {
        res.send('Usuario inválido')
    }
}

export const newuser = async (req: Request, res: Response) => {
    const num = req.body.num
    const grad = req.body.grad
    const matricula = req.body.mat
    const nome = req.body.nome
    const qra = req.body.qra
    const opm = req.body.opm
    const funcao = req.body.funcao
    const end = req.body.end
    const tel = req.body.tel
    const img = req.body.img

    if (grad && matricula && nome && qra && opm && funcao && img && end && tel) {
        let newUser = new User();
        
        newUser.grad = grad;
        newUser.matricula = matricula;
        newUser.nome = nome;
        newUser.opm = opm;
        newUser.funcao = funcao;
        newUser.endereco = end;
        newUser.telefone = tel;
        newUser.img = img;
        newUser.qra = qra;

        if (grad === 'Coronel') {
            newUser.ord = 0
            newUser.grad = 'CEL';
        } else if (grad === 'Tenente Coronel') {
            newUser.ord = 1
            newUser.grad = 'TC';
        } else if (grad === 'Major') {
            newUser.ord = 2
            newUser.grad = 'MJ';
        } else if (grad === 'Capitão') {
            newUser.ord = 3
            newUser.grad = 'CAP';
        } else if (grad === '1ºTenente') {
            newUser.ord = 4
            newUser.grad = '1ºTen';
        } else if (grad === '2ºTenente') {
            newUser.ord = 5
            newUser.grad = '2ºTen';
        } else if (grad === 'Subtenente') {
            newUser.ord = 6
            newUser.grad = 'ST';
        } else if (grad === '1ºSargento') {
            newUser.ord = 7
            newUser.grad = '1ºSGT';
            if (num) {
                newUser.num = parseInt(num);
            }
        } else if (grad === '2ºSargento') {
            newUser.ord = 8
            newUser.grad = '2ºSGT';
            if (num) {
                newUser.num = parseInt(num);
            }
        } else if (grad === '3ºSargento') {
            newUser.ord = 9
            newUser.grad = '3ºSGT';
            if (num) {
                newUser.num = parseInt(num);
            }
        } else if (grad === 'Cabo') {
            newUser.ord = 10
            newUser.grad = 'CB';
            if (num) {
                newUser.num = parseInt(num);
            }
        } else if (grad === 'Soldado') {
            newUser.ord = 11;
            newUser.grad = 'SD';
            if (num) {
                newUser.num = parseInt(num);
            }
        }
        
        


        await newUser.save()
        res.redirect('/home')
    } else {
        res.send('Cadastro não realizado')
        
    }


        
}

export const newequip = async (req: Request, res: Response) => {
    const tipo = req.body.tipo
    const nome = req.body.nome
    const nserie = req.body.nserie
    const situacao = req.body.situacao
    const ncautela = req.body.ncautela
    const data = req.body.data
    const mat = req.body.matricula
    const qtd = req.body.qtd
    
    if (tipo && nome && situacao) {
        let newEquip = new Equips();
        newEquip.tipo = tipo;
        newEquip.nome = nome;
        newEquip.nserie = nserie;
        newEquip.situacao = situacao;
        newEquip.cautela = { ncautela, data, mat, qtd }

        
        if (tipo === 'Arma Curta') { newEquip.img = 'images/icones/pistol.png'  }
        if (tipo === 'Arma Longa') { newEquip.img = 'images/icones/assault-rifle.png' }
        if (tipo === 'EPI') { newEquip.img = 'images/icones/epi.png'}
        if (tipo === 'Algemas') { newEquip.tipo = 'images/icones/algemas.png' }
        if (tipo === 'Munição') { newEquip.tipo = 'images/icones/municao.png' }


        await newEquip.save()

        res.redirect('/home')

        
}}

export const newos = async (req: Request, res: Response) => {
    let newOs = new Os();
    newOs.os = req.body.oss
    newOs.data = req.body.data
    newOs.vtr = req.body.vtr
    newOs.oficina = req.body.oficina
    newOs.status = req.body.status
    newOs.km = req.body.km
    newOs.condutor = req.body.mot
    newOs.frota = req.body.frota
    

    console.log(req.body.iten)
    const itens = req.body.iten
    const itens2:string[] = itens.split(",").map((item:string) => item.trim());
    
    newOs.itens = itens2
    newOs.valor = req.body.valor

    newOs.save()
    
    const file:any = req.file;

    const newFileName = `${req.body.oss}.pdf`;
    const newPath = path.join('./public/documentos', newFileName);

    fs.rename(file.path, newPath, (err) => {
    if (err) {
        // Tratar o erro, se necessário
        console.error(err);
        return res.status(500).send('Erro ao renomear o arquivo.');
    }

    // O arquivo foi renomeado com sucesso
    // Faça qualquer outra operação necessária aqui
    // ...
    // Envie uma resposta apenas quando todas as operações estiverem concluídas
    res.redirect('/home')
    });

    

        
}
