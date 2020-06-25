import { PokeStats } from "./PokeStats";

export enum SearchOption {
  NAME,
  COLOUR,
}

/**
 * Represent user keyword search term and SearchOption.
 * Methods perform search requests pursuant to search paramters.
 */
export class SearchParam {
	// Divide decimetre by this value to get feet
	readonly DECIMETRE_TO_FT = 3.048;
	// Divide hectogram by this value to get pounds
	readonly HECTOGRAM_TO_LB = 4.536;
  readonly NAME_URL = "https://pokeapi.co/api/v2/pokemon/";
  readonly COLOUR_URL = "https://pokeapi.co/api/v2/pokemon-color/";
	readonly SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species/";
	readonly errorMsg = document.getElementById('poke-search-err') as HTMLSpanElement;

  constructor(private keyword: string, private option: number) {}

	/**
	 * Return a PokeStats object based on data retrieved through PokeAPI
	 * for the purpose of filling a Pokedex entry.
	 */
  async getStats() {
		let data = await this.getData();
		if (Array.isArray(data) && !data.length) return;
    let pokemonData = data[0];
    let imgUrl = data[1];
    let speciesData = data[2];

    // ATTRIBUTES
    let pokeType: string[] = [];
		let { id, height, weight, name } = pokemonData;
		height = Math.round((height / this.DECIMETRE_TO_FT) * 10) / 10;
		weight = Math.round((weight / this.HECTOGRAM_TO_LB) * 10) / 10;
    let desc: string = "placeholder desc";
    let genus: string = "placeholder genus";
    let spriteUrl: string = pokemonData.sprites.front_default;
    let pokeTypeUrl: string[] = [];

		//TYPE
    for (let pType of pokemonData.types) {
      pokeType.push(pType.type.name);
		}
		//DESC
		desc = speciesData.flavor_text_entries[0].flavor_text;
		genus = speciesData.genera[7].genus;
		pokeType.forEach(pType => {
			pokeTypeUrl.push(`./public/img/${pType}.png`)
		})

    return new PokeStats(
      pokeType,
      id,
      height,
      weight,
      name,
      desc,
      genus,
      imgUrl,
      spriteUrl,
      pokeTypeUrl
    );
  }

  /**
   * Asynchronously retrieve three pieces of Pokemon data.
   * 0. Pokemon Data (general stats such as height, weight)
   * 1. 3D Render Image Url
   * 2. Species Data (Pokemon description and genus)
   */
  async getData() {
		this.errorMsg.style.visibility = 'hidden';
    const pokemonData = $.get(`${this.NAME_URL}${this.keyword}`).fail((e) => {
			this.renderErrorMsg();
		});
    const imgUrl = this.getImgUrl();
    const speciesData = $.get(`${this.SPECIES_URL}${this.keyword}`).fail((e) => {
			this.renderErrorMsg();
		});;
    try {
			const allData = await Promise.all([pokemonData, imgUrl, speciesData]);
    	return allData;
		} catch (err) {
			console.error(`Cannot retrieve PokeAPI data for ${this.keyword}: getData() in SearchParam`, err);
		} 
		return [];
  }

  /**
   * Get 3D Render Image URL for Pokemon.
   */
  async getImgUrl() {
		let data = await this.getId();
		let num: number = typeof(data) === 'number' ? data : data.id;
    return `https://raw.githubusercontent.com/ZeChrales/PogoAssets/master/pokemon_icons/pokemon_icon_${this.getUrlSnippet(
      num
    )}_00.png`;
	}
	
	private renderErrorMsg(): void {
		this.errorMsg.style.visibility = 'visible';
		this.errorMsg.textContent = 'This Pokemon / Poke No. does not exist. Please try again.';
	}

  /**
   * Get Pokemon No. based on search keyword.
   */
  async getId() {
    if (this.isNumeric(this.keyword)) {
			return parseInt(this.keyword);
		}
    return await $.get(`${this.NAME_URL}${this.keyword}`);
  }

  /**
   * Get ID url snippet to retrieve correct image.
   * 1 -> 001
   * 13 -> 013
   * 123 -> 123
   * @param id as integer
   */
  private getUrlSnippet(id: number): string {
		let snippet: string;
    if (id < 10) {
      snippet = `00${id.toString()}`;
    } else if (id < 100) {
      snippet = `0${id.toString()}`;
    } else if (id >= 100) {
      snippet = `${id.toString()}`;
    } else {
			throw "id passed to getUrlSnippet() is NaN";
		}
    return snippet;
  }

  /**
   * Helper method to check if keyword is numeric.
   * @param value as string
   */
  private isNumeric(value: string): boolean {
    return /^-{0,1}\d+$/.test(value);
  }
}
