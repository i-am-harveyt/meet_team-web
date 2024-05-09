<script>
	import { A, Button, Input, Label } from 'flowbite-svelte';

	$: account = '';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div
		class="
		container mt-32
		flex flex-col
		rounded-xl
		bg-gray-300
		px-10
		py-10 dark:bg-gray-800
		"
	>
		<p
			class="
			text-center text-3xl
			dark:text-orange-100"
		>
			Welcome {account === '' ? 'to Meet Team' : account}!
		</p>
		<div class="mt-8 flex items-center justify-between">
			<Label for="account" class="mr-8 text-lg">Account</Label>
			<Input bind:value={account} id="account" placeholder="Account" class="w-60" />
		</div>
		<div class="mt-3 flex items-center justify-between">
			<Label for="password" class="mr-8 text-lg">Password</Label>
			<Input id="password" placeholder="Password" class="w-60" />
		</div>
		<Button
			id="register-button"
			class="
			mt-8
			rounded-3xl
			transition-all
			duration-200
			hover:rounded
			hover:bg-green-500
			">Register!</Button
		>
		<p class="mt-3">or, <A href="/register">register now!</A></p>
	</div>
</section>

<style>
</style>
