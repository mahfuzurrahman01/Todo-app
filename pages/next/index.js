
import Head from "next/head";
import styles from "../../styles/Home.module.css"
export default function page(params) {
    return (
        <>
            <Head>
                <title>New page</title>
            </Head>
            <main className={styles.main}>
                <div>
                    <h1>Just a dummy page</h1>
                </div>
            </main>
        </>
    )

};
