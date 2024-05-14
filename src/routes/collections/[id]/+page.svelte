<script lang="ts">
	import AppNav from '../../../components/nav.svelte';
	import type { PageData } from '../$types';
	import { getDate } from '$lib';

	export let data: PageData;

	interface ArticleData {
		article_id: number;
		title: string;
		update_at: string;
		content: string;
	}

	type CurrentInfo = {
		error: null | string;
		isLoading: boolean;
		article: ArticleData | null;
	};

	let currentInfo: CurrentInfo = {
		error: null,
		isLoading: false,
		article: null
	};

	getContent(data.articles[0].article_id);

	function getContent(id: number) {
		if (id == currentInfo.article?.article_id) {
			return;
		}
		currentInfo = {
			error: null,
			isLoading: true,
			article: null
		};
		fetch('http://localhost:8000/articles/content/' + id)
			.then((res) => res.json())
			.then((info) => {
				currentInfo.article =
					(data.articles.find(({ article_id }) => article_id == id) as ArticleData) ?? null;
				if (currentInfo.article) {
					currentInfo.article.content = info.content;
				}
			})
			.catch(() => {
				alert('Not found');
			})
			.finally(() => {
				currentInfo.isLoading = false;
			});
	}
</script>

<AppNav />
<main class="flex gap-6 mx-10 pt-1 mt-6">
	<nav class="w-[14rem] p-4 mt-10">
		<ul class="border border-neutral-300 rounded-xl p-4">
			{#each data.articles as article}
				<li class="text-sm">
					<button
						on:click={() => getContent(article.article_id)}
						class={`p-2 rounded-xl ${currentInfo.article?.article_id == article.article_id ? 'bg-neutral-100/80' : 'hover:underline'}`}
					>
						{article.title}
					</button>
				</li>
			{/each}
		</ul>
	</nav>
	<section class="flex-1">
		{#if currentInfo.isLoading}
			<span>Loading...</span>
		{:else if currentInfo.article}
			<h1 class="text-3xl font-bold mb-4 text-center">{currentInfo.article?.title}</h1>
			<span class="ml-auto text-neutral-600 text-sm mb-4 block w-max">
				{getDate(currentInfo.article.update_at)}
			</span>
			<div class="prose prose-neutral prose-lg w-full">{@html currentInfo.article?.content}</div>
		{:else if currentInfo.error}
			<p>Error: {currentInfo.error}</p>
		{/if}
	</section>
</main>
