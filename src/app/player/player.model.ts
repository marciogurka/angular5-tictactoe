export class Player {

  /**
   *   Name of the Player
   */
  public name: string;

  /**
   *   Number of players wins
   */
  public wins: number;

  /**
   *   Sign of the player
   */
  public sign: string;

  /**
   *   Inform if the player is ready or not
   */
  public isReady: boolean;

  /**
   *   Bootstrap 4 color class of the player
   */
  public colorClass: string;

  /**
   *   Image of the player
   */
  public icon: string;

  constructor(name: string, wins: number = 0, sign: string, colorClass: string, icon: string, isReady: boolean = false) {
    this.name = name;
    this.wins = wins;
    this.sign = sign;
    this.icon = icon;
    this.colorClass = colorClass;
    this.isReady = isReady;
  }

  /**
   * Add a win to the player data
   *
   * @returns {}
   */
  addWin() {
    this.wins++;
  }

  /**
   * Set the sign property of the player
   *
   * @param  {string} sign: string to the sign Icon name (faTimes/faCircle)
   * @returns {}
   */
  setSign(sign: string) {
    this.sign = sign;
  }
}
