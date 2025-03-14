"use client"

import {useEffect, useState} from "react";
import Link from "next/link";
import {Button, Divider, Flex} from "@aws-amplify/ui-react";
import {signOut} from "aws-amplify/auth";
import {useRouter} from "next/navigation";
import { Hub } from "aws-amplify/utils";

export default function NavBar({isSignedIn}: {isSignedIn: boolean}) {
    const [authCheck, setAuthCheck] = useState(isSignedIn);
    console.log("isSignedIn", isSignedIn);

    const router = useRouter();
    useEffect(()=> {
        const hubListenerCancel = Hub.listen("auth", (data) => {
            switch (data.payload.event) {
                case "signedIn":
                    setAuthCheck(true);
                    router.push("/");
                    break;
                case "signedOut":
                    setAuthCheck(false)
                    router.push("/");
                    break;
            }
        })
        return () => hubListenerCancel();
    },[router])

    const SignOutSignIn = async () => {
        if (authCheck) {
            await signOut();
        } else {
            router.push("/signin");
        }
    }

    const defaultRoutes = [
        {
            href: "/",
            label: "Home",
        },
        {
            href: "/add",
            label: "Add title",
            loggedIn: true,
        }
    ];

    return (
        <>
            <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                padding={"1rem"}
            >
                <Flex as="nav" alignItems="center" gap="3rem" margin="0 2rem">
                    {
                        defaultRoutes.map((route) => (
                            <Link key={route.href} href={route.href}>
                                {route.label}
                            </Link>
                        ))
                    }
                </Flex>
                <Button
                    variation="primary"
                    borderRadius="2rem"
                    className="mr-4"
                    onClick={SignOutSignIn}
                >
                    {authCheck ? "Sal" : "Azucar"}
                </Button>
            </Flex>
            <Divider size="small"></Divider>
        </>
    )
}