import {ICellModel} from "./cell/model/cell-model.interface";
import {fillOptions, ITableEngineOptions} from "./options";
import {ITableEngineRenderer} from "./renderer/renderer";
import {RendererFactory} from "./renderer/renderer-factory";
import {Observable, Subject} from "rxjs";
import {ITableEngineEvent} from "./event/event";
import {TableEngineEventType} from "./event/event-type";

/**
 * Entry point of the table engine library.
 */
export class TableEngine {

	/**
	 * HTML element used as container to the table engine.
	 */
	private readonly _container: HTMLElement;

	/**
	 * Cell model of the table engine.
	 */
	private readonly _cellModel: ICellModel;

	/**
	 * Options customizing the table-engine behavior.
	 */
	private readonly _options: ITableEngineOptions;

	/**
	 * Renderer to use for rendering the table.
	 */
	private readonly _renderer: ITableEngineRenderer;

	/**
	 * Subject that will emit events when something meaningful happens in the table engine.
	 */
	private readonly _events: Subject<ITableEngineEvent> = new Subject<ITableEngineEvent>();

	/**
	 * Create table engine and initialize it on the passed
	 * container element.
	 * @param container to initialize the table engine in
	 * @param cellModel to use as cell model for the table engine
	 * @param options used to modify the default behavior of the table engine
	 */
	constructor(container: HTMLElement, cellModel: ICellModel, options?: ITableEngineOptions) {
		this._container = container;
		this._cellModel = cellModel;
		this._options = fillOptions(options);

		// Initialize renderer
		this._renderer = RendererFactory.getRendererInstance(this._options.renderer.type);
		this._renderer.initialize(container, this._cellModel, this._options.renderer).then(() => {
			this._events.next({
				type: TableEngineEventType.RENDERER_READY
			});

			this._repaint();
		});
	}

	/**
	 * Repaint the current state of the table.
	 */
	private _repaint(): void {
		this._renderer.render();
	}

	/**
	 * Get the table engines cell model.
	 */
	public getCellModel(): ICellModel {
		return this._cellModel;
	}

	/**
	 * Get an observable of table engine events.
	 */
	public getEventsObservable(): Observable<ITableEngineEvent> {
		return this._events.asObservable();
	}

	/**
	 * Cleanup the table engine when no more needed.
	 */
	public cleanup(): void {
		this._events.complete();
	}

}
