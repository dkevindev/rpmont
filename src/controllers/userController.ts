import { Request, Response } from 'express';
import User from '../models/Users';




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

    if (num && grad && matricula && nome && qra && opm && funcao && img && end && tel) {
        let newUser = new User();
        newUser.num = num;
        newUser.grad = grad;
        newUser.matricula = matricula;
        newUser.nome = nome;
        newUser.qra = qra;
        newUser.opm = opm;
        newUser.funcao = funcao;
        newUser.endereco = end;
        newUser.telefone = tel;
        newUser.img = img;

        await newUser.save()
        res.redirect('/home')
    } else {
        res.send('Cadastro não realizado')
        
    }


        
}
