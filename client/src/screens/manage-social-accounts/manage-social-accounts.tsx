import React from "react"
import { Button, useStore } from "../../components"
import { Container, Typography } from "@material-ui/core"
import { RouteComponentProps } from "@reach/router"
import FacebookLogin from "react-facebook-login";

import * as buttonClasses from "../../components/button/button.style";

import { cx } from "emotion";
import { Facebook } from "@material-ui/icons";
import { parseJwt } from "../../utils";

type Props = RouteComponentProps

export const ManageSocialMedia = ({ }: Props) => {
    const { userId, veenupToken } = useStore()


    const postData = async (url = "", data = {}) => {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + veenupToken
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    const responseFacebook = (response: any) => {
        console.log(response)
        const { accessToken, name, email } = response;

        console.log(accessToken)
        if (accessToken && name && email) {
            postData("http://localhost:5000/connected-accounts", {
                userId,
                token: accessToken,
                name,
                email
            }).then((response) => {
                console.log(response)
            }).catch()
        }


    }

    return (
        <Container>
            <Typography variant='h6'>Manage your social accounts</Typography>
            <FacebookLogin
                appId="1699457083617896"
                fields="name,email,picture"
                scope="public_profile,email,user_birthday,manage_pages,publish_pages,pages_show_list,read_insights,pages_messaging"
                returnScopes
                textButton="Add Facebook"
                callback={responseFacebook}
                cssClass={cx(buttonClasses.root, buttonClasses.primaryContained)}
            />
            <Button>Add Facebook</Button>
            <Button>Add Facebook</Button>
        </Container>
    )
}