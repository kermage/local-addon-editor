import { ipcAsync, sendIPCEvent } from '@getflywheel/local/renderer';
import { ipcRenderer } from 'electron';
import openButton from './components/OpenButton';
import toolsItem from './components/ToolsItem';
import { packageJSON } from './helpers';

import type { AddonRendererContext } from '@getflywheel/local/renderer';

export default function (context: AddonRendererContext) {
	const { hooks } = context;

	hooks.addAction('CreateSite:Mounted', async () => {
		console.log('[main-event]:', await ipcAsync('main-event'));
		ipcRenderer.once('pong', (_, args) => {
			console.log('RECEIVED: "pong"', args);
		});
		sendIPCEvent('ping', { data: Date.now() });
	});

	hooks.addContent('SiteInfo_Top_TopRight', openButton);

	hooks.addFilter('siteInfoToolsItem', (items: any) => {
		const customItems = [
			{
				path: `/${packageJSON.name}`,
				menuItem: packageJSON.productName,
				render: toolsItem,
			},
		];

		items.forEach((item: any) => {
			customItems.push(item);
		});

		return customItems;
	});
}
