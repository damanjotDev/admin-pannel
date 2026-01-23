import { yup } from '@/lib/reactHookForm';

export const updateOrderSchema = yup.object({
    amount: yup.number().required('Amount is required').positive('Amount must be positive'),
    paymentId: yup.string().required('Payment ID is required'),
    status: yup.string().required('Status is required'),
});
