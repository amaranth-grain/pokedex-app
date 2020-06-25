import { getRandomInt } from '../functions';

/**
 * All Pokemon Types.
 * Enum values follow PokeAPI type values.
 */
export enum PokeType {
  NORMAL = 1,
  FIGHTING,
  FLYING,
  POISON,
  GROUND,
  ROCK,
  BUG,
  GHOST,
  STEEL,
  FIRE,
  WATER,
  GRASS,
  ELECTRIC,
  ICE,
  DRAGON,
  DARK,
  FAIRY,
}

/**
 * Represent Pokemon's Pokedex stats.
 */
export class PokeStats {
  // DOM Reference to Pokedex entry fields
  readonly displayPokeNumber = document.getElementById(
    "display-poke-number"
  ) as HTMLSpanElement;
  readonly displayPokeName = document.getElementById(
    "display-poke-name"
  ) as HTMLDivElement;
  readonly displayPokeHeight = document.getElementById(
    "display-poke-height"
  ) as HTMLDivElement;
  readonly displayPokeWeight = document.getElementById(
    "display-poke-weight"
  ) as HTMLDivElement;
  readonly displayPokeBattles = document.getElementById(
    "display-poke-battles"
  ) as HTMLDivElement;
  readonly displayPokeDesc = document.getElementById(
    "display-poke-desc"
  ) as HTMLDivElement;
  readonly displayPokeGenus = document.getElementById(
    "display-poke-genus"
  ) as HTMLDivElement;
  readonly displayPokeSprite = document.getElementById(
    "display-poke-sprite"
  ) as HTMLImageElement;
  readonly displayPokeImg = document.getElementById(
    "display-poke-img"
  ) as HTMLImageElement;
  // Poke Type
  readonly displayPokeTypeImg1 = document.getElementById(
    "display-poke-type-img-1"
  ) as HTMLImageElement;
  readonly displayPokeTypeImg2 = document.getElementById(
    "display-poke-type-img-2"
  ) as HTMLImageElement;
  readonly displayPokeType1 = document.getElementById(
    "display-poke-type-1"
  ) as HTMLSpanElement;
  readonly displayPokeType2 = document.getElementById(
    "display-poke-type-2"
  ) as HTMLSpanElement;
  readonly type01 = document.getElementById("type01") as HTMLDivElement;
  readonly type02 = document.getElementById("type02") as HTMLDivElement;

  constructor(
    private pokeType: string[],
    private pokeNumber: number,
    private height: number,
    private weight: number,
    private name: string,
    private desc: string,
    private genus: string,
    private imgUrl: string,
    private spriteUrl: string,
    private pokeTypeUrl: string[]
  ) {}

  /**
   * Populate the Pokedex entry with the correct information
   * based on SearchParams.  PokeStats object instantiated based
   * on SearchParams.
   */
  populate(): void {
    this.displayPokeNumber.textContent = `# ${this.pokeNumber.toString()}`;
    this.displayPokeName.textContent = this.name;
    this.displayPokeHeight.textContent = `${this.height.toString()}'`;
    this.displayPokeWeight.textContent = `${this.weight.toString()} lbs`;
    this.displayPokeBattles.textContent = getRandomInt(10).toString();
    this.displayPokeDesc.textContent = this.desc;
    this.displayPokeGenus.textContent = this.genus;
    this.displayPokeImg.src = this.imgUrl;
		this.displayPokeSprite.src = this.spriteUrl;
		this.renderPokeType();
  }

	/**
	 * Render Pokemon's types by using DOM.
	 * A Pokemon necessarily has 1 or 2 types only.
	 */
  private renderPokeType(): void {
    this.displayPokeType1.textContent = this.pokeType[0];
    this.displayPokeTypeImg1.src = this.pokeTypeUrl[0];

    if (this.pokeTypeUrl.length == 1) {
      this.type02.style.display = "none";
    } else if (this.pokeTypeUrl.length == 2) {
      this.type02.style.display = "block";
      this.displayPokeType2.textContent = this.pokeType[1];
      this.displayPokeTypeImg2.src = this.pokeTypeUrl[1];
    } else {
      throw "Invalid pokeTypeUrl array length in PokeStats";
    }
	}

	/**
   * Display stats in PokeStats object.
   * For debugging purposes.
   */
  format(): string {
    return `Name: ${this.name}
		Type: ${this.pokeType[0]} / and more
		No. ${this.pokeNumber}
		Height: ${this.height}
		Weight: ${this.weight}
		Desc: ${this.desc}
		img url: ${this.imgUrl}
		Sprite url: ${this.spriteUrl}
		Poketype url: ${this.pokeTypeUrl[0]} / and more
		`;
  }
}
