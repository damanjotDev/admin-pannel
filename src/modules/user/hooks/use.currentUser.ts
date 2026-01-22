import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userRepository } from '../repository/user.repository';
import { USER_QUERY_KEYS } from '../constants';
import { useUserStore } from '../store/userStore';
import type { User } from '../types/user.types';
import type { ApiError } from '@/lib/types';

export const useCurrentUser = () => {
    const { setUser } = useUserStore();

    const query = useQuery<User, ApiError>({
        queryKey: [USER_QUERY_KEYS.CURRENT_USER],
        queryFn: () => userRepository.getCurrentUser(),
        retry: false,
    });

    useEffect(() => {
        if (query.data) {
            setUser(query.data);
        }
    }, [query.data, setUser]);

    return query;
};
