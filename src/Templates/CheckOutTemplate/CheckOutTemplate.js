import { Fragment, useEffect } from "react";
import { Route } from "react-router";
import { Redirect } from "react-router-dom";
import { USER_LOGIN } from "../../Util/Settings/Config";

const CheckOutTemplate = (props) => {

    const { Component, ...resProps } = props;


    useEffect(() => {
        window.scrollTo(0, 0)
    });

    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to='/login' />
    }

    return (
        <Route {...resProps} render={(propsRoute) => {
            return (
                <Fragment>
                    <Component {...propsRoute} />
                </Fragment>
            )
        }} />
    )
}


export default CheckOutTemplate;