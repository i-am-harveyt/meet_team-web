<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { submitNewTask } from './tasks.util.js';
	import GanttChart from './GanttChart.svelte';

	const statusList = ['Todo', 'Doing', 'Done'];
	/**
	 * @type {any[]}
	 */
	let tasksList = [];
	let defaultModal = false;
	let loading = false;
	const groupId = $page.params.id ? $page.params.id : '';
	$: newTaskName = '';
	$: newTaskDesc = '';
	$: newTaskAssignee = '';
	$: newTaskReviewer = '';

	function submit() {
		loading = true;
		setTimeout(() => {
			submitNewTask({
				newTaskName,
				newTaskDesc,
				newTaskAssignee: parseInt(newTaskAssignee),
				newTaskReviewer: parseInt(newTaskReviewer),
				groupId
			});
			loading = false;
		}, 1_500);
	}

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
			const data = await res.json();
			const tasks = data['data']['tasks'];
			setTimeout(() => (tasksList = tasks), 300);
		})();
	});
</script>

<main id="task" class="flex w-4/5 flex-col">
	<!-- <Button on:click={() => (defaultModal = true)} color="green" class="mb-2 self-end" -->
	<!-- 	>＋New Task</Button -->
	<!-- > -->
	<!-- <Modal size="sm" title="Add New Task" bind:open={defaultModal} outsideclose> -->
	<!-- 	<div class="mx-auto flex w-3/4 flex-col space-y-3 max-md:w-4/5"> -->
	<!-- 		<div class="flex items-center justify-between"> -->
	<!-- 			<Label for="new-task-name" class="text-lg">Name:</Label> -->
	<!-- 			<Input bind:value={newTaskName} id="new-task-name" class="w-2/3" placeholder="Task Name" /> -->
	<!-- 		</div> -->
	<!-- 		<div class="flex items-center justify-between"> -->
	<!-- 			<Label for="new-task-desc" class="text-lg">Description:</Label> -->
	<!-- 			<Textarea -->
	<!-- 				bind:value={newTaskDesc} -->
	<!-- 				id="new-task-desc" -->
	<!-- 				class="w-2/3" -->
	<!-- 				placeholder="Task Description" -->
	<!-- 			/> -->
	<!-- 		</div> -->
	<!-- 		<div class="flex items-center justify-between"> -->
	<!-- 			<Label for="new-task-assignee" class="text-lg">Assignee:</Label> -->
	<!-- 			<Input -->
	<!-- 				bind:value={newTaskAssignee} -->
	<!-- 				id="new-task-assignee" -->
	<!-- 				class="w-2/3" -->
	<!-- 				placeholder="Task Assignee" -->
	<!-- 			/> -->
	<!-- 		</div> -->
	<!-- 		<div class="flex items-center justify-between"> -->
	<!-- 			<Label for="new-task-reviewer" class="text-lg">Reviewer:</Label> -->
	<!-- 			<Input -->
	<!-- 				bind:value={newTaskReviewer} -->
	<!-- 				id="new-task-reviewer" -->
	<!-- 				class="w-2/3" -->
	<!-- 				placeholder="Task Reviewer" -->
	<!-- 			/> -->
	<!-- 		</div> -->
	<!-- 		<FormButton onClickFunction={submit} {loading}>Submit</FormButton> -->
	<!-- 	</div> -->
	<!-- </Modal> -->
	<!-- <section -->
	<!-- 	id="kanban-view" -->
	<!-- 	class="flex h-[85dvh] scroll-m-0 justify-center space-x-12 overflow-x-auto max-xl:justify-start" -->
	<!-- > -->
	<!-- 	{#each statusList as status} -->
	<!-- 		<Track {status} tasks={tasksList.filter((v) => v.status == status)} /> -->
	<!-- 	{/each} -->
	<!-- </section> -->
	<section id="gantt-view">
		<p class="text-xl">Gantt View</p>
		<GanttChart />
	</section>
</main>
