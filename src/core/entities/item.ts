export class ItemEntity {
    public id?: number
    public quantity: string
    public name: string
    public description: string
    public category: string
    public value: number | string
    public image: Buffer
    //TODO: public createdAt: string
    //TODO: public updatedAt: string

    constructor(quantity: string, name: string, description: string, category: string, value: number | string, image: Buffer, id?: number) {
        this.quantity = quantity;
        this.name = name;
        this.description = description;
        this.category = category;
        this.value = value;
        this.image = image;
        this.id = id;
    }
}