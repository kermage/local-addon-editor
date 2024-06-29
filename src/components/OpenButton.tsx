import React from 'react';

import { IconButton } from '@getflywheel/local-components';
import { openInEditor } from '../helpers';
import editorIcon from './EditorIcon';

import type { Site } from '@getflywheel/local';

export default function (site: Site) {
	async function handleClick() {
		await openInEditor(site);
	}

	return (
		<div style={{ paddingInlineEnd: '10px' }}>
			<IconButton leftIcon={editorIcon} onClick={handleClick}>
				Open in Editor
			</IconButton>
		</div>
	);
}
