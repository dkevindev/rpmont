import { Schema, model, Model, connection } from 'mongoose';

type UserType = {
    num: string,
    grad: string,
    matricula: string,
    nome: string,
    qra: string,
    funcao: string,
    endereco: string,
    telefone: String,
    img: string,
    senha: number,
    opm: string,
    cautelas: []
};

const schema = new Schema<UserType>({
    num: {type: String, required: true},
    grad: {type: String, required: true},
    matricula: {type: String, required: true},
    nome: {type: String, required: true},
    qra: {type: String, required: true},
    funcao: {type: String, required: true},
    endereco: {type: String, required: true},
    telefone: {type: String, required: false},
    img: {type: String, required: false},
    senha: {type: Number, required: false},
    opm: {type: String, required: false},
    cautelas: {type: [Array], required: false},
    
});

const modelName: string = 'User';

export default (connection && connection.models[modelName]) ? 
    connection.models[modelName] as Model<UserType>
: model<UserType>(modelName, schema)
