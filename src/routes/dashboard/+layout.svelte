<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let data: LayoutData;
	const user = writable(null);

	$: user.set(data.user);
	setContext('user', data.user);
</script>

<h1>Dashboard Protected route!</h1>
<slot></slot>
