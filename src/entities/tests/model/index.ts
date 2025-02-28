export enum Type {
    CLASSIC = "CLASSIC",
    SERVER_SIDE = "SERVER_SIDE",
    MVT = "MVT"
}
  
export enum Status {
    DRAFT = "DRAFT",
    ONLINE = "ONLINE",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED",
}

export interface Tests {
    id: number;
    name: string;
    type: Type;
    status: Status;
    siteId: number;
}