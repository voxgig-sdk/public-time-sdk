import { PublicTimeEntityBase } from '../PublicTimeEntityBase';
import type { PublicTimeSDK } from '../PublicTimeSDK';
import type { Control } from '../types';
import type { Timestamp, TimestampLoadMatch } from '../PublicTimeTypes';
declare class TimestampEntity extends PublicTimeEntityBase<Timestamp> {
    constructor(client: PublicTimeSDK, entopts: any);
    make(this: TimestampEntity): TimestampEntity;
    load(this: any, reqmatch?: TimestampLoadMatch, ctrl?: Control): Promise<TimestampEntity>;
}
export { TimestampEntity };
