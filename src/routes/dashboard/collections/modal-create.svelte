<script lang="ts">
	import Modal from '$lib/ui/components/modal.svelte';
	import Text from '$lib/ui/components/text.svelte';
	import { api } from '$lib/utils/api';
	import { createEventDispatcher } from 'svelte';
	export let show: boolean;

	let modalCreate: Modal | null = null;
	let modalInput = '';

	let dispatch = createEventDispatcher();

	$: show ? modalCreate?.show() : modalCreate?.close();

	function createColl() {
		fetch(api('/collections'), {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth') as any).token}`,
				'Content-Type': 'Application/json'
			},
			body: JSON.stringify({ name: modalInput })
		})
			.then((res) => res.json())
			.then((data) => {
				dispatch('create', {
					name: data.name,
					total_articles: 0,
					collection_id: data.collection_id
				});
				show = false;
			})
			.catch(alert)
			.finally(() => {});
	}
</script>

<Modal bind:this={modalCreate} on:close={() => (show = false)}>
	<form on:submit|preventDefault={createColl} class="p-2">
		<label class="w-full">
			<Text tag="span" class="font-semibold block mb-2">Collection name</Text>
			<input
				type="text"
				bind:value={modalInput}
				required
				class="rounded-md border border-neutral-300 p-2.5 w-full"
			/>
		</label>
		<div class="flex justify-between gap-4 mt-4">
			<button
				type="button"
				on:click={() => {
					modalInput = '';
					show = false;
				}}
				class="btn btn-outline">Cancel</button
			>
			<button class="btn btn-solid" type="submit">Create</button>
		</div>
	</form>
</Modal>
