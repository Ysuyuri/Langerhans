import getRealm from "../../infraestructure/realm";
import { IImagem, IImagemObject } from "../models/interface/IImagem";

let createdImagem: IImagemObject;
const writeImagem = async (data: IImagem) => {
  const realm = await getRealm();

  realm.write(() => {
    createdImagem = realm.create("Imagem", data);
  });

  return createdImagem;
};

export default writeImagem;