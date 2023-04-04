import Head from "next/head";
import "../styles/globals.css";
import styles from "../styles/Home.module.css";
import Navbar from "components/Navbar";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Bun Chat</title>
				<meta
					name="description"
					content="A chat app built on the Bun Javascript runtime!"
				/>
				<link rel="icon" href="/favicon.png" />
			</Head>
			<div className={styles.container}>
				<main className={styles.main}>
					<h1>Bun Chat</h1>
					<Navbar />
					<Component {...pageProps} />
				</main>
			</div>
		</>
	);
}

export default MyApp;
