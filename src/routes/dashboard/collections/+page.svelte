<script lang="ts">
	export type { PageData } from './$types';
	import Text from '$lib/ui/components/text.svelte';
	import ModalCreate from './modal-create.svelte';
	import ModalDetail from './modal-detail.svelte';

	export let data = PageData;
	let modals = {
		create: false,
		details: false
	};

	function onCreate(e: CustomEvent) {
		data.collections = [e.detail, ...data.collections];
	}

	let modalInfo: ModalDetail | null = null;
</script>

<section class="w-[70%] mx-auto my-12">
	<header class="mb-10">
		<Text tag="h1" class="mb-2 text-headtext">Collections</Text>
		<Text tag="span" class="text-subtext">Create, Edit & Remove your collections</Text>
	</header>
	<button class="mb-6 block btn btn-solid" on:click={() => (modals.create = true)}>
		Create New
	</button>

	{#if data.collections.length > 0}
		<div class="flex items-center justify-between gap-2 bg-neutral-100 py-2 px-4 rounded-lg mb-2">
			<Text tag="span" class="font-semibold">Name</Text>
			<Text tag="span" class="font-semibold">Total Articles</Text>
		</div>
		<ul class="flex flex-col gap-2">
			{#each data.collections as coll}
				<li class="flex items-center justify-between gap-2 p-2 rounded-lg py-2 px-4">
					<button
						on:click={() => {
							modalInfo?.load(coll.collection_id);
							modals.details = true;
						}}
						class="underline hover:no-underline underline-offset-2"
					>
						{coll.name}
					</button>
					<Text tag="span">{coll.total_articles}</Text>
				</li>
			{/each}
		</ul>
	{:else}
		Dont have any collections yet
	{/if}
</section>
<ModalCreate bind:show={modals.create} on:create={onCreate} />
<ModalDetail bind:show={modals.details} bind:this={modalInfo} />
