<script>
	import { onMount } from 'svelte';
	import Track from '../../components/Track.svelte';

	const statusList = ['Todo', 'Doing', 'Done'];
	/**
	 * @type {any[]}
	 */
	let tasksList = [];

	onMount(() => {
		(async () => {
			const data = await fetch('http://localhost:8000/user/tasks', {
				method: 'GET',
				headers: {
					Accept: '*',
					'Content-Type': 'application/json',
					authorization: `${window.localStorage.getItem('authorization')}`
				}
			});
			const tasks = (await data.json())['data']['tasks'];
			setTimeout(() => (tasksList = tasks), 300);
		})();
	});
</script>

<section id="task" class="w-4/5">
	<div
		class="
		flex
		h-[85dvh]
		scroll-m-0
		justify-center
		space-x-12
		overflow-x-auto
		max-xl:justify-start
		"
	>
		{#each statusList as status}
			<Track {status} tasks={tasksList.filter((v) => v.status == status)} />
		{/each}
	</div>
</section>
