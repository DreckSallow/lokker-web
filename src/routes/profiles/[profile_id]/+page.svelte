<script lang="ts">
	import type { PageData } from '../../$types';

	export let data: PageData;
</script>

<main class="py-4">
	<header class="bg-blue-200 flex gap-12 py-12 px-4 justify-center items-center">
		<img
			src="{data.user_img}"
			alt="{`${data.user_name} avatar`}"
			class="rounded-full h-[200px] aspect-square"
		/>
		<section class="w-3/5 max-w-[600px]">
			<h1 class="text-4xl font-bold mb-2">{data.user_name}</h1>
			<p class="text-neutral-700">{data.user_bio}</p>
			<div>
				<h4 class="font-semibold text-xl mt-2">Social links</h4>
				<ul class="mt-2">
					<li>
						<a href="{data.twitter_link}" class="underline text-blue-400">{data.twitter_link}</a>
					</li>
					<li>
						<a href="{data.website_link}" class="underline text-blue-400">{data.website_link}</a>
					</li>
				</ul>
			</div>
		</section>
	</header>
	<section class="mt-3 px-6">
		<h2 class="text-2xl font-bold mb-3">Collections</h2>
		<ul class="grid grid-cols-3">
			{#each data.collections as coll} {coll.title} {/each}
		</ul>
	</section>
</main>
