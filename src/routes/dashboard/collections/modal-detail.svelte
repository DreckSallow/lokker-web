<script lang="ts">
	import type { Article, Collection } from '$lib/types';
	import Modal from '$lib/ui/components/modal.svelte';
	import Text from '$lib/ui/components/text.svelte';
	export let show: boolean;

	let modalInfo: Modal | null = null;

	let collInfo: {
		collection: Collection;
		articles: Pick<Article, 'article_id' | 'title' | 'update_at'>[];
	} | null = null;

	$: show ? modalInfo?.show() : modalInfo?.close();

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
	</Modal>
{/if}
