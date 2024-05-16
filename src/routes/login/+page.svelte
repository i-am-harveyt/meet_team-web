<script>
	import { A, Input, Label } from 'flowbite-svelte';
	import { login } from './login.util.js';
	import FormButton from '../../components/FormButton.svelte';
	import Container from '../../components/Container.svelte';

	$: accountInput = '';
	$: passwordInput = '';
	$: loading = false;

	function submitLogin() {
		loading = true;
		login(accountInput, passwordInput);
		setTimeout(() => {
			loading = false;
			if (window.localStorage.getItem('authorization') === null) {
				alert('Login Failed');
				return;
			}
			alert('Login Succeed');
			window.location.replace('/');
		}, 1_500);
	}
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Container>
	<div class="w mx-auto flex w-96 flex-col">
		<p
			class="
			break-all text-center
			text-3xl
			dark:text-orange-100"
		>
			Welcome {accountInput === '' ? 'to Meet Team' : accountInput}!
		</p>
		<div class="mt-8 flex items-center justify-between">
			<Label for="account" class="text-lg">Account</Label>
			<Input bind:value={accountInput} id="account" placeholder="Account" class="max-w-56" />
		</div>
		<div class="mt-3 flex items-center justify-between">
			<Label for="password" class="text-lg">Password</Label>
			<Input
				bind:value={passwordInput}
				id="password"
				type="password"
				placeholder="Password"
				class="max-w-56"
			/>
		</div>
		<FormButton onClickFunction={submitLogin} {loading}>Login</FormButton>
		<p class="mt-3">or, <A href="/register">register now!</A></p>
	</div>
</Container>

<style>
</style>
