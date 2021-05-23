/* eslint-disable react/prop-types */
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

const ErrorMessage = ({ message }) => {
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
