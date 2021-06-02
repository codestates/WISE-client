export const CHECK_OUT_REQUEST = 'CHECK_OUT_REQUEST' as const;
export const CHECK_OUT_SUCCESS = 'CHECK_OUT_SUCCESS' as const;
export const CHECK_OUT_FAILURE = 'CHECK_OUT_FAILURE' as const;

export const checkoutRequest = (orderId: string | string[], impUid: string | string[]) => ({
    type: CHECK_OUT_REQUEST,
    orderId,
    impUid,
});

export const checkoutSuccess = (status: string, message: string) => ({
    type: CHECK_OUT_SUCCESS,
    status,
    message,
});

export const checkoutFailure = (error: string) => ({
    type: CHECK_OUT_FAILURE,
    error,
});
