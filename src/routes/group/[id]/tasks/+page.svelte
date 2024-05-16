<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Track from '../../../../components/Track.svelte';
	import { Button, Modal } from 'flowbite-svelte';
	import FormButton from '../../../../components/FormButton.svelte';

	const statusList = ['Todo', 'Doing', 'Done'];
	/**
	 * @type {any[]}
	 */
	let tasksList = [];
	let defaultModal = false;
	let loading = false;

	function submitNewTask() {
		loading = true;
		setTimeout(() => {
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
			console.log(data);
			const tasks = data['data']['tasks'];
			setTimeout(() => (tasksList = tasks), 300);
		})();
	});
</script>

<section id="task" class="flex w-4/5 flex-col">
	<Button on:click={() => (defaultModal = true)} color="green" class="mb-2 self-end"
		>＋New Task</Button
	>
	<Modal title="Add New Task" bind:open={defaultModal} class="flex flex-col">
		<FormButton onClickFunction={submitNewTask} {loading}>Submit</FormButton>
	</Modal>
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
