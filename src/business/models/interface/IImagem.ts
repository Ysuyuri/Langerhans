import Realm from 'realm';

export interface IImagem {
    _id: number;
    filename?: string;
    type?: string;
    uri?: string;
}

export type IImagemObject = IImagem & Realm.Object;