export default class BaseModel {
    constructor() {
        if (this.constructor === BaseModel) {
            throw new Error("Cannot instantiate abstract class");
        }
    }

    get() {
        throw new Error("Method 'get()' must be implemented");
    }

    create() {
        throw new Error("Method 'create()' must be implemented");
    }

    update() {
        throw new Error("Method 'update()' must be implemented");
    }

    delete() {
        throw new Error("Method 'delete()' must be implemented");
    }

    find() {
        throw new Error("Method 'find()' must be implemented");
    }
}