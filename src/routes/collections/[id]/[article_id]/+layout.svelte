<script lang="ts">
	import type { PageData } from '../../$types';

	export let data: PageData;
</script>

<main
	class="grid grid-cols-[10rem_1fr] py-4 gap-10 overflow-hidden"
	style="max-height: calc(100vh - 75px); height: calc(100vh - 75px)"
>
	<aside class="flex justify-center items-center h-inherith mx-4">
		<ul class="flex flex-col gap-4 rounded-xl border border-neutral-500 p-2 bg-neutral-100">
			{#each data.articles as article}
			<li>
				<a
					class="rounded-lg hover:bg-neutral-500 py-2 px-4 block"
					href="{`/collections/1/${Math.round(Math.random()*100)}`}"
				>
					{article.title}
				</a>
			</li>
			{/each}
		</ul>
	</aside>
	<section class="overflow-auto">
		<slot />
	</section>
</main>
