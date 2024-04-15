<script lang="ts">
	import CollectionCard from '../components/cards/collection_card.svelte';

	let collections = [
		{
			authorImg: 'https://fakeimg.pl/200/',
			alt: 'Avatar',
			authorName: 'Dreck Sallow',
			title: 'Rust ecosystem and more :)',
			link: '/collection/1'
		},
		{
			authorImg: 'https://fakeimg.pl/200/',
			alt: 'Avatar',
			authorName: 'Dreck Sallow',
			title: 'Rust ecosystem and more :)',
			link: '/collection/1'
		}
	];
</script>

<main class="px-10 py-2">
	<header>
		<h1 class="font-bold text-4xl mb-2">Search Collections</h1>
		<h3 class="text-neutral-600 font-normal text-lg mb-6">Find the perfect read</h3>
		<div
			class="border border-neutral-400 rounded-xl flex justify-between overflow-hidden pl-3 w-[24rem]"
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
			/>
		</div>
	</header>
	<!--<hr class="h-[1px] bg-neutral-400 mt-4" />-->
	<section class="mt-8">
		<ul class="mx-auto grid grid-cols-3 gap-6 justify-start">
			{#each collections as coll}
			<CollectionCard
				tag="li"
				authorImg="{coll.authorImg}"
				alt="{coll.alt}"
				authorName="{coll.authorName}"
				link="{coll.link}"
				title="{coll.title}"
			/>
			{/each}
		</ul>
	</section>
</main>
