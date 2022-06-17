import { Fragment, useEffect } from "react";
import { Route } from "react-router";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";

export const HomeTemplate = (props) => {

    const { Component, ...resProps } = props;

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <Route {...resProps} render={(propsRoute) => {
            return (
                <Fragment>
                    <Header {...propsRoute} />
                    <Component {...propsRoute} />
                    <Footer />
                </Fragment>
            )
        }} />
    )
}
