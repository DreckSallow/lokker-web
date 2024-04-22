<script lang="ts">
	import type { PageData } from '../../$types';

	export let data: PageData;
</script>

<main class="py-4">
	<header class="bg-blue-200 flex gap-12 py-12 px-4 justify-center items-center">
		<img
			src="{data.profile.user_img}"
			alt="{`${data.user_name} avatar`}"
			class="rounded-full h-[200px] aspect-square"
		/>
		<section class="w-3/5 max-w-[600px]">
			<h1 class="text-4xl font-bold mb-2">{data.profile.username}</h1>
			<p class="text-neutral-700">{data.profile.bio}</p>
			<div>
				<h4 class="font-semibold text-xl mt-2">Social links</h4>
				<ul class="mt-2">
					<li>
						<a href="{data.profile.twitter_url}" class="underline text-blue-400"
							>{data.profile.twitter_url}</a
						>
					</li>
					<li>
						<a href="{data.profile.website_url}" class="underline text-blue-400"
							>{data.profile.website_url}</a
						>
					</li>
				</ul>
			</div>
		</section>
	</header>
	<section class="mt-3 px-6">
		<h2 class="text-2xl font-bold mb-3">Collections</h2>
		<ul class="grid grid-cols-3">
			{#each data.collections as coll} {coll.name} {/each}
		</ul>
	</section>
</main>
