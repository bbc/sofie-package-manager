import { DeviceConfigManifest, ConfigManifestEntryType } from '@sofie-automation/server-core-integration'

export const PACKAGE_MANAGER_DEVICE_CONFIG: DeviceConfigManifest = {
	deviceConfig: [
		{
			id: 'debugLogging',
			name: 'Activate Debug Logging',
			type: ConfigManifestEntryType.BOOLEAN,
		},
	],
}
