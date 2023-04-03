import adjectives from "./adjectives";
import nouns from "./nouns";
import capitalize from "./capitalize";

export function nameGenerator() {
	const adjective = capitalize(sample(adjectives));
	const noun = capitalize(sample(nouns));
	const name = `${adjective} ${noun}`;
	return name;
}

function sample(array: string[]) {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
}
