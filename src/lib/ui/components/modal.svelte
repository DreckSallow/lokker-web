<script lang="ts">
	import { X } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	let dialog: HTMLDialogElement | null;

	const dispatch = createEventDispatcher();

	function closeEv() {
		dispatch('close');
	}
	export function close() {
		if (dialog) dialog.close();
	}
	export function show() {
		if (dialog) dialog.showModal();
	}
</script>

<dialog
	bind:this={dialog}
	on:close={() => closeEv()}
	on:click|self={() => closeEv()}
	on:keydown
	class="rounded-xl"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="bg-white rounded-2xl p-6 relative pt-7 w-full h-full shadow-lg">
		<button
			on:click={closeEv}
			class="hover:bg-neutral-200/70 transition rounded-lg p-1 absolute top-1.5 right-1.5"
		>
			<X class="h-5 w-5" />
		</button>
		<slot />
	</div>
</dialog>

<style>
	dialog::backdrop {
		background-color: #36363640;
		backdrop-filter: blur(2px);
	}
</style>
