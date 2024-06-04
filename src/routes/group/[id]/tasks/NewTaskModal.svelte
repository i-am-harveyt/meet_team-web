<script>
	import { Button, Dropdown, DropdownItem, Input, Label, Modal, Textarea } from 'flowbite-svelte';
	import { submitNewTask, fetchMembers } from './tasks.util.js';
	import FormButton from '../../../../components/FormButton.svelte';
	import { page } from '$app/stores';

	let openModal = false;
	$: newTaskName = '';
	$: newTaskDesc = '';
	let assigneeId = 0;
	$: newAssignee = '';
	let reviewerId = 0;
	$: newReviewer = '';
	let loading = false;
	const groupId = $page.params.id ? $page.params.id : '';
	let assigneeSuggestion = [];
	let reviewerSuggestion = [];

	function submit() {
		loading = true;
		submitNewTask({
			newTaskName,
			newTaskDesc,
			newTaskAssignee: parseInt(assigneeId),
			newTaskReviewer: parseInt(reviewerId),
			groupId
		});
		loading = false;
	}

	function fetchAssigneeSuggestion() {
		fetchMembers(parseInt(groupId), newAssignee).then((res) => {
			assigneeSuggestion = res.data.members;
		});
	}
	function fetchReviewerSuggestion() {
		fetchMembers(parseInt(groupId), newReviewer).then((res) => {
			reviewerSuggestion = res.data.members;
		});
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
					bind:value={newAssignee}
					on:keyup={fetchAssigneeSuggestion}
					id="new-task-assignee"
					class="w-2/3"
					placeholder="Task Assignee"
				/>
				<Dropdown open={newAssignee !== ''}>
					{#each assigneeSuggestion as m}
						<DropdownItem
							on:click={() => {
								assigneeId = m.id;
								newAssignee = m.name;
							}}>{m.name}</DropdownItem
						>
					{/each}
				</Dropdown>
			</div>
			<div class="flex items-center justify-between">
				<Label for="new-task-reviewer" class="text-lg">Reviewer:</Label>
				<Input
					bind:value={newReviewer}
					on:keyup={fetchReviewerSuggestion}
					id="new-task-reviewer"
					class="w-2/3"
					placeholder="Task Reviewer"
				/>
				<Dropdown open={newReviewer !== ''}>
					{#each reviewerSuggestion as m}
						<DropdownItem
							class="w-52"
							on:click={() => {
								reviewerId = m.id;
								newReviewer = m.name;
							}}>{m.name}</DropdownItem
						>
					{/each}
				</Dropdown>
			</div>
			<FormButton onClickFunction={submit} {loading}>Submit</FormButton>
		</div>
	</Modal>
</div>
