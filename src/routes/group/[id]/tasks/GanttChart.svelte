<script>
	import { Button, Label, Popover } from 'flowbite-svelte';
	import Container from '../../../../components/Container.svelte';
	import { blur, slide } from 'svelte/transition';

	export let tasks = [];

	/**
	 * @param {Date} start
	 * @param {Date} end
	 */
	function countTimeSpan(start, end) {
		return Math.floor((end - start) / (1000 * 60 * 60 * 24));
	}

	const taskColors = { Done: '#34d399', Doing: '#f87171', Todo: '#fb923c' };
	const today = new Date();
	const startDate = new Date(Math.min(...tasks.map((t) => new Date(t.create_at))));
	const endDate = new Date();
	const days = Math.ceil((today - startDate) / (1000 * 60 * 60 * 24));
	let dates = [];
	for (let d = new Date(startDate.getTime()); d <= today; d.setDate(d.getDate() + 1))
		dates.push(new Date(d));
</script>

<Container>
	<section
		style="--days: {days}; --tasks: {tasks.length};"
		class="dynamic-grid mx-auto items-center overflow-x-scroll"
	>
		{#each dates as date, i}
			<Label
				class="text-gray-600 dark:text-gray-300"
				style="
				grid-row-start: 1; grid-row-end: 2;
				grid-column-start: {i + 1};
				grid-column-end: {i + 2};
				">{date.getMonth() + 1}/{date.getDate()}</Label
			>
			<span
				style="
				grid-row-start: 2; grid-row-end: {tasks.length + 2};
				grid-column-start: {i + 1};
				grid-column-end: {i + 2};
				"
				class="h-full w-0 border border-gray-400 dark:border-gray-600"
			/>
		{/each}
		{#each tasks as t, i}
			<Button
				id="task{t.id}"
				href={`/task/${t.id}`}
				class="mb-2 h-10 rounded-2xl p-1"
				style="
				grid-row-start: {i + 1 + 1};
				grid-row-end: {i + 2 + 1};
				grid-column-start: {countTimeSpan(startDate, new Date(t.create_at)) + 1};
        grid-column-end: {1 +
					(t.close_at !== null
						? countTimeSpan(startDate, new Date(t.close_at))
						: countTimeSpan(startDate, today))};
				background-color: {taskColors[t.status]}
				"
			>
				<span class="text-lg w-full overflow-hidden text-ellipsis text-nowrap">{t.name}</span>
			</Button>
			<Popover title={t.name} triggeredBy="#task{t.id}" transition={blur} params={{duration: 200}}>
				<p class="max-h-32 w-60 overflow-hidden text-ellipsis">
					{t.description}
				</p>
			</Popover>
		{/each}
	</section>
</Container>

<style>
	.dynamic-grid {
		@apply grid;
		grid-template-columns: repeat(var(--days), minmax(60px, 1fr));
		grid-template-rows: 50px repeat(var(--tasks), minmax(60px, 1fr));
	}
</style>
