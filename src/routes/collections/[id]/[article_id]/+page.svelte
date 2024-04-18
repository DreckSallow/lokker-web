<script lang="ts">
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<h1 class="text-center font-bold text-4xl mb-4">{data.title}</h1>
<div class="h-[200rem]">{data.content}</div>
