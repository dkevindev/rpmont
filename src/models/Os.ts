import { Schema, model, Model, connection } from 'mongoose';

type OsType = {
    os: string,
    data: string,
    vtr: string,
    oficina: string,
    status: string,
    km: string,
    condutor: string,
    valor: string,
    itens: string[],
};

const schema = new Schema<OsType>({
    os: {type: String, required: false},
    data: {type: String, required: false},
    vtr: {type: String, required: false},
    oficina: {type: String, required: false},
    status: {type: String, required: false},
    condutor: {type: String, required: false},
    km: {type: String, required: false},
    valor: {type: String, required: false},
    itens: {type: [String], required: false},
});

const modelName: string = 'os';

export default (connection && connection.models[modelName]) ? 
    connection.models[modelName] as Model<OsType>
: model<OsType>(modelName, schema)
