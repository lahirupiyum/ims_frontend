import { BasicInfo } from "../common/BasicInfo";

export interface LastMileProvider extends BasicInfo {}
export interface LastMileMedia extends BasicInfo {};

interface LastMileConnection {
    switchPort: string;
    circuitId: string;
    bandwidth: string;
    lastMileProvider: LastMileProvider;
    media: LastMileMedia;
}

export interface LastMileConnectionRequest extends LastMileConnection {};
export interface LastMileConnectionResponse extends LastMileConnection {
    id: number;
};
