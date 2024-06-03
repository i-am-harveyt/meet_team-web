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
	import { fetchCourses, fetchProfile, fetchReview } from './../profile.util.js';
	import { page } from '$app/stores';
	import { marked } from 'marked';
	import Review from '../Review.svelte';
	import DOMPurify from 'dompurify';

	// fields
	let reviews = [];
	let name = '';
	let desc = '';
	const columns = ['name', 'teacher', 'year', 'semester'];
	let courses = [];
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
			reviews = await fetchReview(parseInt(userID));
			courses = await fetchCourses(parseInt(userID));
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
			<p class="mb-3 border-b text-xl font-semibold">Description</p>
			<div class="prose dark:prose-invert prose-headings:my-1 break-all">
				{@html DOMPurify.sanitize(desc === null ? 'None' : marked(desc))}
			</div>
		{/if}
	</div>
	<Hr />
	<div id="courses info" class="ml-5">
		<p class="mb-3 border-b text-xl font-semibold">Courses</p>
		<Table class="mt-5">
			<TableHead>
				{#each columns as col}
					<TableHeadCell>{col}</TableHeadCell>
				{/each}
			</TableHead>
			<TableBody>
				{#each courses as item}
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
	<p class="mx-5 mb-3 border-b text-xl font-semibold">Reviews</p>
	<div id="review info" class="mx-5 flex flex-wrap justify-center gap-2">
		{#each reviews as comment}
			<Review {comment} />
		{/each}
	</div>
</section>
