import { ItemDTO } from "../../base/dto/item";
import { ItemEntity } from "../../core/entities/item";


export class ItemPresenter {

    static EntityToDto(itemEntity: ItemEntity): ItemDTO {
        return new ItemDTO(
            itemEntity.name,
            itemEntity.description,
            itemEntity.category,
            Number(itemEntity.value),
            Buffer.from(itemEntity.image),
            itemEntity?.id
        );
    }

    static EntitiesToDto(itemEntities: ItemEntity[]): ItemDTO[] {

        const listDtos: ItemDTO[] = [];

        itemEntities.forEach(itemEntity => {
            listDtos.push(ItemPresenter.EntityToDto(itemEntity));
        });

        return listDtos;
    }
}