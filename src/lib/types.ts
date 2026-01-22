export interface User {
    _id: string;
    name: string;
    email: string;
    password: number;
    userType: string;
}

export const OrderAdminStatusTypeEnum = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETE: 'complete',
} as const;

export type OrderAdminStatusTypeEnum = (typeof OrderAdminStatusTypeEnum)[keyof typeof OrderAdminStatusTypeEnum];

export const OrderExecutiveStatusTypeEnum = {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETE: 'complete',
} as const;

export type OrderExecutiveStatusTypeEnum =
    (typeof OrderExecutiveStatusTypeEnum)[keyof typeof OrderExecutiveStatusTypeEnum];

export const OrderPaymentStatusTypeEnum = {
    PAID: 'paid',
    UNPAID: 'unpaid',
} as const;

export type OrderPaymentStatusTypeEnum = (typeof OrderPaymentStatusTypeEnum)[keyof typeof OrderPaymentStatusTypeEnum];

export interface Order {
    _id: string;

    userName: string;
    profileUrl: string;
    webUrl: string | null;

    reviewPerWeek: string;
    reviewRating: number;
    reviewDescription: string | null;
    reviewContent: string | null;

    amount: number;
    paymentId: string;

    adminStatus: OrderAdminStatusTypeEnum;
    paymentStatus: OrderPaymentStatusTypeEnum;
    executiveStatus: OrderExecutiveStatusTypeEnum;

    assignedDate: Date | null;
    dueDate: Date | null;

    completedAt: Date | null;
    completedBy: string;
    completedByUser: User | null;

    isDeleted: boolean;

    createdAt: Date;
    updatedAt: Date;

    assignees: string[];
}
