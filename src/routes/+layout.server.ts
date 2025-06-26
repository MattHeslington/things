import type { LayoutServerLoad } from './$types';
import { projects, sections } from '$lib/server/db/schema'
export const load: LayoutServerLoad = async ({ locals }) => {
	const allProjects = await locals.db.select().from(projects).orderBy(projects.id);
	const allSections = await locals.db.select().from(sections).orderBy(sections.id);
        return {
            projects: allProjects,
            sections: allSections
        }
};