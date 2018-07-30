export class Categoria {

    id: number;

    nombre: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}