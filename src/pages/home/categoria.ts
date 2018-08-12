

export class Almacen {

    id: number;
    nombre: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export class Producto {

    id: number;
    nombre: string;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}