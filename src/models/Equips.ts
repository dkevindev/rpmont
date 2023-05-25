import { Schema, model, Model, connection } from 'mongoose';

type EquipsType = {
    nome: string,
    src: string,
    num: [],
    reserva: Number,
    qtd: Number,
    cauteladas: Number,
};

const schema = new Schema<EquipsType>({
    nome: {type: String, required: true},
    src: {type: String, required: true},
    num: {type: [Array], required: false},
    reserva: {type: Number, required: false},
    qtd: {type: Number, required: true},
    cauteladas: {type: Number, required: true},
    
});

const modelName: string = 'Equips';

export default (connection && connection.models[modelName]) ? 
    connection.models[modelName] as Model<EquipsType>
: model<EquipsType>(modelName, schema)
