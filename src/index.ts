import { SearchParam } from "./classes/SearchParam";

const form = document.getElementById("poke-search") as HTMLFormElement;
const keyword = document.getElementById("keyword") as HTMLInputElement;
const searchOption = document.getElementById("search-option") as HTMLSelectElement;

if (form) {
	form.addEventListener("submit", (e: Event) => {
		e.preventDefault();
		let option: number = parseInt(searchOption.value);
		let values: [string, number];
		values = [keyword.value, option];
	
		const searchParams = new SearchParam(...values);
	
		searchParams.getStats().then(pokeStats => {
			if (pokeStats) pokeStats.populate();
		});	
	});
}

/******
 *  Materialise component initialisation
 *****/
$(() => {
  (<any>$(".sidenav")).sidenav();
  (<any>$("select")).formSelect();
});

