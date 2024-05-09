<script>
	import { onMount } from 'svelte';

	onMount(() => {
		if (localStorage.getItem('authorization') === null) window.location.replace('/login');
	});
</script>
