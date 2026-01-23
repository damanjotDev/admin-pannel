import { useForm, yupResolver, Controller } from '@/lib/reactHookForm';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Button,
    Input,
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from '@/components/ui';
import { Loader2 } from '@/lib/icons';
import { useCurrentOrder } from '../hooks/use.currentOrder';
import { useUpdateOrder } from '../hooks/use.updateOrder';
import { useEffect } from 'react';
import { updateOrderSchema } from '../schema/updateOrder.schema';
import type { UpdateOrderPayload } from '../types/updateOrder.types';
import { ROUTES } from '@/constants/routes';
import { QueryBoundary } from '@/components/boundaries/queryBoundary';

export const UpdateOrderForm = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();

    const currentOrderQuery = useCurrentOrder(orderId || '');
    const updateOrderMutation = useUpdateOrder();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<UpdateOrderPayload>({
        resolver: yupResolver(updateOrderSchema),
    });

    useEffect(() => {
        if (currentOrderQuery.data) {
            reset({
                amount: currentOrderQuery.data.amount,
                paymentId: currentOrderQuery.data.paymentId,
                status: currentOrderQuery.data.status,
            });
        }
    }, [currentOrderQuery.data, reset]);

    const onSubmit = (data: UpdateOrderPayload) => {
        if (!orderId) return;
        updateOrderMutation.mutate(
            { orderId, payload: data },
            {
                onSuccess: () => {
                    navigate(ROUTES.HOME);
                },
            },
        );
    };

    return (
        <QueryBoundary query={currentOrderQuery} notFoundMessage="Order not found.">
            <form className="w-full grid grid-cols-1 gap-5" onSubmit={handleSubmit(onSubmit)}>
                {/* Amount */}
                <div className="grid w-full items-center gap-1.5">
                    <label htmlFor="amount" className="text-sm">
                        Amount
                    </label>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="Amount"
                        {...register('amount')}
                        disabled={updateOrderMutation.isPending}
                    />
                    {errors.amount && <p className="text-red-500 text-xs">{errors.amount.message}</p>}
                </div>

                {/* Payment ID */}
                <div className="grid w-full items-center gap-1.5">
                    <label htmlFor="paymentId" className="text-sm">
                        Payment ID
                    </label>
                    <Input
                        id="paymentId"
                        placeholder="Payment ID"
                        {...register('paymentId')}
                        disabled={updateOrderMutation.isPending}
                    />
                    {errors.paymentId && <p className="text-red-500 text-xs">{errors.paymentId.message}</p>}
                </div>

                {/* Status */}
                <div className="grid w-full items-center gap-1.5">
                    <label className="text-sm">Status</label>

                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => (
                            <Select
                                key={field.value}
                                value={field.value}
                                onValueChange={field.onChange}
                                disabled={updateOrderMutation.isPending}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Status</SelectLabel>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />

                    {errors.status && <p className="text-red-500 text-xs">{errors.status.message}</p>}
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    className="w-full rounded-none gradient8 text-sm text-white py-3"
                    disabled={updateOrderMutation.isPending}
                >
                    {updateOrderMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update Order
                </Button>
            </form>
        </QueryBoundary>
    );
};
