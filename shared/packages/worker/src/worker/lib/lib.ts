import { Accessor, AccessorOnPackage, PackageContainerOnPackage } from '@sofie-automation/blueprints-integration'
import { assertNever } from '@shared/api'

// TODO: This should be changed at some point,
// as the "cost" isn't really for a source or a target, but rather for the combination of the two as a pair.

function getAccessorTypePriority(accessor: AccessorOnPackage.Any): number {
	// Note: Lower is better
	if (!accessor.type) return 99999

	if (accessor.type === Accessor.AccessType.LOCAL_FOLDER) {
		return 0
	} else if (accessor.type === Accessor.AccessType.QUANTEL) {
		return 1
	} else if (accessor.type === Accessor.AccessType.FILE_SHARE) {
		return 2
	} else if (accessor.type === Accessor.AccessType.HTTP_PROXY) {
		// a local url should be preferred:
		const isLocal = !!`${accessor.baseUrl}`.match(/localhost|127\.0\.0\.1/)
		return 3 + (isLocal ? -0.1 : 0)
	} else if (accessor.type === Accessor.AccessType.HTTP) {
		// a local url should be preferred:
		const isLocal = !!`${accessor.baseUrl}`.match(/localhost|127\.0\.0\.1/)
		return 4 + (isLocal ? -0.1 : 0)
	} else if (accessor.type === Accessor.AccessType.CORE_PACKAGE_INFO) {
		return 99999
	} else {
		assertNever(accessor.type)
		return 99999
	}
}

/** Returns the PackageContainer Accessor which is the cheapes/best to use */
export function prioritizeAccessors<T extends PackageContainerOnPackage>(
	packageContainers: T[]
): AccessorWithPackageContainer<T>[] {
	const accessors: AccessorWithPackageContainer<T>[] = []
	for (const packageContainer of packageContainers) {
		for (const [accessorId, accessor] of Object.entries(packageContainer.accessors)) {
			accessors.push({
				packageContainer,
				accessor,
				accessorId,
				prio: getAccessorTypePriority(accessor),
			})
		}
	}
	accessors.sort((a, b) => {
		// Sort by priority (lowest first):
		if (a.prio > b.prio) return 1
		if (a.prio < b.prio) return -1

		// Sort by container id:
		if (a.packageContainer.containerId > b.packageContainer.containerId) return 1
		if (a.packageContainer.containerId < b.packageContainer.containerId) return -1

		// Sort by accessor id:
		if (a.accessorId > b.accessorId) return 1
		if (a.accessorId < b.accessorId) return -1

		return 0
	})
	return accessors
}
export interface AccessorWithPackageContainer<T extends PackageContainerOnPackage> {
	packageContainer: T
	accessor: AccessorOnPackage.Any
	accessorId: string
	prio: number
}
