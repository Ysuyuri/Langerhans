import Realm from 'realm';
import ImagemSchema from "../business/models/imagem";
import UsuarioSchema from '../business/models/usuario';

export default function getRealm() {
    return Realm.open({
        schema:[ImagemSchema]
    })
}