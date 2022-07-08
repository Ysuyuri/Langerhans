import { ObjectSchema } from 'realm';

const ImagemSchema: ObjectSchema = {
    name: "Imagem",
    properties: {
        _id: "int",
        filename: "string?",
        type: "string?",
        uri: "string?"
    },
    primaryKey: "_id"
};

export default ImagemSchema;