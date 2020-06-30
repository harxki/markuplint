export default class MLParseError extends Error {
	constructor(readonly line: number, readonly col: number, readonly raw: string, readonly nodeName: string) {
		super(`The ${nodeName} is invalid element (${line}:${col})`);
	}
}
