import { ethereum, log } from '@graphprotocol/graph-ts'
import { CreateSuccess } from "../generated/MyContractV2_EncodedData/MyContractV2_EncodedData";
import { MyEntity } from "../generated/schema"

export default function handleCreateSuccess_ABI_Encoding(event: CreateSuccess): void {
	let entity = new MyEntity(event.params.id)

	let version = event.params.version

	let decoded: ethereum.Value[] = []

	if (version == 1) {
		decoded = ethereum.decode("(string)", event.params.data)!.toTuple();
	} else if (version == 2) {
		decoded = ethereum.decode("(string,uint256)", event.params.data)!.toTuple();
		entity.age = decoded[1].toBigInt()
	}

	// 'name' in the zero-th position will be the same for all versions, makes mapping easier
	entity.name = decoded[0].toString()

	entity.save()
}