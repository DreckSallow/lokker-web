<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import CollectionCard from '../components/cards/collection_card.svelte';
	import AppNav from '../components/nav.svelte';
	export let data: PageData;

	function search(name?: string) {
		if (!name) {
			return goto('/');
		}
		goto(`?name=${name ?? ''}`);
	}

	function onBlurSearch(e: FocusEvent) {
		let input = e.target as HTMLInputElement;
		search(input.value);
	}

	function onEnter(e: KeyboardEvent) {
		if (e.code == 'Enter') {
			let input = e.target as HTMLInputElement;
			search(input.value);
		}
	}
</script>

<AppNav />
<main class="px-10 py-2">
	<header>
		<h1 class="font-bold text-4xl mb-2 mt-4">Search Collections</h1>
		<h3 class="text-neutral-600 font-normal text-lg mb-6">Find the perfect read</h3>
		<div
			class="border border-neutral-400 rounded-lg flex justify-between overflow-hidden pl-3 w-[24rem]"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="w-6 h-[80%] fill-neutral-500 my-auto"
			>
				<path
					d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"
				></path>
			</svg>
			<input
				type="text"
				class="outline-none flex-1 px-4 py-3 text-brand placeholder:text-neutral-400"
				placeholder="Buscar collecciones..."
				spellcheck="false"
				on:blur={onBlurSearch}
				on:keyup={onEnter}
			/>
		</div>
	</header>
	<section class="mt-8">
		{#await data.res}
			Loading collections...
		{:then res}
			{#if res.items.length > 0}
				<ul class="mx-auto grid grid-cols-3 gap-6 justify-start">
					{#each res.items as coll}
						<CollectionCard
							tag="li"
							authorImg={coll.authorImg}
							alt={coll.alt}
							authorName={coll.user_username}
							profile_id={coll.user_id}
							link={`/collections/${coll.collection_id}`}
							title={coll.name}
							total_articles={coll.total_articles}
						/>
					{/each}
				</ul>
			{:else}
				No hay datos
			{/if}
		{:catch err}
			Ocurrio un error {err}
		{/await}
	</section>
</main>
