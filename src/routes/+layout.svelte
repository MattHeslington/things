<script lang="ts">
	let { children, data } = $props()
	import '../app.css'

	import { ModeWatcher } from 'mode-watcher'
	import Theme from './theme.svelte'
	import Projects from '$lib/components/projects/projects.svelte'
	import Sections from '$lib/components/sections/sections.svelte'
	import { selectedProject } from '$lib/stores/projectStore'
	
	let projects = $derived(data.projects)
	let sections = $derived(data.sections)
	let filteredSections = $derived(
		$selectedProject ? sections.filter(section => section.projectId === $selectedProject.id) : []
	)
</script>

<ModeWatcher />
<Theme />

<div class="flex h-screen">
	<!-- Column 1: Markdown Scratchpad -->
	<div class="w-1/3 border-r border-gray-200 p-4">
		<h2 class="text-lg font-semibold mb-4">Scratchpad</h2>
		<textarea 
			class="w-full h-full resize-none p-2 border rounded" 
			placeholder="Your markdown notes..."
		></textarea>
	</div>
	
	<!-- Column 2: Projects and Sections -->
	<div class="w-1/3 border-r border-gray-200 flex flex-col">
		<div class="p-4 border-b border-gray-200">
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
