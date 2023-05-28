import { Schema, model, Model, connection } from 'mongoose';

type EquipsType = {
    tipo: string,
    nome: string,
    nserie: string,
    situacao: string,
    cautela: {
        ncautela: string,
        data: string,
        mat: string,
        qtd: number
    },
    img: string,
    obs: string
};

const schema = new Schema<EquipsType>({
    tipo: {type: String, required: true},
    nome: {type: String, required: true},
    nserie: {type: String, required: false},
    situacao: {type: String, required: true},
    cautela: {
        ncautela: {type: String, required: false},
        data: {type: String, required: false},
        mat: {type: String, required: false},
        qtd: {type: Number, required: false},
    },
    img: {type: String, required: false},
    obs: {type: String, required: false}
});

const modelName: string = 'Equips';

export default (connection && connection.models[modelName]) ? 
    connection.models[modelName] as Model<EquipsType>
: model<EquipsType>(modelName, schema)
