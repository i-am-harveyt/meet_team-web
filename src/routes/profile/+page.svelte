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
		ImagePlaceholder,
		A
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { fetchProfile } from './profile.util.js';

	// fields
	let name = '';
	let desc = '';
	const columns = ['name', 'teacher', 'year', 'semester'];
	let courses = [
		{ id: 1, name: '資料庫管理', teacher: '周致遠', year: 112, semester: 2, href: '' },
		{ id: 2, name: '系統分析與設計', teacher: '杜雨儒', year: 112, semester: 1, href: '' }
	];

	// onMount
	onMount(() => {
		if (window.localStorage.getItem('authorization') === null) window.location.replace('/login');
		(async () => {
			const profileInfo = await fetchProfile(undefined);
			setTimeout(() => {
				name = profileInfo.data.name;
				desc = profileInfo.data.description;
				courses.forEach((c, i) => (courses[i].href = `/course/${c.id}`));
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
			<p class="break-all">{desc === null ? 'None' : desc}</p>
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
				{#each courses as item}
					<TableBodyRow>
						<TableBodyCell><A href={item.href}>{item.name}</A></TableBodyCell>
						<TableBodyCell>{item.teacher}</TableBodyCell>
						<TableBodyCell>{item.year}</TableBodyCell>
						<TableBodyCell>{item.semester}</TableBodyCell>
					</TableBodyRow>
				{/each}
			</TableBody>
		</Table>
	</div>
</section>
