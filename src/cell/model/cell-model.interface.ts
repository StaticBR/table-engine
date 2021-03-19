import {ICell} from "../cell";
import {ICellRange} from "../range/cell-range";
import {IRectangle} from "../../util/rect";

/**
 * Representation of a cell model.
 */
export interface ICellModel {

	/**
	 * Get a cell at the given coordinates.
	 * @param rowIndex to get cell at
	 * @param columnIndex to get cell at
	 */
	getCell(rowIndex: number, columnIndex: number): ICell | null;

	/**
	 * Get all cells in the provided range.
	 * @param range to get cells in
	 */
	getCells(range: ICellRange): ICell[];

	/**
	 * Get a list of cells in the provided rectangle (metric is pixel).
	 * @param rect rectangle to get cells in (metric is pixel)
	 */
	getCellsForRect(rect: IRectangle): ICell[];

	/**
	 * Get a cell at the given offset (metric is pixel points).
	 * @param x offset from left (horizontal)
	 * @param y offset from top (vertical)
	 */
	getCellAtOffset(x: number, y: number): ICell | null;

	/**
	 * Get bounds for the given range.
	 * @param range to get bounds for
	 */
	getBounds(range: ICellRange): IRectangle;

	/**
	 * Get the number of rows in the model.
	 */
	getRowCount(): number;

	/**
	 * Get the number of columns in the model.
	 */
	getColumnCount(): number;

	/**
	 * Get the total width of the table.
	 */
	getWidth(): number;

	/**
	 * Get the total height of the table.
	 */
	getHeight(): number;

	/**
	 * Get the size of a specific row with the given index.
	 * @param index of the row
	 */
	getRowSize(index: number): number;

	/**
	 * Get the size of a specific column with the given index.
	 * @param index of the column
	 */
	getColumnSize(index: number): number;

	/**
	 * Get the offset of the row with the given index.
	 * @param index of the row
	 */
	getRowOffset(index: number): number;

	/**
	 * Get the offset of the column with the given index.
	 * @param index of the column
	 */
	getColumnOffset(index: number): number;

	/**
	 * Resize the rows at the given row indices to the passed size.
	 * @param rowIndices indices of rows to resize
	 * @param size new size for the rows to resize
	 */
	resizeRows(rowIndices: number[], size: number): void;

	/**
	 * Resize the columns at the given column indices to the passed size.
	 * @param columnIndices indices of columns to resize
	 * @param size new size for the columns to resize
	 */
	resizeColumns(columnIndices: number[], size: number): void;

	/**
	 * Insert rows before the given index.
	 * @param insertBeforeIndex index to insert rows before
	 * @param count of rows to insert
	 */
	insertRows(insertBeforeIndex: number, count: number): void;

	/**
	 * Insert columns before the given index.
	 * @param insertBeforeIndex index to insert columns before
	 * @param count of columns to insert
	 */
	insertColumns(insertBeforeIndex: number, count: number): void;

	/**
	 * Delete rows starting with the given index.
	 * @param fromIndex index to start deleting rows from (inclusively)
	 * @param count of rows to delete
	 */
	deleteRows(fromIndex: number, count: number): void;

	/**
	 * Delete columns starting with the given index.
	 * @param fromIndex index to start deleting columns from (inclusively)
	 * @param count of columns to delete
	 */
	deleteColumns(fromIndex: number, count: number): void;

	/**
	 * Merge the passed range to a single cell.
	 * Note that this will only succeed when the range
	 * does not intersect cells spanning multiple rows and columns (will return false).
	 * @param range to merge
	 * @returns whether the cells could be merged
	 */
	mergeCells(range: ICellRange): boolean;

	/**
	 * Split a cell spanning multiple rows and columns at the given
	 * row index and column index.
	 * @param rowIndex index of the row the cell is at
	 * @param columnIndex index of the column the cell is at
	 */
	splitCell(rowIndex: number, columnIndex: number): void;

	/**
	 * Check whether the row with the given index is hidden.
	 * @param index to check row for
	 */
	isRowHidden(index: number): boolean;

	/**
	 * Check whether the column with the given index is hidden.
	 * @param index to check column for
	 */
	isColumnHidden(index: number): boolean;

	/**
	 * Hide rows with the given indices.
	 * @param rowIndices indices to hide rows for
	 */
	hideRows(rowIndices: number[]): void;

	/**
	 * Hide the columns with the given indices.
	 * @param columnIndices to hide columns for
	 */
	hideColumns(columnIndices: number[]): void;

	/**
	 * Show hidden rows with the passed indices.
	 * @param rowIndices indices of rows to show
	 */
	showRows(rowIndices: number[]): void;

	/**
	 * Show hidden columns with the passed indices.
	 * @param columnIndices indices of columns to show
	 */
	showColumns(columnIndices: number[]): void;

}
