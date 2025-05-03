<script>
	import Task from './Task.svelte';

	export let status = '';
	/**
	 * @type {{
	 id: number;
	 name: string;
	 description: string | undefined | null;
	 status: string;
	 }[]}
	 */
	export let tasks = [];
</script>

<div
	id="track-todo"
	class="
	flex
	min-w-72
	flex-col
	rounded-xl
	border
	border-gray-400
	bg-gray-200
	shadow
	shadow-gray-600
	dark:border-gray-600
	dark:bg-gray-800
	dark:shadow-gray-500
	"
>
	<p
		class="
		w-full
		border-b
		border-gray-400
		py-3
		text-center
		text-xl
		font-bold
		text-gray-600
		dark:border-gray-600
		dark:text-gray-300
		"
	>
		{status}
	</p>
	<div class="h-full flex flex-col items-center overflow-y-auto py-3">
	{#each tasks as task}
		<Task {...task} />
	{/each}
</div>
</div>
