import Link from "next/link";

export default () => {
	const urls = [
		{
			title: "Home",
			href: "/",
		},
		{
			title: "Choose a Room",
			href: "/rooms",
		},
	];

	return (
		<nav>
			<ul className="flex gap-x-10 pl-5 text-xl">
				{urls.map(({ title, href }, i) => (
					<li className="" key={i}>
						<Link href={href}>{title}</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};
