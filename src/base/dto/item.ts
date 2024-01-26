
export class ItemDTO {
    public id?: number
    public name: string
    public description: string
    public category: string
    public value: number
    public image?: Buffer

    constructor(name: string, description: string, category: string, value: number, image?: Buffer, id?: number) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.value = value;
        this.image = image;
        this.id = id;
    }
}