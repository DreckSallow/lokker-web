<script lang="ts">
	import { getContext } from 'svelte';

	const user = getContext('user');
</script>

<h2 class="bg-red-300">{user.username} - {user.email}</h2>
