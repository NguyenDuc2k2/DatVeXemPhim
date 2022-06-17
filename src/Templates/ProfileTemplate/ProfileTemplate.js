import React, { Fragment } from "react";
import { useEffect } from "react";
import { Route } from "react-router";

export const ProfileTemplate = (props) => {

    const { Component, ...resProps } = props;

    useEffect(() => {
        window.scrollTo(0, 0)
    });

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