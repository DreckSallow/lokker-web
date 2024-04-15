<script lang="ts">
	export let tag: 'div' | 'li';
	export let authorImg: string;
	export let alt: string;
	export let authorName: string;
	export let title: string;
	export let link: string;
	// export let linkText: string;
</script>

<svelte:element this="{tag}" class="rounded-xl p-4 border border-neutral-300">
	<header class="flex gap-4 items-center mb-2">
		<img src="{authorImg}" alt="{alt}" class="rounded-full h-10 w-10" />
		<h5 class="text-base text-brand/70 font-light">{authorName}</h5>
	</header>
	<h4 class="font-semibold text-xl text-brand mb-4">{title}</h4>
	<a href="{link}" class="btn-solid inline-block text-sm px-3 py-2">Ver Colleccion</a>
</svelte:element>
