import Layout from "../components/Layout";

export default function App({Component, pageProps}){
    return (
        <Layout>
                <Component {...pageProps} />
                <style jsx global>{`
                    a {
                        color: tomato;
                        text-decoration: none;
                    }
                `}</style>
        </Layout>
    );
}