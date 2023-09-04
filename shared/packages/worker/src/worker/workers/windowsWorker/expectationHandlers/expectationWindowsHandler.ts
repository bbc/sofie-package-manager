import { ExpectationHandler } from '../../../lib/expectationHandler'
import {
	Expectation,
	ReturnTypeDoYouSupportExpectation,
	ReturnTypeGetCostFortExpectation,
	ReturnTypeIsExpectationFulfilled,
	ReturnTypeIsExpectationReadyToStartWorkingOn,
	ReturnTypeRemoveExpectation,
} from '@sofie-package-manager/api'
import { GenericWorker } from '../../../worker'
import { WindowsWorker } from '../windowsWorker'
import { IWorkInProgress } from '../../../lib/workInProgress'

export interface ExpectationWindowsHandler extends ExpectationHandler {
	doYouSupportExpectation: (
		exp: Expectation.Any,
		genericWorker: GenericWorker,
		windowsWorker: WindowsWorker
	) => ReturnTypeDoYouSupportExpectation
	getCostForExpectation: (
		exp: Expectation.Any,
		genericWorker: GenericWorker,
		specificWorker: WindowsWorker
	) => Promise<ReturnTypeGetCostFortExpectation>
	isExpectationReadyToStartWorkingOn: (
		exp: Expectation.Any,
		genericWorker: GenericWorker,
		windowsWorker: WindowsWorker
	) => Promise<ReturnTypeIsExpectationReadyToStartWorkingOn>
	isExpectationFulfilled: (
		exp: Expectation.Any,
		wasFulfilled: boolean,
		genericWorker: GenericWorker,
		windowsWorker: WindowsWorker
	) => Promise<ReturnTypeIsExpectationFulfilled>
	workOnExpectation: (
		exp: Expectation.Any,
		genericWorker: GenericWorker,
		windowsWorker: WindowsWorker
	) => Promise<IWorkInProgress>
	removeExpectation: (
		exp: Expectation.Any,
		genericWorker: GenericWorker,
		windowsWorker: WindowsWorker
	) => Promise<ReturnTypeRemoveExpectation>
}
