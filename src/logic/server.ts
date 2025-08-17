import { NetworkPackage } from "./NetworkPackage";

export class Server {
    ReceivePackage(networkPackage: NetworkPackage): NetworkPackage | undefined {
        switch (networkPackage.Message) {
            case "shoot":
                    return new NetworkPackage("hit");
                break;
        
            default:
                break;
        }

    }

    constructor() {
        
    }
}