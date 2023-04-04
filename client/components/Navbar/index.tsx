import styles from "./Navbar.module.scss";

export default () => {
	console.log(styles);
	return (
		<nav className={styles.navbar}>
			<ul>
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="/rooms">Choose a Room</a>
				</li>
			</ul>
		</nav>
	);
};
