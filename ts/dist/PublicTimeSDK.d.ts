import { TimeEntity } from './entity/TimeEntity';
import { TimestampEntity } from './entity/TimestampEntity';
export type * from './PublicTimeTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { PublicTimeEntityBase } from './PublicTimeEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class PublicTimeSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Time(entopts?: Record<string, any>): TimeEntity;
    Timestamp(entopts?: Record<string, any>): TimestampEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): PublicTimeSDK;
    tester(testopts?: any, sdkopts?: any): PublicTimeSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof PublicTimeSDK;
export { stdutil, config, BaseFeature, PublicTimeEntityBase, PublicTimeSDK, SDK, };
