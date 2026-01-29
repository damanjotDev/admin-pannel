import { Loader2 } from '@/lib/icons';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => ReactNode);
}

interface GenericTableProps<T> {
    title?: string; // Table title
    onCreate?: () => void;
    columns: Column<T>[];
    data: T[];
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    onRetry?: () => void;
    isLoading?: boolean;
    isError?: boolean;
    errorMessage?: string;
    emptyMessage?: string;

    // Custom classNames
    className?: string;
    headerClassName?: string;
    tableClassName?: string;
    rowClassName?: string;
    cellClassName?: string;
    actionsCellClassName?: string;
}

export function GenericTable<T>({
    title,
    onCreate,
    columns,
    data,
    onEdit,
    onDelete,
    onRetry,
    isLoading = false,
    isError = false,
    errorMessage = '',
    emptyMessage = 'No data found',
    className = '',
    headerClassName = '',
    tableClassName = '',
    rowClassName = '',
    cellClassName = '',
    actionsCellClassName = '',
}: GenericTableProps<T>) {
    const renderHeader = () => (
        <div className={`flex justify-between items-center mb-3 py-2 px-4 rounded-md bg-gray-100 ${headerClassName}`}>
            {title && <h2 className="text-lg font-semibold">{title}</h2>}
            {onCreate && (
                <Button onClick={onCreate} className="bg-blue-600 text-white hover:bg-blue-700">
                    Create {title?.split(' ')[0] || ''}
                </Button>
            )}
        </div>
    );

    const renderLoading = () => (
        <div className="w-full py-10 flex justify-center items-center text-gray-500">
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Loading...
        </div>
    );

    const renderError = () => (
        <div className="w-full py-10 flex flex-col items-center text-red-500">
            <p>{errorMessage || 'Something went wrong'}</p>
            {onRetry ? (
                <Button className="mt-2" variant="outline" onClick={onRetry}>
                    Retry
                </Button>
            ) : null}
        </div>
    );

    const renderEmpty = () => (
        <div className="w-full py-10 flex justify-center items-center text-gray-400">{emptyMessage}</div>
    );

    return (
        <div className={`w-full flex flex-col gap-3 rounded-md bg-white shadow-sm p-2 ${className}`}>
            {renderHeader()}

            <table className={`w-full border-collapse border border-gray-200 rounded-md ${tableClassName}`}>
                <thead className="bg-gray-50 rounded-t-md">
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i} className={`text-left px-4 py-2 border-b border-gray-200 ${cellClassName}`}>
                                {col.header}
                            </th>
                        ))}
                        {(onEdit || onDelete) && (
                            <th className={`px-4 py-2 border-b border-gray-200 ${actionsCellClassName}`}>Actions</th>
                        )}
                    </tr>
                </thead>

                {!isLoading && !isError && data.length > 0 && (
                    <tbody>
                        {data.map((row, idx) => (
                            <tr
                                key={idx}
                                className={`hover:bg-gray-50 ${rowClassName} ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                            >
                                {columns.map((col, i) => (
                                    <td key={i} className={`px-4 py-2 border-b border-gray-200 ${cellClassName}`}>
                                        {typeof col.accessor === 'function'
                                            ? col.accessor(row)
                                            : (row as any)[col.accessor]}
                                    </td>
                                ))}
                                {(onEdit || onDelete) && (
                                    <td
                                        className={`px-4 py-2 flex gap-2 border-b border-gray-200 ${actionsCellClassName}`}
                                    >
                                        {onEdit ? (
                                            <Button size="sm" onClick={() => onEdit(row)}>
                                                Edit
                                            </Button>
                                        ) : null}
                                        {onDelete ? (
                                            <Button size="sm" variant="destructive" onClick={() => onDelete(row)}>
                                                Delete
                                            </Button>
                                        ) : null}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                )}
            </table>

            {isLoading && renderLoading()}
            {isError && renderError()}
            {!isLoading && !isError && data.length === 0 && renderEmpty()}
        </div>
    );
}
