import { writable } from 'svelte/store'

export type SelectedProject = {
	id: number
	name: string
	icon?: string | null
} | null

export const selectedProject = writable<SelectedProject>(null)