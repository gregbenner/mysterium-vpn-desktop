import tequilapi from "../tequila";
import {action, observable} from "mobx";

export enum DaemonStatusType {
    Up = "UP",
    Down = "DOWN"
}

export class DaemonStore {
    @observable
    loading = false
    @observable
    status = DaemonStatusType.Down

    @action
    async healthcheck() {
        this.loading = true
        try {
            const hc = await tequilapi.healthCheck(100)
            this.status = hc.uptime ? DaemonStatusType.Up : DaemonStatusType.Down
        } catch (err) {
            console.error("Healthcheck failed", err)
            this.status = DaemonStatusType.Down
        }
        this.loading = false
    }
}
