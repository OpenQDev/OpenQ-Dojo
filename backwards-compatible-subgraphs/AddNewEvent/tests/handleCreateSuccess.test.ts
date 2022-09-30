import { Bytes, BigInt, Address, store, Entity, ethereum } from '@graphprotocol/graph-ts';
import { CreateSuccess } from "../generated/MyContractV2_NewEvent/MyContractV2_NewEvent";
import { newMockEvent, test, assert, clearStore, afterEach, describe, beforeEach, log, logStore } from "matchstick-as/assembly/index";
import { handleCreateSuccess } from "../src/mapping";

describe('handleCreateSuccess', () => {
	beforeEach(() => {
		// Use this as an opportunity to seed data in the store if needed for update events
		seedMyEntity('otherMockId', 'OtherName', '94')
	})

	afterEach(() => {
		// For test atomicity it is best to clear the store after each test runs
		clearStore()
	})

	test('handleCreateSuccess correctly process CreateSuccess event', () => {
		// ARRANGE
		let version = 2
		let mockId = 'abc123'
		let expectedName = 'Flaco'
		let expectedAge = '25'

		let newCreateSuccessEvent = createNewCreateSuccessEvent(
			mockId,
			version.toString()
		)

		// ACT
		handleCreateSuccess(newCreateSuccessEvent)

		// This will log A) our manually seeded MyEntity, and B) the new entity assembled from the ABI encoded data on the CreateSuccess event 
		logStore()

		// ASSERT
		assert.fieldEquals('MyEntity', mockId, 'id', mockId)
		assert.fieldEquals('MyEntity', mockId, 'name', expectedName)
		assert.fieldEquals('MyEntity', mockId, 'age', expectedAge)
	})
})

export function createNewCreateSuccessEvent(id: string, version: string): CreateSuccess {
	let newCreateSuccessEvent = changetype<CreateSuccess>(newMockEvent());

	let parameters: Array<ethereum.EventParam> = [
		new ethereum.EventParam("id", ethereum.Value.fromString(id)),
		new ethereum.EventParam("version", ethereum.Value.fromUnsignedBigInt(BigInt.fromString(version))),
	]

	newCreateSuccessEvent.parameters = parameters;

	return newCreateSuccessEvent
}

export function seedMyEntity(id: string, name: string, age: string): void {
	let entity = new Entity()

	entity.setString('id', id)
	entity.setString('name', name)
	entity.setBigInt('age', BigInt.fromString(age))

	store.set('MyEntity', id, entity)
}

export function generateCreateSuccessData(name: string, age: string): string {
	// We pack the parameters into an array for encoding
	let tupleArray: Array<ethereum.Value> = [
		ethereum.Value.fromString(name),
		ethereum.Value.fromSignedBigInt(BigInt.fromString(age))
	]

	// We cast the AssemblyScript array of type Array<ethereum.Value> to type <ethereum.Tuple>
	let tuple = changetype<ethereum.Tuple>(tupleArray)

	// We encode all values at once as a tuple
	let encoded = ethereum.encode(ethereum.Value.fromTuple(tuple))!

	// HOWEVER, in practice, we will not be emitting these events as a tuple, so we then remove the 0x00...020 tuple prefix.
	// This is meant to mimic real-world scenario
	return removeTuplePrefix(encoded)
}

export function removeTuplePrefix(encoded: Bytes): string {
	const tuplePrefix = '0x0000000000000000000000000000000000000000000000000000000000000020'

	// Replace 0x00...020 with an empty string
	const noTuplePrefix = encoded.toHexString().replace(tuplePrefix, '')

	// Re-attach the 0x hexadecimal prefix to the encoded parameters
	const withoutTuplePrefixWith0x = '0x'.concat(noTuplePrefix)

	return withoutTuplePrefixWith0x
}