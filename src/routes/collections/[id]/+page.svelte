<script lang="ts">
	import AppNav from '../../../components/nav.svelte';
	import type { PageData } from './$types';
	import { getDate } from '$lib';
	import { ChevronRight } from 'lucide-svelte';
	import Avatar from '../../../components/imgs/avatar.svelte';

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
<main class="py-4 px-14 flex flex-col gap-2">
	<header class="flex flex-col gap-2 mt-2 mb-4 font-semibold items-start">
		<div class="flex flex-row gap-2 items-center">
			<a href="/" class="underline hover:text-brand/80 underline-offset-4"> Search collections </a>
			<ChevronRight class="h-4 w-4" />
			<span class="text-neutral-600">{data.collection.name}</span>
		</div>
	</header>
	<div class="flex gap-16 mt-2">
		<aside class="w-[14rem] mt-8 flex flex-col gap-4 justify-between">
			<div>
				<h5 class="border-b border-neutral-300 text-neutral-600 text-sm font-semibold mb-4">
					Articles ({data.articles.length})
				</h5>
				<ul class="h-[250px] max-h-[250px]">
					{#each data.articles as article}
						<li class="text-sm">
							<button
								on:click={() => getContent(article.article_id)}
								class={`p-2 rounded-lg text-start w-full ${currentInfo.article?.article_id == article.article_id ? 'bg-neutral-100/80' : 'hover:underline'}`}
							>
								{article.title}
							</button>
						</li>
					{/each}
				</ul>
			</div>
			<div>
				<h5 class="border-b border-neutral-300 text-neutral-600 text-sm font-semibold mb-4">
					Author
				</h5>
				<div class="flex gap-4 items-center">
					<Avatar
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__2IIAULCR-xberpmuxf-9Jx3cJZLJgLm4tSb9cDwRQ&s"
						abr={data.user_info.username.at(0)}
						alt="profile"
						hClass="h-[50px]"
						divClass="text-2xl font-bold"
					/>
					<a href="/profiles/8" class="text-sm">
						<h4 class="font-semibold">{data.user_info.username}</h4>
						<span class="text-neutral-600 font-light">{data.user_info.email}</span>
					</a>
				</div>
			</div>
		</aside>
		<section class="flex-1">
			{#if currentInfo.isLoading}
				<span class="text-3xl">Loading Content...</span>
			{:else if currentInfo.article}
				<h1 class="text-4xl font-bold mb-2 text-start">{currentInfo.article?.title}</h1>
				<span class="ml-auto text-neutral-600 text-sm mb-2 block w-max">
					Last update:
					{getDate(currentInfo.article.update_at)}
				</span>
				<div class="prose prose-neutral prose-lg w-full">{@html currentInfo.article?.content}</div>
			{:else if currentInfo.error}
				<p>Error: {currentInfo.error}</p>
			{/if}
		</section>
	</div>
</main>
