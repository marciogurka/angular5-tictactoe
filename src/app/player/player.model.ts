export class Player {
  public name: string;
  public wins: number;
  public sign: string;
  public isReady: boolean;
  public colorClass: string;
  public icon: string;

  constructor(name: string, wins: number = 0, sign: string, colorClass: string, icon: string, isReady: boolean = false) {
    this.name = name;
    this.wins = wins;
    this.sign = sign;
    this.icon = icon;
    this.colorClass = colorClass;
    this.isReady = isReady;
  }

  addWin() {
    this.wins++;
  }

  setSign(sign: string) {
    this.sign = sign;
  }
}
