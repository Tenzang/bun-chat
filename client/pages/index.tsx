import React from "react";
import styles from "../styles/Home.module.css";
import { ChatBox } from "../components";

export default function Home({}) {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1>Bun Chat</h1>
				<ChatBox />
			</main>
		</div>
	);
}
