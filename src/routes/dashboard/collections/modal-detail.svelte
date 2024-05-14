<script lang="ts">
	import { getDate } from '$lib';
	import type { Article, Collection } from '$lib/types';
	import Checkbox from '$lib/ui/components/inputs/checkbox.svelte';
	import Modal from '$lib/ui/components/modal.svelte';
	import Text from '$lib/ui/components/text.svelte';
	export let show: boolean;

	let modalInfo: Modal | null = null;

	let collInfo: {
		collection: Collection;
		articles: Pick<Article, 'article_id' | 'title' | 'update_at'>[];
	} | null = null;

	$: show ? modalInfo?.show() : modalInfo?.close();

	let collection_id = null;

	export function load(coll_id: number) {
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
				modalInfo?.show();
				collection_id = coll_id;
			})
			.catch(alert)
			.finally(() => {});
	}
</script>

{#if collInfo}
	<Modal
		bind:this={modalInfo}
		on:close={() => {
			show = false;
			collInfo = null;
		}}
	>
		<div class="p-4">
			<Text tag="h2" class="mb-6">{collInfo?.collection.name}</Text>
			<a
				class="btn btn-solid block text-sm mb-4 w-max"
				href={`/dashboard/collections/${collInfo.collection.collection_id}/new-article`}
			>
				New Article
			</a>
			{#if collInfo.articles.length > 0}
				<div class="text-sm">
					<ul class="font-semibold row p-2 rounded-lg bg-neutral-200/80">
						<li class="place-self-center">
							<Checkbox checked={true} />
						</li>
						<li>Title</li>
						<li>Last Updated</li>
					</ul>
					<ul>
						{#each collInfo.articles as article}
							<li>
								<ul class="row p-2">
									<li class="place-self-center">
										<Checkbox bind:checked={article.checked} />
									</li>
									<li class="w-full">
										<a
											href={`/dashboard/collections/${collection_id}/article/${article.article_id}`}
											class="underline hover:no-underline underline-offset-2"
										>
											{article.title}
										</a>
									</li>
									<li>{getDate(article.update_at)}</li>
								</ul>
							</li>
						{/each}
					</ul>
				</div>
			{:else}
				Dont have articles yet 😒.
			{/if}
		</div>
	</Modal>
{/if}

<style>
	.row {
		display: grid;
		grid-template-columns: 3rem 1fr 10rem;
	}
	.row li {
		place-self: center;
	}
</style>
