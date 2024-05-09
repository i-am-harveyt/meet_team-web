<script>
	import { Button, Input, Label } from 'flowbite-svelte';

	// style
	const topInputStyle = 'mt-8 flex items-center justify-between';
	const ordInputStyle = 'mt-3 flex items-center justify-between';
	const labelStyle = 'mr-8 text-lg';
	const inputStyle = 'w-60';

	// bind values
	$:account = '';
	$: name = '';
	$: password = '';
	$: passwordAgain = '';

	// check
	let passwordsSame = true;
	$: passwordsSame = password === passwordAgain;
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
		px-10 py-10
		dark:bg-gray-800
		"
	>
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
		<Button
			id="register-button"
			class="
			mt-8
			rounded-3xl
			duration-200
			hover:rounded
			"
			disabled={!passwordsSame}
			>Register!</Button
		>
	</div>
</section>

<style>
</style>
