<script>
	import { Avatar } from 'flowbite-svelte';

	export let name = '';
</script>

<div
	class="
	flex flex-col space-y-3
	rounded-xl
	border-gray-500
	text-gray-500
	bg-gray-100
	dark:bg-gray-700
	p-3
	dark:text-gray-300
	"
>
	<div class="flex items-center space-x-3">
		<Avatar />
		<p class="text-lg font-semibold">{name}</p>
	</div>
	<p class="p-3">
		<slot />
	</p>
</div>
