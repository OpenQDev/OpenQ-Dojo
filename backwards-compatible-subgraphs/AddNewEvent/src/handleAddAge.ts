import { AddAge } from "../generated/MyContractV2_NewEvent/MyContractV2_NewEvent"
import { MyEntity } from "../generated/schema"

export default function handleAddAge_NewEvent(event: AddAge): void {
	let entity = new MyEntity(event.params.id)
	entity.age = event.params.age
	entity.save()
}