<script lang="ts">
	import { goto } from '$app/navigation';
	import Modal from '$lib/ui/components/modal.svelte';
	import { onMount } from 'svelte';

	let loginModal: Modal;
	let loginInfo = {
		loading: false,
		error: null
	};
	let loginFormErrors = {
		email: '',
		password: ''
	};
	let loginForm = {
		email: '',
		password: ''
	};
	function loginSubmit() {
		if (loginForm.email.length == 0) {
			loginFormErrors.email = 'The email must have value.';
		} else {
			loginFormErrors.email = '';
		}
		if (loginForm.password.length <= 4) {
			loginFormErrors.password = 'The password must have at least 4 chars.';
		} else {
			loginFormErrors.password = '';
		}
		if (loginFormErrors.email && loginFormErrors.password) {
			console.log('ERRORES');
			return;
		}
		loginInfo.loading = true;
		fetch('http://localhost:8000/login_user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(loginForm)
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				localStorage.setItem('auth', JSON.stringify(data));
				loginModal.close();
				goto('/dashboard', { keepFocus: false });
			})
			.catch((error) => {
				console.error(error);
			})
			.finally(() => {
				loginInfo.loading = false;
			});
	}
	let hasUser = false;
	let user_loading = true;
	onMount(() => {
		console.log('mounted!');
		let auth = JSON.parse(localStorage.getItem('auth') as string);
		user_loading = false;
		return (hasUser = !!auth);
	});
</script>

<nav class="flex align-center justify-between py-4 px-6 border-b border-soft-brand">
	<div class="flex justify-center items-center">
		<a class="text-brand italic font-semibold text-xl" href="/">Lokker</a>
	</div>
	{#if !user_loading && !hasUser}
		<ul class="flex gap-4">
			<li>
				<button class="btn-outline">Start Editing</button>
			</li>
			<li>
				<button class="btn-solid" on:click={() => loginModal.show()}>Login</button>
			</li>
		</ul>
	{:else if !user_loading}
		<a href="/dashboard" class="btn-solid">Go to dashboard</a>
	{/if}
</nav>
<Modal bind:this={loginModal}>
	<form class="px-4 py-2 max-w-[23rem]" on:submit|preventDefault={loginSubmit}>
		<h4 class="text-3xl font-bold mb-6">Enter your information</h4>
		<div class="mb-4 grid grid-cols-4 row-gap-4 items-center">
			<label for="user-email" class="font-semibold text-normal">Email</label>
			<input
				id="user-email"
				name="user-email"
				bind:value={loginForm.email}
				type="email"
				required
				class="rounded-lg p-2 border border-neutral-300 col-span-3"
			/>
			{#if loginFormErrors.email}
				<span class="text-sm italic block mt-1 col-span-4 text-red-600"
					>{loginFormErrors.email}</span
				>
			{/if}
		</div>
		<div class="grid grid-cols-4 row-gap-4 items-center">
			<label for="user-password" class="font-semibold text-normal">Password</label>
			<input
				id="user-password"
				bind:value={loginForm.password}
				type="password"
				required
				class="rounded-lg p-2 border border-neutral-300 col-span-3"
			/>
			{#if loginFormErrors.password}
				<span class="text-sm italic block mt-1 col-span-4 text-red-600"
					>{loginFormErrors.password}</span
				>
			{/if}
		</div>
		<div class="flex justify-between mt-7">
			<button type="button" class="btn-outline text-sm" on:click={loginModal.close}>Cancel</button>
			<button type="submit" class="btn-solid text-sm" disabled={loginInfo.loading}>Submit</button>
		</div>
	</form>
</Modal>
