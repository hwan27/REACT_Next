import React from "react";
import AppLayout from "../components/AppLayout";
import Head from "next/head";

const Profile = () => {
    return (
        <>
            <Head>
                <title>나비넷 1.0</title>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.css"
                />
            </Head>
            <AppLayout>
                <div>내프로필</div>
            </AppLayout>
        </>
    );
};

export default Profile;
