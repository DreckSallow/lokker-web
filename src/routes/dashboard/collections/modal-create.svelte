<script lang="ts">
	import Button from '$lib/ui/components/button.svelte';
	import { Input } from '$lib/ui/components/inputs';
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

	function onClose() {
		modalInput = '';
		show = false;
	}
</script>

<Modal bind:this={modalCreate} on:close={onClose}>
	<form on:submit|preventDefault={createColl} class="p-2">
		<Text tag="h4" class="font-semibold block mb-3">Create Collection</Text>
		<Input type="text" bind:value={modalInput} required />
		<div class="flex justify-between gap-4 mt-6">
			<Button type="button" on:click={onClose} variant="outline" class="text-sm">Cancel</Button>
			<Button type="submit" variant="solid" class="text-sm">Create</Button>
		</div>
	</form>
</Modal>
