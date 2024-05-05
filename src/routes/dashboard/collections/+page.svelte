<script lang="ts">
	export type { PageData } from './$types';
	import Card from '$lib/ui/components/card.svelte';
	import Text from '$lib/ui/components/text.svelte';
	export let data = PageData;
</script>

<section class="w-[70%] mx-auto my-12">
	<header class="mb-10">
		<Text tag="h1" class="mb-2 text-headtext">Collections</Text>
		<Text tag="span" class="text-subtext">Create, Edit & Remove your collections</Text>
	</header>
	<ul class="grid grid-cols-4 gap-4">
		{#each data.collections as coll}
			<Card tag="li" class="flex items-center">
				<a
					href="/dashboard/collections/{coll.collection_id}"
					class="text-lg font-semibold hover:underline">{coll.name}</a
				>
			</Card>
		{/each}
	</ul>
</section>
