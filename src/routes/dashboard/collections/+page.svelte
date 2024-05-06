<script lang="ts">
	export type { PageData } from './$types';
	import Modal from '$lib/ui/components/modal.svelte';
	import Text from '$lib/ui/components/text.svelte';

	export let data = PageData;

	let modalCreate: Modal | null = null;
	let modalInput = '';

	function createColl() {
		fetch('http://localhost:8000/collections', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth') as any).token}`,
				'Content-Type': 'Application/json'
			},
			body: JSON.stringify({ name: modalInput })
		})
			.then((res) => res.json())
			.then((data) => {
				data.collections.shift({ name: data.name, articles: 0 });
			})
			.catch(alert)
			.finally(() => {});
	}
</script>

<section class="w-[70%] mx-auto my-12">
	<header class="mb-10">
		<Text tag="h1" class="mb-2 text-headtext">Collections</Text>
		<Text tag="span" class="text-subtext">Create, Edit & Remove your collections</Text>
	</header>
	<button class="mb-6 block btn btn-solid" on:click={modalCreate?.show}> Create New </button>
	<Modal bind:this={modalCreate}>
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
						modalCreate?.close();
					}}
					class="btn btn-outline">Cancel</button
				>
				<button class="btn btn-solid" type="submit">Create</button>
			</div>
		</form>
	</Modal>
	{#if data.collections.length > 0}
		<div class="flex items-center justify-between gap-2 bg-neutral-100 py-2 px-4 rounded-lg mb-2">
			<Text tag="span" class="font-semibold">Name</Text>
			<Text tag="span" class="font-semibold">Total Articles</Text>
		</div>
		<ul class="flex flex-col gap-2">
			{#each data.collections as coll}
				<li class="flex items-center justify-between gap-2 p-2 rounded-lg py-2 px-4">
					<button on:click={() => alert('open details')} class="hover:underline">
						{coll.name}
					</button>
					<Text tag="span">{coll.articles}</Text>
				</li>
			{/each}
		</ul>
	{:else}
		Dont have any collections yet
	{/if}
</section>
