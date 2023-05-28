import { Schema, model, Model, connection } from 'mongoose';

type OptionsType = {
    options: []
};

const schema = new Schema<OptionsType>({
    options: {type: [Array], required: false},
});

const modelName: string = 'options';

export default (connection && connection.models[modelName]) ? 
    connection.models[modelName] as Model<OptionsType>
: model<OptionsType>(modelName, schema)
