<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div>
	<Header />

	<main class="flex justify-center">
		<slot />
	</main>

	<footer></footer>
</div>

<style>
</style>
