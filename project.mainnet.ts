import {EthereumDatasourceKind, EthereumHandlerKind, EthereumProject,} from "@subql/types-ethereum";

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
    chainId: "8453",
    /**
     * These endpoint(s) should be public non-pruned archive node
     * We recommend providing more than one endpoint for improved reliability, performance, and uptime
     * Public nodes may be rate limited, which can affect indexing speed
     * When developing your project we suggest getting a private API key
     * If you use a rate limited endpoint, adjust the --batch-size and --workers parameters
     * These settings can be found in your docker-compose.yaml, they will slow indexing but prevent your project being rate limited
     */
    endpoint: [""],

  },
  dataSources: [{
    kind: EthereumDatasourceKind.Runtime,
    startBlock: 9600683,
    options: {
      abi: 'SQTGift',
      address: '0x86DF167B61bd62320058FCc9099D82FebB9a054b',
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
        },
        {
          handler: "handleTransfer",
          kind: EthereumHandlerKind.Event,
          filter: {
            topics: [
              "Transfer(address,address,uint256)"
            ]
          }
        }
      ]
    }
  },
    {
      kind: EthereumDatasourceKind.Runtime,
      startBlock: 9600683,
      options: {
        abi: 'SQTRedeem',
        address: '0x6bC17BaDE85AE02326db4123a339C370e6D06b35',
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
