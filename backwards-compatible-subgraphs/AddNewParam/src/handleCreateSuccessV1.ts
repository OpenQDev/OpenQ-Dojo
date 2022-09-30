import { CreateSuccess1 } from "../../1-generated-add-param/MyContractV2_AddEventParam/MyContractV2_AddEventParam"
import { MyEntity } from "../../1-generated-add-param/schema"

export default function handleCreateSuccess_New_Event(event: CreateSuccess1): void {
	let entity = new MyEntity(event.params.id)
	entity.name = event.params.name
	entity.save()
}