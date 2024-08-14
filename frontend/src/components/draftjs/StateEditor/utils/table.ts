import { Transforms, Editor, Range, Element, Path, BaseElement } from 'slate';

interface TableElement extends BaseElement {
    type: 'table';
    rows: number;
    columns: number;
    children: TableRowElement[];
}

interface TableRowElement extends BaseElement {
    type: 'table-row';
    children: TableCellElement[];
}

interface TableCellElement extends BaseElement {
    type: 'table-cell';
    children: ParagraphElement[];
}

interface ParagraphElement extends BaseElement {
    type: 'paragraph';
    children: { text: string }[];
}

export class TableUtil {
    editor: Editor;

    constructor(editor: Editor) {
        this.editor = editor;
    }

    insertTable = (rows: number, columns: number) => {
        const [tableNode] = Editor.nodes<TableElement>(this.editor, {
            match: n => !Editor.isEditor(n) && Element.isElement(n) && (n as TableElement).type === 'table',
            mode: 'highest',
        });

        if (tableNode) return;
        if (!rows || !columns) return;

        const cellText = Array.from({ length: rows }, () => Array.from({ length: columns }, () => ""));
        const newTable = createTableNode(cellText, rows, columns);

        Transforms.insertNodes<TableElement>(this.editor, newTable, {
            mode: 'highest',
        });
        
        Transforms.insertNodes<ParagraphElement>(
            this.editor, 
            { type: 'paragraph', children: [{ text: "" }] } as ParagraphElement, 
            { mode: 'highest' }
        );
    };

    removeTable = () => {
        Transforms.removeNodes(this.editor, {
            match: n => !Editor.isEditor(n) && Element.isElement(n) && (n as TableElement).type === 'table',
        });
    };

    insertRow = (action: 'after' | 'before') => {
        const { selection } = this.editor;

        if (selection && Range.isCollapsed(selection)) {
            const [tableNode] = Editor.nodes<TableRowElement>(this.editor, {
                match: n => !Editor.isEditor(n) && Element.isElement(n) && (n as TableRowElement).type === 'table-row',
            });
            if (tableNode) {
                const [[table, tablePath]] = Editor.nodes<TableElement>(this.editor, {
                    match: n => !Editor.isEditor(n) && Element.isElement(n) && (n as TableElement).type === 'table',
                });
                const [, currentRow] = tableNode;

                const path = action === 'after' ? Path.next(currentRow) : currentRow;

                Transforms.insertNodes(this.editor, createRow(Array(table.columns).fill('')), {
                    at: path,
                });
                Transforms.setNodes<TableElement>(this.editor, { rows: table.rows + 1 }, {
                    at: tablePath,
                });
            }
        }
    };

    insertColumn = (action: 'after' | 'before') => {
        const { selection } = this.editor;
        if (selection && Range.isCollapsed(selection)) {
            const [tableNode] = Editor.nodes<TableCellElement>(this.editor, {
                match: n => !Editor.isEditor(n) && Element.isElement(n) && (n as TableCellElement).type === 'table-cell',
            });
            if (tableNode) {
                const [[table, tablePath]] = Editor.nodes<TableElement>(this.editor, {
                    match: n => !Editor.isEditor(n) && Element.isElement(n) && (n as TableElement).type === 'table',
                });
                const [, currentCell] = tableNode;
                const startPath = action === 'after' ? Path.next(currentCell) : currentCell;

                startPath[startPath.length - 2] = 0;
                for (let row = 0; row < table.rows; row++) {
                    Transforms.insertNodes(this.editor, createTableCell(''), {
                        at: startPath,
                    });
                    startPath[startPath.length - 2]++;
                }

                Transforms.setNodes<TableElement>(this.editor, { columns: table.columns + 1 }, {
                    at: tablePath,
                });
            }
        }
    };
}

const createRow = (cellText: string[]): TableRowElement => {
    const newRow = Array.from(cellText, value => createTableCell(value));
    return {
        type: 'table-row',
        children: newRow,
    };
};

export const createTableCell = (text: string): TableCellElement => {
    return {
        type: 'table-cell',
        children: [{
            type: 'paragraph',
            children: [{ text }],
        }],
    };
};

const createTableNode = (cellText: string[][], rows: number, columns: number): TableElement => {
    const tableChildren = Array.from(cellText, (value) => createRow(value));
    return {
        type: 'table',
        children: tableChildren,
        rows,
        columns,
    };
};
