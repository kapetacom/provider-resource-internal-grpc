/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

export interface GRPCResourceSpec {
    port: {
        type: string;
    };
}

export const KIND_GRPC_API = 'kapeta/resource-type-grpc-api';

export const KIND_GRPC_CLIENT = 'kapeta/resource-type-grpc-client';
