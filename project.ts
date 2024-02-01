import {
  EthereumProject,
  EthereumDatasourceKind,
  EthereumHandlerKind,
} from "@subql/types-ethereum";

// Can expand the Datasource processor types via the generic param
const project: EthereumProject = {
  specVersion: "1.0.0",
  version: "0.0.1",
  name: "polygon-subql-starter",
  description:
    "This project can be use as a starting point for developing your new polygon SubQuery project",
  runner: {
    node: {
      name: "@subql/node-ethereum",
      version: ">=3.0.0",
    },
    query: {
      name: "@subql/query",
      version: "*",
    },
  },
  schema: {
    file: "./schema.graphql",
  },
  network: {
    /**
     * chainId is the EVM Chain ID, for Polygon this is 137
     * https://chainlist.org/chain/137
     */
    chainId: "84532",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: [],
    
  },
  dataSources: [{
    kind: EthereumDatasourceKind.Runtime,
    startBlock: 5112171,
    options: {
      abi: 'SQTGift',
      address: '0x3918087515024B49Aa2c197174ff3d96Ec579B30',
    },
    assets: new Map([['SQTGift', {file: './abis/SQTGift.json'}]]),
    mapping: {
      file: './dist/index.js',
      handlers: [
  {
    handler: "handleAllowListAddedSQTGiftLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "AllowListAdded(address,uint256,uint8)"
      ]
    }
  },
  {
    handler: "handleAllowListRemovedSQTGiftLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "AllowListRemoved(address,uint256,uint8)"
      ]
    }
  },
  {
    handler: "handleGiftMintedSQTGiftLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "GiftMinted(address,uint256,uint256,string)"
      ]
    }
  },
  {
    handler: "handleSeriesCreatedSQTGiftLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "SeriesCreated(uint256,uint256,string)"
      ]
    }
  },
  {
    handler: "handleSeriesActiveUpdatedSQTGiftLog",
    kind: EthereumHandlerKind.Event,
    filter: {
      topics: [
        "SeriesActiveUpdated(uint256,bool)"
      ]
    }
  }
]
    }
  },
  {
    kind: EthereumDatasourceKind.Runtime,
    startBlock: 5456894,
    options: {
      abi: 'SQTRedeem',
      address: '0x7c2c254a7Ae5642Af32F17e46601019C089a90ff',
    },
    assets: new Map([['SQTRedeem', {file: './abis/SQTRedeem.json'}]]),
    mapping: {
      file: './dist/index.js',
      handlers: [
        {
          handler: "handleSQTRedeemed",
          kind: EthereumHandlerKind.Event,
          filter: {
            topics: [
              "SQTRedeemed(address,uint256,uint256,address,uint256)"
            ]
          }
        },
      ]
    }
  }
  ],
  repository: "https://github.com/subquery/ethereum-subql-starter",
};

// Must set default to the project instance
export default project;
