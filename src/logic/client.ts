import { NetworkPackage } from "./NetworkPackage";
import shotSound from "../assets/sounds/shot.mp3";
import hitMarkerSound from "../assets/sounds/hitmarker.mp3";

export class Client {
    ReceivePackage(networkPackage: NetworkPackage) {
        switch (networkPackage.Message) {
            case "hit":
                this.Hit();
                break;
            default:
                break;
        }
    }

    private inputDelay: number;
    private clientSideFeedback: boolean;
    private hitHandle: () => void;

    constructor(hitHandle: () => void, inputDelay: number = 0, clientSideFeedback: boolean = false) {
        this.inputDelay = inputDelay;
        this.clientSideFeedback = clientSideFeedback;
        this.hitHandle = hitHandle;
    }

    async Shoot(): Promise<NetworkPackage> {
        await new Promise(resolve => setTimeout(resolve, this.inputDelay));

        const audio = new Audio(shotSound);
        audio.volume = 0.2;
        audio.play();

        if (this.clientSideFeedback) this.Hit();

        return new NetworkPackage("shoot");
    }

    Hit() {
        const audio = new Audio(hitMarkerSound);
        audio.volume = 0.2;
        audio.play();
        this.hitHandle();
    }
}