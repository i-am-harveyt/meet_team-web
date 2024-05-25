<script>
	import {
		Avatar,
		Heading,
		Table,
		TableBody,
		TableBodyRow,
		TableBodyCell,
		TableHead,
		TableHeadCell,
		Hr,
		ImagePlaceholder
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { fetchProfile } from './../profile.util.js';
	import { page } from '$app/stores';
	import { marked } from 'marked';

	// fields
	let name = '';
	let desc = '';
	const columns = ['name', 'teacher', 'year', 'semester'];
	let items = [
		{ id: 1, name: '資料庫管理', teacher: '周致遠', year: 112, semester: 2 },
		{ id: 2, name: '系統分析與設計', teacher: '杜雨儒', year: 112, semester: 1 }
	];
	const userID = $page.params.id;

	// onMount
	onMount(() => {
		if (window.localStorage.getItem('authorization') === null) window.location.replace('/login');
		(async () => {
			const profileInfo = await fetchProfile(userID);
			setTimeout(() => {
				name = profileInfo.data.name;
				desc = profileInfo.data.description;
			}, 600);
		})();
	});
</script>

<section
	class="
	mt-5 flex
	w-4/5 flex-col
	rounded-2xl
	bg-gray-100
	p-5
	dark:bg-gray-800
"
>
	<div id="description-info" class="ml-5 mt-5">
		{#if desc === '' || name === ''}
			<ImagePlaceholder />
		{:else}
			<div id="account-info" class="flex items-center">
				<Avatar size="lg" />
				<p class="ml-5 text-2xl">{name}</p>
			</div>
			<Heading tag="h4" class="mt-3">Description</Heading>
			<div class="prose break-all dark:prose-invert">
				{@html desc === null ? 'None' : marked(desc)}
			</div>
		{/if}
	</div>
	<Hr />
	<div id="courses info" class="ml-5">
		<Heading tag="h4">Courses</Heading>
		<Table class="mt-5">
			<TableHead>
				{#each columns as col}
					<TableHeadCell>{col}</TableHeadCell>
				{/each}
			</TableHead>
			<TableBody>
				{#each items as item}
					<TableBodyRow>
						<TableBodyCell>{item.name}</TableBodyCell>
						<TableBodyCell>{item.teacher}</TableBodyCell>
						<TableBodyCell>{item.year}</TableBodyCell>
						<TableBodyCell>{item.semester}</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</section>
