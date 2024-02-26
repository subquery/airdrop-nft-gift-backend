import { UserRedeemedNft } from "../types";
import { SQTRedeemedLog } from "../types/abi-interfaces/SQTRedeem";

export async function handleSQTRedeemed(log:SQTRedeemedLog): Promise<void> {
  const { args } = log
  
  if (!args) return 

  const [account, tokenId, seriesId, nftAddress, amount] = args

  const redeemed =  UserRedeemedNft.create({
    id: `${tokenId.toString()}-${seriesId.toString()}`,
    tokenId: tokenId.toString(),
    seriesId: seriesId.toString(),
    address: account,
    amount: amount.toBigInt()
  })

  await redeemed.save()
}