import { PublicTimeEntityBase } from '../PublicTimeEntityBase';
import type { PublicTimeSDK } from '../PublicTimeSDK';
import type { Control } from '../types';
import type { Time, TimeLoadMatch } from '../PublicTimeTypes';
declare class TimeEntity extends PublicTimeEntityBase<Time> {
    constructor(client: PublicTimeSDK, entopts: any);
    make(this: TimeEntity): TimeEntity;
    load(this: any, reqmatch?: TimeLoadMatch, ctrl?: Control): Promise<TimeEntity>;
}
export { TimeEntity };
