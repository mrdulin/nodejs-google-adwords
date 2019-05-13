import { IBids } from './abstract/Bids';
import { IMoney } from './Money';
import { BidSource } from './enum/BidSource';
import { IAttributes } from '../../../types/adwords';

interface ICpaBid extends IBids, IAttributes<'CpaBid'> {
  bid: IMoney;
  readonly bidSource?: BidSource;
}

interface ICpcBid extends IBids, IAttributes<'CpcBid'> {
  bid: IMoney;
  readonly cpcBidSource?: BidSource;
}

interface ICpmBid extends IBids, IAttributes<'CpmBid'> {
  bid: IMoney;
  readonly cpmBidSource?: BidSource;
}

export { ICpaBid, ICpcBid, ICpmBid };
