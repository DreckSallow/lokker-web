<script lang="ts">
	import { getDate } from '$lib';
	import type { Article, Collection } from '$lib/types';
	import BoxLoader from '$lib/ui/components/box-loader.svelte';
	import Checkbox from '$lib/ui/components/inputs/checkbox.svelte';
	import Modal from '$lib/ui/components/modal.svelte';
	import Text from '$lib/ui/components/text.svelte';
	import { api } from '$lib/utils/api';
	import { CirclePlus } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';

	type ArticleRow = { checked: boolean } & Article;

	export let show: boolean;

	let modalInfo: Modal | null = null;

	let collInfo: Option<{ collection: Collection; articles: ArticleRow[] }> = null;

	$: show ? modalInfo?.show() : modalInfo?.close();

	let checkAllInputs = false;
	$: hasSelecteds = collInfo?.articles.some((c) => c.checked);

	let collection_id: number | null = null;

	function onDelete() {
		if (!collInfo) return;
		fetch(api('/articles'), {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${JSON.parse(localStorage.getItem('auth') as any).token}`,
				'Content-Type': 'Application/json'
			},
			body: JSON.stringify(collInfo.articles.filter((a) => a.checked).map((a) => a.article_id))
		})
			.then((d) => {
				if (d.ok && collInfo) {
					collInfo.articles = collInfo.articles.filter((a) => !a.checked);
				}
			})
			.catch(() => {
				toast.error('Error deleting articles');
			});
	}

	export function load(coll_id: number) {
		fetch(api('/collections/', coll_id), {
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
			.catch(() => {
				toast.error('Error loading collection detail');
			})
			.finally(() => {});
	}
</script>

<Modal
	bind:this={modalInfo}
	on:close={() => {
		show = false;
		collInfo = null;
	}}
>
	<BoxLoader class="p-4" tag="div" loading={!collInfo}>
		{#if collInfo}
			<Text tag="h2" class="mb-2">{collInfo?.collection.name}</Text>
			<a
				class="btn btn-solid block text-sm mb-4 w-max ml-auto flex items-center gap-2"
				href={`/dashboard/collections/${collInfo.collection.collection_id}/new-article`}
			>
				New Article
				<CirclePlus class="h-4 w-4 stroke-white" />
			</a>
			{#if collInfo.articles.length > 0}
				<div class="text-sm">
					<ul class="font-semibold row p-2 rounded-lg bg-neutral-200/80">
						<li class="place-self-center">
							<Checkbox
								bind:checked={checkAllInputs}
								on:change={({ detail }) => {
									if (collInfo) {
										collInfo.articles = collInfo.articles.map((a) => {
											a.checked = detail;
											return a;
										});
									}
								}}
							/>
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
				{#if hasSelecteds}
					<button class="btn btn-solid text-sm mt-4" on:click={onDelete}>Delete </button>
				{/if}
			{:else}
				Dont have articles yet 😒.
			{/if}
		{/if}
	</BoxLoader>
</Modal>

<style>
	.row {
		display: grid;
		grid-template-columns: 3rem 1fr 10rem;
	}
	.row li {
		place-self: center;
	}
</style>
