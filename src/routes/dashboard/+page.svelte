<script lang="ts">
	import type { PageData } from './$types';
	import Avatar from '../../components/imgs/avatar.svelte';
	import { Input } from '$lib/ui/components/inputs';
	import Text from '$lib/ui/components/text.svelte';
	import type { UserProfile } from '$lib/types';
	import { ArrowUpFromLine } from 'lucide-svelte';
	import { api } from '$lib/utils/api';
	import Button from '$lib/ui/components/button.svelte';

	export let data: PageData;

	$: data.user.img =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__2IIAULCR-xberpmuxf-9Jx3cJZLJgLm4tSb9cDwRQ&s';

	let userForm = Object.keys(data.user).reduce(
		(acc, key) => ({ ...acc, [key]: data.user[key] }),
		{}
	) as UserProfile;

	$: userAvatar = data.user.img as string;

	let updateAction = {
		is_loading: false
	};
	function updateProfile() {
		if (updateAction.is_loading) return;
		const formData = new FormData();
		formData.append('website_url', userForm.website_url || '');
		formData.append('twitter_url', userForm.twitter_url || '');
		formData.append('bio', userForm.bio);
		formData.append('avatar', userForm.img);
		updateAction.is_loading = true;
		fetch(api('/profiles/', data.user.user_id), {
			method: 'PUT',
			body: formData
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((e) => {
				console.error(e);
			})
			.finally(() => {
				updateAction.is_loading = false;
			});
	}
</script>

<section class="w-[70%] mx-auto my-12">
	<header class="mb-10">
		<Text tag="h1" class="mb-2 text-headtext">My Profile</Text>
		<Text tag="span" class="text-subtext">Edit your profile information.</Text>
	</header>
	<div class="w-[25rem]">
		<div class="flex flex-row gap-6 p-4 items-center">
			<Avatar
				src={userAvatar}
				abr={userForm?.username.trim().at(0)}
				alt="user profile"
				hClass="h-[150px]"
				divClass="text-5xl font-bold"
			/>
			<div class="flex flex-col gap-2">
				<label class="bg-purple-700 text-white font-semibold btn cursor-pointer">
					<input
						type="file"
						accept="image/*"
						class="hidden"
						on:change={(ev) => {
							let target = ev.target;
							userForm.img = target.files[0];
							userAvatar = URL.createObjectURL(target.files[0]);
						}}
					/>
					Change Avatar
				</label>
				<button class="btn btn-outline font-semibold" on:click={() => (userAvatar = null)}>
					Remove Image
				</button>
			</div>
		</div>
		<div class="mt-6 flex flex-col gap-3">
			<label>
				<Text tag="span" class="font-semibold block mb-2">Bio</Text>
				<Input
					tag="textarea"
					required
					bind:value={userForm.bio}
					class="w-full border-2 min-h-44 max-h-64"
				/>
			</label>
			<label>
				<Text tag="span" class="font-semibold block mb-2">Website</Text>
				<Input type="url" required bind:value={userForm.website_url} class="w-full border-2" />
			</label>
			<label>
				<Text tag="span" class="font-semibold block mb-2">Twitter</Text>
				<Input type="url" required bind:value={userForm.twitter_url} class="w-full border-2" />
			</label>
		</div>
		<div class="mt-6">
			<Button loading={updateAction.is_loading} on:click={updateProfile} class="ml-auto">
				<ArrowUpFromLine class="stroke-white h-4 w-4" />
				{updateAction.is_loading ? 'Loading...' : 'Update'}
			</Button>
			<!--<button
				class="btn btn-solid flex items-center justify-center gap-2 text-sm font-semibold ml-auto"
				on:click={updateProfile}
				disabled={updateAction.is_loading}
			>
				<ArrowUpFromLine class="stroke-white h-4 w-4" />
				{updateAction.is_loading ? 'Loading...' : 'Update'}
			</button>-->
		</div>
	</div>
</section>
