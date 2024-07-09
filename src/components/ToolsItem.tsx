import React, { createRef } from 'react';

import {
	BasicInput,
	TableList,
	TableListRow,
	TextButton,
} from '@getflywheel/local-components';

import type { CustomSite } from '../helpers';

interface Props {
	site: CustomSite;
}

const inputRef = createRef<HTMLInputElement>();

export default function ({ site }: Props) {
	async function handleClick() {
		const command = inputRef.current?.value;

		console.log('save-editor', site, command);
	}

	return (
		<TableList>
			<TableListRow label="Command">
				<div style={{ display: 'flex', gap: '10px' }}>
					<BasicInput
						style={{ marginBottom: 0 }}
						ref={inputRef}
						// @ts-ignore
						defaultValue={site.editorCommand || 'code'}
					/>

					<TextButton onClick={handleClick} style={{ padding: 0 }}>
						Save
					</TextButton>
				</div>
			</TableListRow>
		</TableList>
	);
}
