import {IScrollBarOptions, fillOptions as fillScrollBarOptions} from "../options/scrollbar";

/**
 * Default canvas kit version to use.
 */
const DEFAULT_CANVAS_KIT_VERSION: string = "0.25.0";

/**
 * URL to the bin folder of the Skia CanvasKit library to use by default.
 * In the bin folder the CanvasKit library will need to lookup the wasm code file to execute.
 */
const DEFAULT_CANVAS_KIT_LIB_BIN_URL: string = `https://unpkg.com/canvaskit-wasm@${DEFAULT_CANVAS_KIT_VERSION}/bin/`;

/**
 * Duration in milliseconds used to throttle high-rate events
 * such as scrolling that need re-rendering afterwards.
 */
const DEFAULT_LAZY_RENDERING_THROTTLE_DURATION: number = 30;

/**
 * Options of the Skia CanvasKit renderer.
 */
export interface ICanvasKitRendererOptions {

	/**
	 * URL to the bin fodler of the Skia CanvasKit library to use.
	 * This is needed as Skia CanvasKit is based on WASM where we need
	 * to load the WASM code first from the bin folder.
	 */
	canvasKitLibBinURL?: string;

	/**
	 * Lazy rendering throttle duration in milliseconds.
	 * This is used to throttle events that occur in high-rate, such as scrolling
	 * that require a re-render cycle afterwards.
	 * For example specifying 50 will limit re-rendering to only one call per 50 milliseconds
	 * no matter how many events are received in that time-interval.
	 */
	lazyRenderingThrottleDuration?: number;

	/**
	 * Options regarding the scrollbar to render.
	 */
	scrollBar?: IScrollBarOptions;

}

/**
 * Function used to fill the options
 * where there are no options set by the user.
 */
export const fillOptions = (options?: ICanvasKitRendererOptions) => {
	if (!options) {
		options = {};
	}

	if (!options.canvasKitLibBinURL) {
		options.canvasKitLibBinURL = DEFAULT_CANVAS_KIT_LIB_BIN_URL;
	}

	if (options.lazyRenderingThrottleDuration === undefined || options.lazyRenderingThrottleDuration === null) {
		options.lazyRenderingThrottleDuration = DEFAULT_LAZY_RENDERING_THROTTLE_DURATION;
	}

	if (!options.scrollBar) {
		options.scrollBar = {};
	}

	fillScrollBarOptions(options.scrollBar);

	return options;
};