/* eslint-disable react/prop-types */
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

type ErrorMessageProps = {
    message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    const style = useMemo(
        () => ({
            fontSize: '14px',
        }),
        [],
    );
    return (
        <>
            <ExclamationCircleOutlined style={style} />
            &nbsp;{message}
        </>
    );
};
export default ErrorMessage;
