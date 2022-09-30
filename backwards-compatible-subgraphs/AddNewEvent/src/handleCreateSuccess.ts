import { CreateSuccess } from "../generated/MyContractV2_NewEvent/MyContractV2_NewEvent"
import { MyEntity } from "../generated/schema"

export default function handleCreateSuccess_New_Event(event: CreateSuccess): void {
	let entity = new MyEntity(event.params.id)
	entity.name = event.params.name
	entity.save()
}