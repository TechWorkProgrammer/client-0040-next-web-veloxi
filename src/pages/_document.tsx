import {Head, Html, Main, NextScript} from 'next/document';
import React from 'react';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="mask-icon" href="/apple-touch-icon.png" color="#00BFFF"/>
                <meta name="theme-color" content="#00BFFF"/>

                <meta charSet="UTF-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="author" content="fnrafa"/>
                <meta name="keywords"
                      content="VeloxiAI, Artificial Intelligence, Automation, Machine Learning, 3D, Music, Program, Data"/>
                <meta
                    name="description"
                    content="VeloxiAI accelerates your creativity with cutting-edge AI tools. Turn your ideas into 3D, music, games, NFTs, and more — all in one place."
                />

                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://veloxiai.app/"/>
                <meta property="og:title" content="VeloxiAI - Accelerate Your Creativity with AI"/>
                <meta
                    property="og:description"
                    content="VeloxiAI accelerates your creativity with cutting-edge AI tools. Turn your ideas into 3D, music, games, NFTs, and more — all in one place."
                />
                <meta property="og:image" content="/icon.png"/>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:url" content="https://veloxiai.app/"/>
                <meta name="twitter:title" content="VeloxiAI - Accelerate Your Creativity with AI"/>
                <meta
                    name="twitter:description"
                    content="VeloxiAI accelerates your creativity with cutting-edge AI tools. Turn your ideas into 3D, music, games, NFTs, and more — all in one place."
                />
                <meta name="twitter:image" content="/icon.png"/>

                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>

                <link rel="canonical" href="https://veloxiai.app/"/>
            </Head>
            <body className="bg-background-dark text-white antialiased">
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
