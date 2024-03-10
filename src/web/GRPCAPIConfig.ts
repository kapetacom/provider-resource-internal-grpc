/**
 * Copyright 2023 Kapeta Inc.
 * SPDX-License-Identifier: MIT
 */

import { KIND_GRPC_API, KIND_GRPC_CLIENT, GRPCResourceSpec } from './types';
import { IResourceTypeProvider, ResourceRole, ResourceProviderType } from '@kapeta/ui-web-types';
import { Metadata } from '@kapeta/schemas';
import { DSLData } from '@kapeta/kaplang-core';

const packageJson = require('../../package.json');

export const GRPCAPIConfig: IResourceTypeProvider<Metadata, GRPCResourceSpec, DSLData> = {
    kind: KIND_GRPC_API,
    version: packageJson.version,
    title: 'GRPC API',
    role: ResourceRole.PROVIDES,
    type: ResourceProviderType.INTERNAL,
    consumableKind: KIND_GRPC_CLIENT,
    definition: {
        kind: 'core/resource-type-internal',
        metadata: {
            name: 'kapeta/resource-type-grpc-api',
            title: 'GRPC API',
            description: 'Provides GRPC API in your plans',
        },
        spec: {
            ports: [
                {
                    name: 'grpc',
                    type: 'http',
                },
            ],
        },
    },
    capabilities: {
        directDSL: true,
    },
};

export default GRPCAPIConfig;
