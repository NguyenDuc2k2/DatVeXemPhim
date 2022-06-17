import { Fragment, useEffect } from "react";
import { Route } from "react-router";
import { USER_LOGIN } from "../../Util/Settings/Config";
import { Redirect } from "react-router-dom";


export const UserTempalate = (props) => {

    const { Component, ...resProps } = props;



    useEffect(() => {
        window.scrollTo(0, 0)
    });

    if (localStorage.getItem(USER_LOGIN) !== null) {
        return <Redirect to='/home' />
    }

    return (
        <Route {...resProps} render={(propsRoute) => {
            return (
                <Fragment>
                    <Component  {...propsRoute} />
                </Fragment>
            )
        }} />
    )
}
