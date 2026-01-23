import { GenericTable } from '@/components/ui/genericTable';
import { ROUTES } from '@/constants/routes';
import { useDeleteOrder } from '@/modules/order/hooks/use.deleteOrder';
import { useOrders } from '@/modules/order/hooks/use.Orders';
import { useNavigate } from 'react-router-dom';

export const HomeScreen = () => {
    const navigate = useNavigate();
    const getOrdersQuery = useOrders({ page: 1, limit: 10 });
    const deleteOrderQuery = useDeleteOrder();

    return (
        <div className="w-full min-h-screen p-0 flex flex-col gap-5">
            <h1 className="text-2xl font-bold">Welcome home</h1>

            <GenericTable
                title="Orders"
                onCreate={() => navigate(ROUTES.CREATE_ORDER)}
                columns={[
                    { header: 'User', accessor: (row) => row.user?.name || '-' },
                    { header: 'Amount', accessor: 'amount' },
                    { header: 'Payment ID', accessor: 'paymentId' },
                    { header: 'Status', accessor: 'status' },
                    { header: 'Created At', accessor: (row) => new Date(row.createdAt).toLocaleDateString() },
                ]}
                data={getOrdersQuery.data?.orders || []}
                onEdit={(row) => navigate(ROUTES.UPDATE_ORDER.replace(':orderId', row._id))}
                onDelete={(row) => deleteOrderQuery.mutate(row._id)}
                isLoading={getOrdersQuery.isLoading}
                isError={getOrdersQuery.isError || deleteOrderQuery.isError}
                errorMessage={getOrdersQuery.error?.message || deleteOrderQuery.error?.message}
            />
        </div>
    );
};
