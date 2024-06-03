<script>
	import { Button, Input, Label, Modal, Textarea } from 'flowbite-svelte';
	import { submitNewTask } from './tasks.util.js';
	import FormButton from '../../../../components/FormButton.svelte';
	import { page } from '$app/stores';

	let openModal = false;
	$: newTaskName = '';
	$: newTaskDesc = '';
	$: newTaskAssignee = '';
	$: newTaskReviewer = '';
	let loading = false;
	const groupId = $page.params.id ? $page.params.id : '';

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
</script>

<div>
	<Button on:click={() => (openModal = true)} color="green" class="mb-2 self-end">＋New Task</Button
	>
	<Modal size="sm" title="Add New Task" bind:open={openModal} outsideclose>
		<div class="mx-auto flex w-3/4 flex-col space-y-3 max-md:w-4/5">
			<div class="flex items-center justify-between">
				<Label for="new-task-name" class="text-lg">Name:</Label>
				<Input bind:value={newTaskName} id="new-task-name" class="w-2/3" placeholder="Task Name" />
			</div>
			<div class="flex items-center justify-between">
				<Label for="new-task-desc" class="text-lg">Description:</Label>
				<Textarea
					bind:value={newTaskDesc}
					id="new-task-desc"
					class="w-2/3"
					placeholder="Task Description"
				/>
			</div>
			<div class="flex items-center justify-between">
				<Label for="new-task-assignee" class="text-lg">Assignee:</Label>
				<Input
					bind:value={newTaskAssignee}
					id="new-task-assignee"
					class="w-2/3"
					placeholder="Task Assignee"
				/>
			</div>
			<div class="flex items-center justify-between">
				<Label for="new-task-reviewer" class="text-lg">Reviewer:</Label>
				<Input
					bind:value={newTaskReviewer}
					id="new-task-reviewer"
					class="w-2/3"
					placeholder="Task Reviewer"
				/>
			</div>
			<FormButton onClickFunction={submit} {loading}>Submit</FormButton>
		</div>
	</Modal>
</div>
