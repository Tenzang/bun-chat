import Head from "next/head";
import "../styles/globals.css";

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
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
