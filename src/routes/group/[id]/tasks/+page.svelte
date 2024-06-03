<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import GanttChart from './GanttChart.svelte';
	import { Label, Toggle } from 'flowbite-svelte';
	import Track from '../../../../components/Track.svelte';
	import Nav from '../Nav.svelte';
	import NewTaskModal from './NewTaskModal.svelte';

	const statusList = ['Todo', 'Doing', 'Done'];
	/**
	 * @type {any[]}
	 */
	let tasksList = [];
	let viewMode = false;

	onMount(() => {
		(async () => {
			const res = await fetch(`http://localhost:8000/task/all?group=${$page.params.id}`, {
				method: 'GET',
				headers: {
					Accept: '*',
					'Content-Type': 'application/json',
					authorization: `${window.localStorage.getItem('authorization')}`
				}
			});
			if (!res.ok) alert('Fetch Tasks Failed!');
			const data = await res.json();
			const tasks = data['data']['tasks'];
			setTimeout(() => (tasksList = tasks), 300);
		})();
	});
</script>

<main id="task" class="flex max-h-[90dvh] w-3/5 max-lg:w-4/5 flex-col">
	<Nav activeUrl={$page.url.pathname} />
	<div class="flex justify-between">
		<div class="flex items-center space-x-2">
			<Label for="view-mode" class="text-lg">Kanban View</Label>
			<Toggle bind:checked={viewMode} />
			<Label for="view-mode" class="text-lg">Gantt View</Label>
		</div>
		<NewTaskModal />
	</div>

	{#if viewMode}
		<section id="gantt-view">
			<p class="text-xl">Gantt View</p>
			<GanttChart />
		</section>
	{:else}
		<p class="text-xl">Kanban View</p>
		<section
			id="kanban-view"
			class="flex h-[85dvh] scroll-m-0 space-x-12 overflow-x-auto max-xl:justify-start"
		>
			{#each statusList as status}
				<Track {status} tasks={tasksList.filter((v) => v.status == status)} />
			{/each}
		</section>
	{/if}
</main>
