<script>
	import {
		Avatar,
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
	import Review from '../../components/Review.svelte';
	import UpdateModal from './UpdateModal.svelte';
	import { marked } from 'marked';

	// fields
	let name = '';
	let desc = '';
	const courseCols = ['name', 'teacher', 'year', 'semester'];
	let courses = [
		{ id: 1, name: '資料庫管理', teacher: '周致遠', year: 112, semester: 2, href: '' },
		{ id: 2, name: '系統分析與設計', teacher: '杜雨儒', year: 112, semester: 1, href: '' }
	];
	let comments = [
		{
			id: '1',
			course: '資料庫管理',
			content: '神組員推推！',
			total: 5,
			rating: 4.5
		}
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

<main
	class="
	mt-5 flex
	w-3/5 flex-col
	rounded-2xl
	bg-gray-100
	p-5
	dark:bg-gray-800
	max-lg:w-4/5
"
>
	<section id="description-info" class="mx-5 mt-5">
		{#if !desc && !name}
			<ImagePlaceholder />
		{:else}
			<div id="account-info" class="flex items-center justify-between">
				<div class="flex items-center">
					<Avatar size="lg" />
					<p class="mx-5 text-2xl">{name}</p>
				</div>
				<UpdateModal value={desc} />
			</div>
			<p class="mb-3 mt-3 border-b text-xl font-semibold">Description</p>
			<div
				class="
				prose
				break-all
				dark:prose-invert
				"
			>
				{@html desc ? marked(desc ? desc : '') : 'None'}
			</div>
		{/if}
	</section>
	<Hr />
	<p class="mx-5 mb-3 border-b text-xl font-semibold">Courses</p>
	<div id="courses info" class="mx-5">
		<Table class="mt-5">
			<TableHead>
				{#each courseCols as col}
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
	<Hr />
	<p class="mx-5 mb-3 border-b text-xl font-semibold">Reviews</p>
	<div id="review info" class="mx-5 flex flex-wrap justify-center gap-2">
		{#each comments as comment}
			<Review {comment} />
		{/each}
	</div>
</main>
