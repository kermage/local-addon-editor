import {
	addIpcAsyncListener,
	getServiceContainer,
	sendIPCEvent,
} from '@getflywheel/local/main';

import type { Site, SiteJSON } from '@getflywheel/local';
import type { AddonMainContext } from '@getflywheel/local/main';

export default function (context: AddonMainContext): void {
	const {
		electron: { ipcMain },
	} = context;

	const {
		cradle: { localLogger, siteData },
	} = getServiceContainer();

	addIpcAsyncListener('main-event', async () => {
		return 'Hello world! From Editor';
	});

	ipcMain.on('ping', async (_, args) => {
		localLogger.warn('RECEIVED: "ping"', args);
		sendIPCEvent('pong', args);
	});

	ipcMain.on('save-editor', async (_, site: Site, command: string) => {
		siteData.updateSite(site.id, {
			id: site.id,
			editorCommand: command,
		} as Partial<SiteJSON>);
	});
}
