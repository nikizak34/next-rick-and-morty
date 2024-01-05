import React, {FC, PropsWithChildren} from 'react';
import {useRouter} from "next/router";

const LoginNavigate: FC<PropsWithChildren<{}>> = ({children}) => {
    const router = useRouter()
    const isAuth = true //запрос за данными пользователя
    if (!isAuth) router.push('')
    return (
        <div>

        </div>
    );
};

export default LoginNavigate;