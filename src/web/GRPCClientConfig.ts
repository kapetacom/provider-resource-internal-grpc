/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import _, { cloneDeep } from 'lodash';
import { KIND_GRPC_API, KIND_GRPC_CLIENT, GRPCResourceSpec } from './types';

import {
    IResourceTypeProvider,
    ResourceRole,
    ResourceProviderType,
} from '@kapeta/ui-web-types';

import { Metadata } from '@kapeta/schemas';

import { DSLData } from '@kapeta/kaplang-core';
const packageJson = require('../../package.json');

const GRPCClientConfig: IResourceTypeProvider<Metadata, GRPCResourceSpec, DSLData> = {
    kind: KIND_GRPC_CLIENT,
    version: packageJson.version,
    title: 'GRPC Client',
    role: ResourceRole.CONSUMES,
    type: ResourceProviderType.INTERNAL,
    converters: [
        {
            fromKind: KIND_GRPC_API,
            createFrom: (data) => {
                if (!data.kind?.startsWith(KIND_GRPC_CLIENT)) {
                    throw new Error(`Invalid resource kind: ${data.kind}. Expected ${KIND_GRPC_CLIENT}`);
                }
                const copy = cloneDeep(data);
                if (!copy.spec) {
                    copy.spec = {
                        port: {
                            type: 'grpc',
                        },
                    };
                }
                return copy;
            },
        },
    ],
    definition: {
        kind: 'core/resource-type-internal',
        metadata: {
            name: 'kapeta/resource-type-grpc-client',
            title: 'GRPC Client',
            description: 'Provides GRPC Clients in your plans',
        },
        spec: {
            ports: [
                {
                    name: 'grpc',
                    type: 'rest',
                },
            ],
        },
    },
    capabilities: {
        directDSL: true,
    },
};

export default GRPCClientConfig;
