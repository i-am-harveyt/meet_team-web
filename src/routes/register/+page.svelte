<script>
	import { Input, Label } from 'flowbite-svelte';
	import { register } from './register.util';
	import FormButton from '../../components/FormButton.svelte';
	import Container from '../../components/Container.svelte';
	// style
	const topInputStyle = 'mt-8 flex items-center justify-between';
	const ordInputStyle = 'mt-3 flex items-center justify-between';
	const labelStyle = 'mr-8 text-lg';
	const inputStyle = 'w-56';

	// bind values
	$: account = '';
	$: name = '';
	$: password = '';
	$: passwordAgain = '';
	$: loading = false;

	// check
	let passwordsSame = true;
	$: passwordsSame = password === passwordAgain;

	function submitRegister() {
		loading = true;
		register(account, password, name);
		setTimeout(() => {
			loading = false;
		}, 1_500);
	}
</script>

<svelte:head>
	<title>Register</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Container>
	<div class="flex w-96 flex-col justify-around self-center">
		<p
			class="
			text-center text-3xl
			dark:text-orange-100"
		>
			Join Meet Team!
		</p>
		<div class={topInputStyle}>
			<Label for="account" class={labelStyle}>Account</Label>
			<Input bind:value={account} id="account" placeholder="Account" class={inputStyle} />
		</div>
		<div class={ordInputStyle}>
			<Label for="name" class={labelStyle}>Name</Label>
			<Input bind:value={name} id="name" placeholder="Name" class={inputStyle} />
		</div>
		<div class={ordInputStyle}>
			<Label for="password" class={labelStyle}>Password</Label>
			<Input
				bind:value={password}
				id="password"
				type="password"
				placeholder="Password"
				class={inputStyle}
			/>
		</div>
		<div class={ordInputStyle}>
			<Label for="password-again" class={labelStyle}>Password Again</Label>
			<Input
				bind:value={passwordAgain}
				id="password-again"
				type="password"
				placeholder="Password Again"
				class={inputStyle}
			/>
		</div>
		{#if !passwordsSame}
			<p>Passwords are not same!</p>
		{/if}
		<FormButton onClickFunction={submitRegister} {loading}>Register</FormButton>
	</div>
</Container>

<style>
</style>
