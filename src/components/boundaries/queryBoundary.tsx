import { Loader2 } from '@/lib/icons';
import type { QueryObserverResult } from '@tanstack/react-query';

interface QueryBoundaryProps<TData, TError = unknown> {
    query: QueryObserverResult<TData, TError>;
    children: React.ReactNode;
    notFoundMessage?: string;
}

export function QueryBoundary<TData, TError>({
    query,
    children,
    notFoundMessage = 'Data not found.',
}: QueryBoundaryProps<TData, TError>) {
    if (query.isLoading) {
        return (
            <div className="w-full py-10 flex justify-center items-center text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Loading...
            </div>
        );
    }

    if (query.isError) {
        return (
            <div className="w-full py-10 flex justify-center text-red-500">
                {(query.error as any)?.message || 'Something went wrong.'}
            </div>
        );
    }

    if (!query.data) {
        return <div className="w-full py-10 flex justify-center text-gray-500">{notFoundMessage}</div>;
    }

    return <>{children}</>;
}
