<script lang="ts">
	import type { Article, Collection } from '$lib/types/index.js';
	export type { PageData } from './$types';
	import Modal from '$lib/ui/components/modal.svelte';
	import Text from '$lib/ui/components/text.svelte';
	import ModalCreate from './modal-create.svelte';

	export let data = PageData;
	let modalShow = {
		create: false
	};

	function onCreate(e: CustomEvent) {
		data.collections = [e.detail, ...data.collections];
	}

	let modalInfo: Modal | null = null;
	let collInfo: {
		collection: Collection;
		articles: Pick<Article, 'article_id' | 'title' | 'update_at'>[];
	} | null = null;

	function getCollInfo(coll_id: number) {
		fetch('http://localhost:8000/collections/' + coll_id, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth') as any).token}`,
				'Content-Type': 'Application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				collInfo = data;
				modalInfo.show();
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
	<button class="mb-6 block btn btn-solid" on:click={() => (modalShow.create = true)}>
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
						on:click={() => getCollInfo(coll.collection_id)}
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
<ModalCreate bind:show={modalShow.create} on:create={onCreate} />
<Modal bind:this={modalInfo}>
	{#if collInfo}
		<div class="p-4">
			<Text tag="h2" class="mb-6">{collInfo?.collection.name}</Text>
			<button class="btn btn-solid block text-sm mb-4">New Article</button>
			{#if collInfo.articles.length > 0}
				<ul class="flex flex-col gap-2">
					{#each collInfo.articles as art}
						<li class="flex items-center justify-between gap-2 p-2 rounded-lg py-2 px-4">
							<button
								on:click={() => alert('open details')}
								class="underline hover:no-underline underline-offset-2"
							>
								{art.title}
							</button>
							<Text tag="span">{art.update_at}</Text>
						</li>
					{/each}
				</ul>
			{:else}
				Dont have articles yet 😒.
			{/if}
		</div>
	{/if}
</Modal>
