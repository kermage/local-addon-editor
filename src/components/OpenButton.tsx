import React, { useState } from 'react';

import {
	FlyModal,
	IconButton,
	Text,
	Title,
} from '@getflywheel/local-components';
import { openInEditor } from '../helpers';
import editorIcon from './EditorIcon';

import type { Site } from '@getflywheel/local';

export default function (site: Site) {
	const [showModal, updateShowModal] = useState(false);
	const [modalContent, updateModalContent] = useState('');

	async function handleClick() {
		try {
			await openInEditor(site);
		} catch (e: unknown) {
			const error = e as Error;

			updateModalContent(error.message);
			updateShowModal(true);
		}
	}

	return (
		<div style={{ paddingInlineEnd: '10px' }}>
			<IconButton leftIcon={editorIcon} onClick={handleClick}>
				Open in Editor
			</IconButton>

			<FlyModal
				isOpen={showModal}
				onRequestClose={() => updateShowModal(false)}
			>
				<Title size="l">Open in Editor</Title>
				<Text tag="p" style={{ padding: '0 6rem 6rem' }}>
					{modalContent.split('\n')}
				</Text>
			</FlyModal>
		</div>
	);
}
