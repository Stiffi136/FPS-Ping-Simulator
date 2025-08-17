import { Client } from "./client";
import { Server } from "./server";

export class Simulator {
    private client: Client;
    private server: Server;
    private ping: number;

    public getPing(): number {
        return this.ping;
    }

    constructor(hitHandle: () => void, ping: number = 30) {
        this.client = new Client(hitHandle);
        this.server = new Server();
        this.ping = ping;
    }

    async Shoot(): Promise<void> {
        const clientPackage = await this.client.Shoot();

        await new Promise(resolve => setTimeout(resolve, this.ping));

        const serverPackage = this.server.ReceivePackage(clientPackage);

        if (!serverPackage) return;

        await new Promise(resolve => setTimeout(resolve, this.ping));

        this.client.ReceivePackage(serverPackage);
    }
}