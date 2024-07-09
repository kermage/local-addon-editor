import { execFile } from 'child_process';
import { readJSONSync } from 'fs-extra';
import { join } from 'path';
import { promisify } from 'util';

import type { Site } from '@getflywheel/local';

export interface CustomSite extends Site {
	editorCommand?: string;
	asLaravel?: boolean;
}

function getRootPath(site: CustomSite) {
	const parts = [site.path, 'app'];

	if (!site.asLaravel) {
		parts.push('public');
	}

	return join(...parts);
}

export async function openInEditor(site: Site) {
	const asyncExecFile = promisify(execFile);
	const { stderr } = await asyncExecFile(
		process.env.SHELL!,
		['-lc', `code ${getRootPath(site)}`],
		{
			shell: false,
		},
	);

	if (stderr) {
		throw new Error(stderr);
	}
}

interface Package {
	name: string;
	version: string;
	productName: string;
}

export const packageJSON: Package = readJSONSync(
	join(__dirname, '..', 'package.json'),
);
