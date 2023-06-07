import { Schema, model, Model, connection } from 'mongoose';

type VtrsType = {
    prefixo: string,
    modelo: string,
    km: string,
    placa: string,
    userv: {
        mat: String
    },
    status: {
        alteracao: String,
        chave: Boolean,
        cartao: Boolean,
        buzina: Boolean,
        radio: Boolean,
        intermitente: Boolean,
        sirenes: Boolean,
        luzinterna: Boolean,
        triangulo: Boolean,
        macaco: Boolean,
        croda: Boolean,
        steps: Boolean,
        tapetes: Boolean,
        estofados: Boolean,
        paralamas: Boolean,
        engate: Boolean,
        extintor: Boolean,
        pneud: String,
        pneut: String,
        arcondicionado: Boolean
    },
    ano: String
    
};

const schema = new Schema<VtrsType>({
    prefixo: {type: String, required: false},
    modelo: {type: String, required: false},
    km: {type: String, required: false},
    placa: {type: String, required: false},
    userv: {
        mat: {type: String, required: false},
    },
    status: {
        alteracao: {type: String, required: false},
        chave: {type: Boolean, required: false},
        cartao: {type: Boolean, required: false},
        buzina: {type: Boolean, required: false},
        radio: {type: Boolean, required: false},
        intermitente: {type: Boolean, required: false},
        sirenes: {type: Boolean, required: false},
        luzinterna: {type: Boolean, required: false},
        triangulo: {type: Boolean, required: false},
        macaco: {type: Boolean, required: false},
        croda: {type: Boolean, required: false},
        steps: {type: Boolean, required: false},
        tapetes: {type: Boolean, required: false},
        estofados: {type: Boolean, required: false},
        paralamas: {type: Boolean, required: false},
        engate: {type: Boolean, required: false},
        extintor: {type: Boolean, required: false},
        pneud: {type: String, required: false},
        pneut: {type: String, required: false},
        arcondicionado: {type: Boolean, required: false}
    },
    ano: {type: String, required: false},
});

const modelName: string = 'vtrs';

export default (connection && connection.models[modelName]) ? 
    connection.models[modelName] as Model<VtrsType>
: model<VtrsType>(modelName, schema)
