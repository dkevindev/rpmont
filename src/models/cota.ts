import { Schema, model, Model, connection } from 'mongoose';

type cotaType = {
    mes: string,
    cota: string,
    gasto: string,
    saldo: string,
    gastofp: string
};

const schema = new Schema<cotaType>({
    mes: {type: String, required: false},
    cota: {type: String, required: false},
    gasto: {type: String, required: false},
    gastofp: {type: String, required: false},
    saldo: {type: String, required: false},
});

const modelName: string = 'cota';

export default (connection && connection.models[modelName]) ? 
    connection.models[modelName] as Model<cotaType>
: model<cotaType>(modelName, schema)
