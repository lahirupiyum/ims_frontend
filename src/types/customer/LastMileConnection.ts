import { basicInfo } from "../common/BasicInfo";

interface LastMileProvider extends basicInfo {}
interface LastMileMedia extends basicInfo {};

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
