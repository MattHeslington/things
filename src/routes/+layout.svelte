<script lang="ts">
	let { children, data } = $props()
	import '../app.css'

	import { ModeWatcher } from 'mode-watcher'
	import Scratchpad from '$lib/components/scratchpad/scratchpad.svelte'
	import Projects from '$lib/components/projects/projects.svelte'
	import Sections from '$lib/components/sections/sections.svelte'
	import Sidebar from '$lib/components/sidebar/sidebar.svelte'
	import { selectedProject } from '$lib/stores/projectStore'

	let projects = $derived(data.projects)
	let sections = $derived(data.sections)
	let filteredSections = $derived($selectedProject ? sections.filter((section) => section.projectId === $selectedProject.id) : [])
</script>

<ModeWatcher />

<div class="flex h-screen">
	<Sidebar />
	<!-- Column 1: Markdown Scratchpad -->
	<div class="w-1/3 border-r">
		<Scratchpad />
	</div>

	<!-- Column 2: Projects and Sections -->
	<div class="flex w-1/3 flex-col border-r">
		<div class="border-b px-1">
			<Projects {projects} />
		</div>
		<div class="flex-1 p-4">
			<Sections sections={filteredSections} />
		</div>
	</div>

	<!-- Column 3: Main Content -->
	<div class="w-1/3 p-4">
		{@render children()}
	</div>
</div>

<svelte:head>
	<title>Things</title>
</svelte:head>
