<script lang="ts">
	export type { PageData } from './$types';
	import { api } from '$lib/utils/api';
	import Checkbox from '$lib/ui/components/inputs/checkbox.svelte';
	import Text from '$lib/ui/components/text.svelte';
	import ModalCreate from './modal-create.svelte';
	import ModalDetail from './modal-detail.svelte';

	export let data = PageData;
	function onCreate(e: CustomEvent) {
		data.collections = [e.detail, ...data.collections];
	}
	let modals = {
		create: false,
		details: false
	};

	let checkAllInputs = false;
	$: hasSelecteds = data.collections.some((c) => c.checked);

	function onDelete() {
		console.log(data.collections);
		fetch(api('/collections'), {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth') as any).token}`,
				'Content-Type': 'Application/json'
			},
			body: JSON.stringify(data.collections.filter((c) => c.checked).map((c) => c.collection_id))
		})
			.then((d) => {
				if (d.ok) {
					data.collections = data.collections.filter((c) => !c.checked);
				}
			})
			.catch(alert);
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
		<div>
			<ul class="font-semibold row p-2 rounded-lg bg-neutral-200/80">
				<li class="place-self-center">
					<Checkbox
						bind:checked={checkAllInputs}
						on:change={({ detail }) => {
							data.collections = data.collections.map((c) => {
								c.checked = detail;
								return c;
							});
						}}
					/>
				</li>
				<li>Name</li>
				<li>Total Articles</li>
			</ul>
			<ul>
				{#each data.collections as coll}
					<ul class="row p-2">
						<li class="place-self-center">
							<Checkbox bind:checked={coll.checked} />
						</li>
						<li>
							<button
								on:click={() => {
									modalInfo?.load(coll.collection_id);
									modals.details = true;
								}}
								class="underline hover:no-underline underline-offset-2"
							>
								{coll.name}
							</button>
						</li>
						<li>{coll.total_articles}</li>
					</ul>
				{/each}
			</ul>
		</div>
		{#if hasSelecteds}
			<button class="btn btn-solid text-sm mt-4" on:click={onDelete}>Delete </button>
		{/if}
	{:else}
		Dont have any collections yet
	{/if}
</section>
<ModalCreate bind:show={modals.create} on:create={onCreate} />
<ModalDetail bind:show={modals.details} bind:this={modalInfo} />

<style>
	.row {
		display: grid;
		grid-template-columns: 3rem 1fr 10rem;
	}
</style>
