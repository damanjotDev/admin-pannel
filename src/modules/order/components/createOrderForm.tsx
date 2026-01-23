import { useForm, yupResolver, Controller } from '@/lib/reactHookForm';
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
import { useCreateOrder } from '../hooks/use.createOrder';
import { createOrderSchema } from '../schema/createOrder.schema copy';
import type { CreateOrderPayload } from '../types/createOrder.types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

const defaultValues: CreateOrderPayload = {
    amount: 0,
    paymentId: '',
    status: '',
};

export const CreateOrderForm = () => {
    const createOrderQuery = useCreateOrder();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<CreateOrderPayload>({
        defaultValues,
        resolver: yupResolver(createOrderSchema),
    });

    const onSubmit = (data: CreateOrderPayload) => {
        createOrderQuery.mutate(data, {
            onSuccess: () => {
                reset();
                navigate(ROUTES.HOME);
            },
        });
    };

    return (
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
                    disabled={createOrderQuery.isPending}
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
                    disabled={createOrderQuery.isPending}
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
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={createOrderQuery.isPending}
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
                disabled={createOrderQuery.isPending}
            >
                {createOrderQuery.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Order
            </Button>
        </form>
    );
};
