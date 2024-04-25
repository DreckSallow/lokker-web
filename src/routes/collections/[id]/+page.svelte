<script lang="ts">
	import type { PageData } from '../$types';

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

<main class="flex gap-6 mx-6 pt-1">
	<nav class="w-[14rem] bg-green-200 p-4">
		<ul class="border border-neutral-300 rounded-lg">
			{#each data.articles as article}
			<li class="p-2">
				<button on:click="{()=>getContent(article.article_id)}">{article.title}</button>
			</li>
			{/each}
		</ul>
	</nav>
	<section class="bg-red-300 flex-1 h-[300px]">
		{#if currentInfo.isLoading}
		<span>Loading...</span>
		{:else if currentInfo.article}
		<h1 class="text-3xl font-bold mb-2 text-center">{currentInfo.article?.title}</h1>
		<div>{currentInfo.article?.content}</div>
		{:else if currentInfo.error}
		<p>Error: {currentInfo.error}</p>
		{/if}
	</section>
</main>
