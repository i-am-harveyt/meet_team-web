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
	import { fetchCourses, fetchProfile, fetchReview } from './profile.util.js';
	import Review from './Review.svelte';
	import UpdateModal from './UpdateModal.svelte';
	import { marked } from 'marked';

	// fields
	let name = '';
	let desc = '';
	const courseCols = ['name', 'teacher', 'year', 'semester'];
	let courses = [];
	let reviews = [];

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

			reviews = await fetchReview();
			courses = await fetchCourses();
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
	max-lg:w-4/5
	dark:bg-gray-800
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
				prose-headings:my-1
				dark:prose-invert
				break-all
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
		{#each reviews as comment}
			<Review {comment} />
		{/each}
	</div>
</main>
