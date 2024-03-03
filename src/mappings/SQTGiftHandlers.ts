// SPDX-License-Identifier: Apache-2.0

// Auto-generated

import {NftOwnerChanges, Series, UserNft, UserUnclaimedNft} from "../types";
import {
  AllowListAddedLog,
  AllowListRemovedLog,
  GiftMintedLog,
  SeriesActiveUpdatedLog,
  SeriesCreatedLog,
  TransferLog,
} from "../types/abi-interfaces/SQTGift";
import assert from "assert";


export async function handleAllowListAddedSQTGiftLog(log: AllowListAddedLog): Promise<void> {
  const {args} = log
  if (!args) return
  const [account, sericesId, amount] = args
  const existUserSericesItem = await UserUnclaimedNft.get(`${account}-${sericesId}`)
  if (existUserSericesItem) {
    existUserSericesItem.amount += BigInt(amount)
    await existUserSericesItem.save()
    return
  }
  // create & update same serices
  const userUnclaimedNft = UserUnclaimedNft.create({
    id: `${account}-${sericesId.toString()}`,
    seriesId: sericesId.toString(),
    amount: BigInt(amount),
    address: account
  })

  await userUnclaimedNft.save()
}

export async function handleAllowListRemovedSQTGiftLog(log: AllowListRemovedLog): Promise<void> {
  const {args} = log
  if (!args) return
  const [account, sericesId, amount] = args
  const existUserSericesItem = await UserUnclaimedNft.get(`${account}-${sericesId}`)
  if (existUserSericesItem) {
    existUserSericesItem.amount -= BigInt(amount)

    if (existUserSericesItem.amount <= 0) {
      await UserUnclaimedNft.remove(`${account}-${sericesId}`)
      return
    }
    await existUserSericesItem.save()
  }
}

export async function handleGiftMintedSQTGiftLog(log: GiftMintedLog): Promise<void> {
  const {args} = log
  if (!args) return
  const [account, sericesId, tokenId] = args

  await UserUnclaimedNft.remove(`${account}-${sericesId.toString()}`)

  const nfts = UserNft.create({
    id: tokenId.toString(),
    seriesId: sericesId.toString(),
    address: account
  })

  await nfts.save()
}

export async function handleSeriesCreatedSQTGiftLog(log: SeriesCreatedLog): Promise<void> {
  const {args} = log
  if (!args) return
  const sericesItem = Series.create({
    id: args[0].toString(),
    maxSupply: args[1].toBigInt(),
    tokenURI: args[2],
    active: true
  })

  await sericesItem.save()
}

export async function handleSeriesActiveUpdatedSQTGiftLog(log: SeriesActiveUpdatedLog): Promise<void> {
  const {args} = log
  if (!args) return

  const sericesItem = await Series.get(args[0].toString())

  if (!sericesItem) return

  sericesItem.active = args[1]
  await sericesItem.save()
}

export async function handleTransfer(log: TransferLog): Promise<void> {
  assert(log.args, 'failed to decode transfer log');
  const {from, to, tokenId} = log.args;
  if (from !== '0x0000000000000000000000000000000000000000') {
    await NftOwnerChanges.create({
      id: `${log.transactionHash}:${log.logIndex}`,
      oldOwner: from,
      newOwner: to,
      tokenId: tokenId.toNumber(),
    }).save();
  }
  const nft = await UserNft.get(tokenId.toString());
  if (nft) {
    nft.address = to;
    await nft.save();
  }
}
