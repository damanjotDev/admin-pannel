import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userRepository } from '../repository/user.repository';
import { useUserStore } from '../store/userStore';
import type { User } from '../types/user.types';
import type { ApiError } from '@/lib/types';
import type { UpdateUserPayload } from '../types/updateUser.types';
import { USER_QUERY_KEYS } from '../constants';
import { toast } from '@/lib/toast';

export const useUpdateUser = () => {
    const { setUser } = useUserStore();
    const queryClient = useQueryClient();

    return useMutation<User, ApiError, UpdateUserPayload>({
        mutationKey: [USER_QUERY_KEYS.UPDATE_USER],
        mutationFn: userRepository.updateUser,

        onSuccess: (updatedUser) => {
            //Update Zustand store
            setUser(updatedUser);

            //Update query cache directly (fast, no refetch)
            queryClient.setQueryData([USER_QUERY_KEYS.CURRENT_USER], updatedUser);

            //Invalidate to refetch if backend mutates more fields
            queryClient.invalidateQueries({
                queryKey: [USER_QUERY_KEYS.CURRENT_USER],
            });
        },

        onError: (error: ApiError) => {
            toast.error(error.message);
        },
    });
};
