import { useMutation, useQuery, useInfiniteQuery, UseMutationOptions, UseQueryOptions, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { fetchData } from '../fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  EmailAddress: any;
  JSON: any;
  JSONObject: any;
  PositiveFloat: any;
  PositiveInt: any;
  URL: any;
  UnsignedFloat: any;
  UnsignedInt: any;
  Upload: any;
};

/** Current Prisma Mapping: User (with role >= MARKETER). A user of the Niftory admin portal and APIs. */
export type AdminUser = Identifiable & UserData & {
  __typename?: 'AdminUser';
  /** The apps this user is an admin for. */
  apps?: Maybe<Array<Maybe<App>>>;
  /** This user's email. */
  email?: Maybe<Scalars['EmailAddress']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The URL for this user's image. */
  image?: Maybe<Scalars['String']>;
  /** The user's full name. */
  name?: Maybe<Scalars['String']>;
  /** The organizations this user belongs to. */
  organizations?: Maybe<Array<Maybe<Organization>>>;
};

/** An application in the Niftory ecosystem. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
export type App = Identifiable & {
  __typename?: 'App';
  /** The contract associated with this app. */
  contract?: Maybe<Contract>;
  /** The dapper merchant account for this app */
  dapperMerchantAccountAddress?: Maybe<Scalars['String']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The keys for this app. */
  keys?: Maybe<Keys>;
  /** The name for this app. */
  name?: Maybe<Scalars['String']>;
};

export type AppCreateInput = {
  /** A user to add to the organization. Required if using backend credentials. */
  adminUserEmail?: InputMaybe<Scalars['EmailAddress']>;
  /** The blockchain in which this app is deployed. */
  blockchain?: InputMaybe<Blockchain>;
  dapperMerchantAccountAddress?: InputMaybe<Scalars['String']>;
  /** Name of the app */
  name?: InputMaybe<Scalars['String']>;
  /** The id of the organization to create app in */
  organizationId?: InputMaybe<Scalars['String']>;
  /** The URIs to redirect to after signin. Only required if using oauth */
  redirectUris?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** Represents a user of a particular Niftory [App]({{Types.App}}). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
export type AppUser = HasTimes & Identifiable & UserData & {
  __typename?: 'AppUser';
  /** The app this user is scoped to. */
  app?: Maybe<App>;
  /** Creation date of this item */
  createdAt: Scalars['DateTime'];
  /** This user's email. */
  email?: Maybe<Scalars['EmailAddress']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The URL for this user's image. */
  image?: Maybe<Scalars['String']>;
  /** The user's full name. */
  name?: Maybe<Scalars['String']>;
  /** The primary wallet used by this user. */
  primaryWallet?: Maybe<Wallet>;
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /**
   * The wallet owned by this user.
   * @deprecated Use primaryWallet or wallets instead.
   */
  wallet?: Maybe<Wallet>;
  /** All wallets owned by this user. */
  wallets?: Maybe<Array<Maybe<Wallet>>>;
};

/** Represents a list of [AppUser]({{Types.AppUser}})s of a particular Niftory [App]({{Types.App}}). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
export type AppUserList = Pageable & {
  __typename?: 'AppUserList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
  /** The AppUsers in this list. */
  items?: Maybe<Array<Maybe<AppUser>>>;
};

/** An interface representing objects that have attributes property for non-blockchain property storage. */
export type Attributable = {
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']>;
};

/** The blockchains supported by Niftory. */
export enum Blockchain {
  /** The Ethereum blockchain. https://ethereum.org/en/ */
  Ethereum = 'ETHEREUM',
  /** The Flow blockchain. https://www.onflow.org/ */
  Flow = 'FLOW',
  /** The Polygon blockchain. https://polygon.technology/ */
  Polygon = 'POLYGON'
}

/** An interface representing properties common to all objects that exist on the blockchain */
export type BlockchainEntity = {
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']>;
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSONObject']>;
};

/** An interface representing properties common to all objects that exist on the blockchain */
export type BlockchainResource = {
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']>;
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']>;
  /** Creation date of this item */
  createdAt: Scalars['DateTime'];
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSONObject']>;
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Transaction performed on a blockchain. */
export type BlockchainTransaction = {
  __typename?: 'BlockchainTransaction';
  /** The blockchain where the transaction was perfomed. */
  blockchain: Blockchain;
  /** The hash of the blockchain transaction. */
  hash: Scalars['String'];
  /** The database ID of the transaction. */
  id: Scalars['ID'];
  /** Name of the transaction performed */
  name?: Maybe<Scalars['String']>;
  /** The output of the transaction. */
  result?: Maybe<Scalars['JSON']>;
  /** The state of the transaction. */
  state?: Maybe<BlockchainTransactionState>;
};

/** The response from initiating a checkout with Dapper Wallet. */
export type CheckoutWithDapperWalletResponse = {
  __typename?: 'CheckoutWithDapperWalletResponse';
  /** The brand for the transaction. */
  brand?: Maybe<Scalars['String']>;
  /** The cadence code for the transaction. */
  cadence?: Maybe<Scalars['String']>;
  /** A time when this listing will expire. */
  expiry?: Maybe<Scalars['String']>;
  /** The address of the merchant account that will receive the payment. */
  merchantAccountAddress?: Maybe<Scalars['String']>;
  /** The database ID representing the NFT. To be used for [completeCheckoutWithDapperWallet]({{Mutations.completeCheckoutWithDapperWallet}}) */
  nftDatabaseId?: Maybe<Scalars['String']>;
  /** The NFT blockchain hash if the NFT has already been minted. */
  nftId?: Maybe<Scalars['String']>;
  /** A reference to the cadence NFT type to be used in the transaction. */
  nftTypeRef?: Maybe<Scalars['String']>;
  /** The price to sell the NFT at. */
  price?: Maybe<Scalars['String']>;
  /** The registry address for the transaction. */
  registryAddress?: Maybe<Scalars['String']>;
  /** The set ID from which to send an NFT. */
  setId?: Maybe<Scalars['String']>;
  /** The address of the signer that must authorize this transaction. */
  signerAddress?: Maybe<Scalars['String']>;
  /** The key ID of the signer that must authorize this transaction */
  signerKeyId?: Maybe<Scalars['Int']>;
  /** The template ID from which to send an NFT. */
  templateId?: Maybe<Scalars['String']>;
};

/** Properties common to all smart contracts. */
export type Contract = {
  /** The address at which this contract is deployed. */
  address?: Maybe<Scalars['String']>;
  /** The blockchain in which this contract is deployed. */
  blockchain?: Maybe<Blockchain>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The name of this contract. */
  name?: Maybe<Scalars['String']>;
  /** The state of this contract. */
  state?: Maybe<ContractState>;
};

/** The state of a contract on the blockchain */
export enum ContractState {
  /** The contract has been created but deployment hasn't started yet. */
  Created = 'CREATED',
  /** The contract is being deployed. */
  Deploying = 'DEPLOYING',
  /** The contract has been deployed. */
  Ready = 'READY'
}

export type CreateFileOptionsInput = {
  /** The Content-Type (MIME type) of the file to be uploaded. This must match the Content-Type header you will use to upload the file to the returned URL. If this is left empty, your Content-Type header must also be empty. */
  contentType?: InputMaybe<Scalars['String']>;
  /** Required if the file to be uploaded is a video, and uploadToIPFS=true. In that case a poster must have already been uploaded (so it can be used as the image on IPFS). */
  posterFileId?: InputMaybe<Scalars['ID']>;
  /** Whether to asynchronously trigger an IPFS upload after the file has been uploaded to the returned cloud storage URL. */
  uploadToIPFS?: InputMaybe<Scalars['Boolean']>;
};

/** The input to create an [NFTListing]({{Types.NFTListing}}). */
export type CreateNftListingInput = {
  /** The metadata for this listing in JSON format */
  attributes?: InputMaybe<Scalars['JSONObject']>;
  /** The description of the listing */
  description?: InputMaybe<Scalars['String']>;
  /** The ID of the NFT models to list for sale in this NFT listing. */
  nftModelId: Scalars['ID'];
  /** The price of the NFTlisting. Must be greater than 0. */
  price: Scalars['PositiveFloat'];
  /** The title of the listing */
  title?: InputMaybe<Scalars['String']>;
};

/** The input to create a custodial Niftory [Wallet]({{Types.Wallet}}). */
export type CreateNiftoryWalletInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']>;
};

/** A currency that can be accepted for payment. */
export enum Currency {
  /** The dapper utility token */
  Duc = 'DUC',
  /** The flow token */
  Flow = 'FLOW',
  /** The flow utility token */
  Fut = 'FUT',
  /** The United States dollar. */
  Usd = 'USD'
}

/** A transaction used for Dapper wallet. */
export type DapperTransaction = {
  __typename?: 'DapperTransaction';
  /** The metadata script for the transaction. */
  metadataScript?: Maybe<Scalars['String']>;
  /** The transaction code. */
  transaction?: Maybe<Scalars['String']>;
};

/** A smart contract on an EVM blockchain. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/contract). */
export type EvmContract = Contract & Identifiable & {
  __typename?: 'EvmContract';
  /** The address at which this contract is deployed. */
  address?: Maybe<Scalars['String']>;
  /** The blockchain in which this contract is deployed. */
  blockchain?: Maybe<Blockchain>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The name of this contract. */
  name?: Maybe<Scalars['String']>;
  /** The state of this contract. */
  state?: Maybe<ContractState>;
};

/** An interface containing common data about files. */
export type File = {
  /** The MIME content type for this file. */
  contentType?: Maybe<Scalars['String']>;
  /** A unique identifier for this file in the Niftory API. */
  id: Scalars['ID'];
  /** The MD5 hash of this file. */
  md5?: Maybe<Scalars['String']>;
  /** A friendly name for the file. */
  name: Scalars['String'];
  /** The upload state of the file. */
  state: FileState;
  /** The cloud storage URL for this file. If state is GENERATED_UPLOAD_URL, then this url is the presigned URL to upload to. */
  url: Scalars['URL'];
};

/** The upload state of a File. */
export enum FileState {
  /** The file failed to ready. */
  Error = 'ERROR',
  /** Niftory has created a pre-signed URL where the file can be uploaded. */
  GeneratedUploadUrl = 'GENERATED_UPLOAD_URL',
  /** Niftory has created a file entry in the database table. */
  Pending = 'PENDING',
  /** The file is ready for use. */
  Ready = 'READY',
  /** The file has been uploaded to a cloud storage for fast retrieval. */
  UploadedToCloudStorage = 'UPLOADED_TO_CLOUD_STORAGE',
  /** The file (and potentially its corresponding metadata) have been uploaded to IPFS. */
  UploadedToIpfs = 'UPLOADED_TO_IPFS'
}

/** A simple pricing strategy for listings with fixed prices. */
export type FixedPricing = {
  __typename?: 'FixedPricing';
  /** The currency at which this price is set. */
  currency: Currency;
  /** The price in the specified currency at which this item is for sale. */
  price: Scalars['PositiveFloat'];
};

/** A simple pricing strategy for listings with fixed prices. */
export type FixedPricingInput = {
  /** The currency at which this price is set. */
  currency: Currency;
  /** The price in the specified currency at which this item is for sale. */
  price: Scalars['PositiveFloat'];
};

/** A smart contract on the Polygon blockchain. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/contract). */
export type FlowContract = Contract & Identifiable & {
  __typename?: 'FlowContract';
  /** The address at which this contract is deployed. */
  address?: Maybe<Scalars['String']>;
  /** The blockchain in which this contract is deployed. */
  blockchain?: Maybe<Blockchain>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The name of this contract. */
  name?: Maybe<Scalars['String']>;
  /** Storage paths for this contract. */
  paths?: Maybe<FlowContractPaths>;
  /** The state of this contract. */
  state?: Maybe<ContractState>;
  /** Transactions that need to be given to Dapper Wallet for use with their platform. */
  transactions?: Maybe<FlowContractTransactions>;
};

/** Paths used by Flow contracts for storage. */
export type FlowContractPaths = {
  __typename?: 'FlowContractPaths';
  /** The Collection Public Path for the contract. */
  collectionPublicPath?: Maybe<Scalars['String']>;
  /** The Collection Storage Path for the contract. */
  collectionStoragePath?: Maybe<Scalars['String']>;
};

/** Transactions used by a Flow contract. */
export type FlowContractTransactions = {
  __typename?: 'FlowContractTransactions';
  /** A transaction that cancels any Marketplace Listing */
  cancelMarketplaceListing?: Maybe<Scalars['String']>;
  /** A transaction that creates a listing of an NFT on the Marketplace with Dapper wallet */
  createMarketplaceListing?: Maybe<MultiCurrencyTransaction>;
  /** A transaction that creates a listing of an NFT on the Marketplace with Dapper wallet */
  purchaseMarketplaceListing?: Maybe<MultiCurrencyDapperTransaction>;
  /** A transaction that purchases an NFT with Dapper wallet with USD. */
  purchaseWithUsd?: Maybe<DapperTransaction>;
  /** A transaction that sets up a wallet to receive NFTs for this contract. */
  setup?: Maybe<Scalars['String']>;
};

/** An interface representing objects with a creation and update time */
export type HasTimes = {
  /** Creation date of this item */
  createdAt: Scalars['DateTime'];
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** An interface representing objects with unique IDs */
export type Identifiable = {
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
};

/** The response from initiating a purchase checkout. */
export type InitiateCheckoutResponse = {
  __typename?: 'InitiateCheckoutResponse';
  /** The URL to redirect the user to. */
  redirectUrl?: Maybe<Scalars['URL']>;
  /** The status of the payment */
  status?: Maybe<Scalars['String']>;
  /** A message to display to the user which contains checkout information */
  statusMessage?: Maybe<Scalars['String']>;
};

/** A purchase invoice for an NFT. The invoice is created when an NFT is reserved using reserve, and updated when a payment is initiated with checkout */
export type Invoice = HasTimes & Identifiable & {
  __typename?: 'Invoice';
  /** Creation date of this item */
  createdAt: Scalars['DateTime'];
  /** The ID of the Niftory invoice for an NFT purchase */
  id: Scalars['ID'];
  /** The listing associated with this invoice */
  listingId?: Maybe<Scalars['String']>;
  /** The state of this invoice */
  state?: Maybe<InvoiceState>;
  /** The total spent in USD in this invoice */
  total?: Maybe<Scalars['PositiveFloat']>;
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** The user id associated with this invoice */
  userId?: Maybe<Scalars['String']>;
};

/** A list of completed invoices for this app */
export type InvoiceList = Pageable & {
  __typename?: 'InvoiceList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
  /** The invoices in this list. */
  items?: Maybe<Array<Maybe<Invoice>>>;
};

/** The state of an invoice. */
export enum InvoiceState {
  /** This invoice is completed. */
  Completed = 'COMPLETED',
  /** This invoice was created and ready for payment. */
  Created = 'CREATED',
  /** An error was encountered while performing this payment. */
  Error = 'ERROR',
  /** This invoice is pending payment. */
  Pending = 'PENDING'
}

/** The keys for an application in the Niftory platform */
export type Keys = {
  __typename?: 'Keys';
  /** The public API key. */
  apiKey?: Maybe<Scalars['String']>;
  /** The public Client ID. */
  clientId?: Maybe<Scalars['String']>;
  /** The public Client Secret. */
  clientSecret?: Maybe<Scalars['String']>;
};

/** The state of a listing. */
export enum ListingState {
  /**
   * The listing is active and available for sale.
   * @deprecated Use SHOW_IN_STORE instead
   */
  Active = 'ACTIVE',
  /** The listing is inactive, so it's not open for sale. */
  HideFromStore = 'HIDE_FROM_STORE',
  /**
   * The listing is inactive, so it's not open for sale.
   * @deprecated Use HIDE_FROM_STORE instead
   */
  Inactive = 'INACTIVE',
  /** All NFTs in this listing have been sold. */
  NotAvailaibleForPurchase = 'NOT_AVAILAIBLE_FOR_PURCHASE',
  /** The listing is active and available for sale. */
  ShowInStore = 'SHOW_IN_STORE',
  /**
   * All NFTs in this listing have been sold.
   * @deprecated Use NOT_AVAILAIBLE_FOR_PURCHASE instead
   */
  Sold = 'SOLD'
}

/** Listing of NFTs in marketplace */
export type MarketplaceListing = Identifiable & {
  __typename?: 'MarketplaceListing';
  /** The appId of the app this MarketplaceListing belongs to. */
  appId: Scalars['ID'];
  /** The blockchain resource ID of the marketplace */
  blockchainId?: Maybe<Scalars['String']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The NFT belonging to this listing. */
  nft: Nft;
  /** The price in the specified currency at which this item is for sale. */
  pricing: FixedPricing;
  /** The state of the marketplace listing */
  state: MarketplaceListingState;
  /** The transactions ids belonging to this marketplace listing */
  transactionIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The user to which the listing belongs to */
  user?: Maybe<AppUser>;
  /** The Wallet where the NFT belongs to */
  wallet?: Maybe<Wallet>;
};

/** Properties to filter [MarketplaceListing]({{Types.MarketplaceListing}})s when querying them. */
export type MarketplaceListingFilterInput = {
  /** Database IDs of the [MarketplaceListing]({{Types.MarketplaceListing}})s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** The IDs of the [NFTModel]({{Types.NFTModel}}) to filter by  */
  nftModelIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** The IDs of the [AppUser]({{Types.AppUser}}) to filter by */
  userIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** The IDs of the [Wallets]({{Types.Wallets}}) to filter by */
  walletIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
};

/** A list of MarketplaceListings. */
export type MarketplaceListingList = Pageable & {
  __typename?: 'MarketplaceListingList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
  /** The MarketplaceListings in this list. */
  items?: Maybe<Array<Maybe<MarketplaceListing>>>;
};

/** The state of an Marketplace listing */
export enum MarketplaceListingState {
  /** The marketplace listing is available for purchase */
  Available = 'AVAILABLE',
  /** The marketplace listing is cancelled */
  Cancelled = 'CANCELLED',
  /** The marketplace listing has expired */
  Expired = 'EXPIRED',
  /** The marketplace listing has already been purchased */
  Purchased = 'PURCHASED'
}

/** Dapper transactions with multiple currencies. */
export type MultiCurrencyDapperTransaction = {
  __typename?: 'MultiCurrencyDapperTransaction';
  /** Dapper transaction using Flow Token */
  flow?: Maybe<DapperTransaction>;
  /** Dapper transaction using US Dollar */
  usd?: Maybe<DapperTransaction>;
};

/** Transactions with multiple currencies. */
export type MultiCurrencyTransaction = {
  __typename?: 'MultiCurrencyTransaction';
  /** Transaction using the Flow Token */
  flow?: Maybe<Scalars['String']>;
  /** Transaction using the US Dollar */
  usd?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Initiates checkout for a reserved NFT. */
  checkout?: Maybe<InitiateCheckoutResponse>;
  /** Initiates checkout with Dapper Wallet of specified [NFTModel]({{Types.NFTModel}})s, and returns a signed transaction to complete checkout with. Flow blockchain only. */
  checkoutWithDapperWallet?: Maybe<CheckoutWithDapperWalletResponse>;
  /** Marks the checkout with Dapper Wallet as complete, and updates the [NFT]({{Types.NFT}}) as belonging to specified wallet. Called after [checkoutWithDapperWallet]({{Mutations.checkoutWithDapperWallet}}) once purchase is completed. */
  completeCheckoutWithDapperWallet?: Maybe<Nft>;
  /** Completes a marketplace listing cancellation */
  completeMarketplaceCancel?: Maybe<MarketplaceListing>;
  /** Completes a marketplace listing creation */
  completeMarketplaceList?: Maybe<MarketplaceListing>;
  /** Completes a marketplace listing purchase */
  completeMarketplacePurchase?: Maybe<MarketplaceListing>;
  /** Creates the [App]({{Types.App}}) on the specified organization for the user. */
  createApp?: Maybe<App>;
  /** Generates a pre-signed URL that can then be used to upload a file. Once the file has been uploaded to the URL, it will automatically be uploaded to IPFS (if desired). Use the returned [File]({{Types.SimpleFile}}).state to track the upload. */
  createFileUploadUrl?: Maybe<File>;
  /** Creates a new [NFTListing]({{Types.NFTListing}}). */
  createNFTListing?: Maybe<NftListing>;
  /** Creates a new [NFTModel]({{Types.NFTModel}}). */
  createNFTModel?: Maybe<NftModel>;
  /** Creates a new [NFTSet]({{Types.NFTSet}}). */
  createNFTSet?: Maybe<NftSet>;
  /** Provisions a custodial Niftory [Wallet]({{Types.Wallet}}) and, if specified, associates it with the given [AppUser]({{Types.AppUser}}). Note: The call fails if the user already has a wallet. */
  createNiftoryWallet?: Maybe<Wallet>;
  createOrganization: Organization;
  /** Deletes the specified file from cloud storage (but not IPFS). */
  deleteFile?: Maybe<File>;
  /** Deletes an existing [NFTListing]({{Types.NFTListing}}). */
  deleteNFTListing?: Maybe<NftListing>;
  /** Deletes an existing [NFTModel]({{Types.NFTModel}}). This operation will only be perfomed if no NFTs have been minted from this NFTModel */
  deleteNFTModel?: Maybe<NftModel>;
  /** Deletes an existing [NFTSet]({{Types.NFTSet}}). This operation will only be perfomed if no NFTs have been minted from this NFTSet */
  deleteNFTSet?: Maybe<NftSet>;
  /** Deploys the [Contract]({{Types.Contract}}) from the currently authenticated app. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/contract). */
  deployContract?: Maybe<Contract>;
  /** Executes a transaction for a Niftory wallet. */
  executeTransaction?: Maybe<BlockchainTransaction>;
  /** Initiates minting for a given [NFTModel]({{Types.NFTmodel}}). */
  mintNFTModel?: Maybe<NftModel>;
  /** Marks a [Wallet]({{Types.Wallet}}) as ready, indicating that the wallet is ready to receive [NFT]({{Types.NFT}})s from the app's [Contract]({{Types.Contract}}). The wallet must be verified before this succeeds. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/set-up-wallets). */
  readyWallet?: Maybe<Wallet>;
  /** Registers a [Wallet]({{Types.Wallet}}), associating it with the currently signed-in [AppUser]({{Types.AppUser}}) if specified. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/set-up-wallets). */
  registerWallet?: Maybe<Wallet>;
  /** Reserves an [NFT]({{Types.NFT}}) for an [AppUser]({{Types.AppUser}}) and returns an [Invoice]({{Types.Invoice}}) for purchase. */
  reserve?: Maybe<Invoice>;
  /** Sets the primary [Wallet]({{Types.Wallet}}) for the currently signed in user. */
  setPrimaryWallet?: Maybe<Wallet>;
  /** Signs a transaction for a Niftory wallet. */
  signTransaction?: Maybe<Scalars['String']>;
  /** Signs a transaction for Dapper Wallet. */
  signTransactionForDapperWallet?: Maybe<Scalars['String']>;
  /** Initiates the transfer of an [NFT]({{Types.NFT}}) to the currently-logged in [AppUser]({{Types.AppUser}}). The NFT is reserved for the user in database, and you can use the NFT.status field to check on the transfer progress. */
  transfer?: Maybe<Nft>;
  /** Unlinks the specified [Wallet]({{Types.Wallet}}) from the currently signed in user. */
  unlinkWallet?: Maybe<Wallet>;
  /** Updates an existing [NFTListing]({{Types.NFTListing}}). */
  updateNFTListing?: Maybe<NftListing>;
  /** Updates an existing [NFTModel]({{Types.NFTModel}}). Note that if this NFTModel has already been used to mint an NFT, the update operation will fail for any properties that affect the blockchain (such as 'quantity', 'title', 'metadata', etc.), whereas updating 'attributes' will succeed. */
  updateNFTModel?: Maybe<NftModel>;
  /** Updates an existing [NFTSet]({{Types.NFTSet}}). */
  updateNFTSet?: Maybe<NftSet>;
  /** Update a [Wallet]({{Types.Wallet}}) of the currently signed-in user. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/set-up-wallets). */
  updateWallet?: Maybe<Wallet>;
  /** Creates an [NFTContent]({{Types.NFTContent}}) object containing pre-signed URLs that can then be used to upload a file and poster. The primary file will automatically be uploaded to IPFS once it's been uploaded to the pre-signed URL. Each returned [File]({{Types.SimpleFile}}) has a 'state' property to track the upload. */
  uploadNFTContent?: Maybe<NftContent>;
  /** Verifies a [Wallet]({{Types.Wallet}}) to the currently signed-in user. If the signed verification code fails to decode with the wallet's public key or doesn't match the wallet's verification code, the request will fail. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/set-up-wallets). */
  verifyWallet?: Maybe<Wallet>;
  /** Initiates the withdrawal of an [NFT]({{Types.NFT}}) from a custodial Niftory [Wallet]{{Types.Wallet}} to a receiver [Wallet]({{Types.Wallet}}) address */
  withdraw?: Maybe<Nft>;
};


export type MutationCheckoutArgs = {
  invoiceId: Scalars['String'];
  onError: Scalars['String'];
  onSuccess: Scalars['String'];
};


export type MutationCheckoutWithDapperWalletArgs = {
  address?: InputMaybe<Scalars['String']>;
  expiry?: InputMaybe<Scalars['UnsignedInt']>;
  nftModelId: Scalars['ID'];
  price?: InputMaybe<Scalars['UnsignedFloat']>;
  userId?: InputMaybe<Scalars['ID']>;
  walletId?: InputMaybe<Scalars['ID']>;
};


export type MutationCompleteCheckoutWithDapperWalletArgs = {
  nftDatabaseId?: InputMaybe<Scalars['String']>;
  transactionId: Scalars['String'];
};


export type MutationCompleteMarketplaceCancelArgs = {
  id: Scalars['ID'];
  transactionId: Scalars['String'];
};


export type MutationCompleteMarketplaceListArgs = {
  nftId: Scalars['ID'];
  transactionId: Scalars['String'];
};


export type MutationCompleteMarketplacePurchaseArgs = {
  id: Scalars['ID'];
  transactionId: Scalars['String'];
};


export type MutationCreateAppArgs = {
  data: AppCreateInput;
};


export type MutationCreateFileUploadUrlArgs = {
  appId?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  options?: InputMaybe<CreateFileOptionsInput>;
};


export type MutationCreateNftListingArgs = {
  data: CreateNftListingInput;
};


export type MutationCreateNftModelArgs = {
  appId?: InputMaybe<Scalars['ID']>;
  data: NftModelCreateInput;
  setId: Scalars['ID'];
};


export type MutationCreateNftSetArgs = {
  appId?: InputMaybe<Scalars['ID']>;
  data: NftSetCreateInput;
};


export type MutationCreateNiftoryWalletArgs = {
  appId?: InputMaybe<Scalars['ID']>;
  data?: InputMaybe<CreateNiftoryWalletInput>;
  userId?: InputMaybe<Scalars['ID']>;
};


export type MutationCreateOrganizationArgs = {
  data: OrganizationCreateInput;
};


export type MutationDeleteFileArgs = {
  id?: InputMaybe<Scalars['ID']>;
  url?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteNftListingArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteNftModelArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteNftSetArgs = {
  id: Scalars['ID'];
};


export type MutationDeployContractArgs = {
  appId: Scalars['String'];
  blockchain: Blockchain;
  name: Scalars['String'];
};


export type MutationExecuteTransactionArgs = {
  address?: InputMaybe<Scalars['String']>;
  appId?: InputMaybe<Scalars['ID']>;
  args?: InputMaybe<Scalars['JSONObject']>;
  name?: InputMaybe<Scalars['String']>;
  transaction: Scalars['String'];
  userId?: InputMaybe<Scalars['ID']>;
  walletId?: InputMaybe<Scalars['ID']>;
};


export type MutationMintNftModelArgs = {
  appId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  quantity?: InputMaybe<Scalars['PositiveInt']>;
};


export type MutationReadyWalletArgs = {
  address: Scalars['String'];
};


export type MutationRegisterWalletArgs = {
  address: Scalars['String'];
  data?: InputMaybe<RegisterWalletInput>;
};


export type MutationReserveArgs = {
  listingId: Scalars['ID'];
};


export type MutationSetPrimaryWalletArgs = {
  address?: InputMaybe<Scalars['String']>;
  walletId?: InputMaybe<Scalars['String']>;
};


export type MutationSignTransactionArgs = {
  address?: InputMaybe<Scalars['String']>;
  appId?: InputMaybe<Scalars['ID']>;
  transaction: Scalars['String'];
  userId?: InputMaybe<Scalars['ID']>;
  walletId?: InputMaybe<Scalars['ID']>;
};


export type MutationSignTransactionForDapperWalletArgs = {
  transaction?: InputMaybe<Scalars['String']>;
};


export type MutationTransferArgs = {
  address?: InputMaybe<Scalars['String']>;
  appId?: InputMaybe<Scalars['ID']>;
  force?: InputMaybe<Scalars['Boolean']>;
  id?: InputMaybe<Scalars['ID']>;
  nftModelId?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['ID']>;
  walletId?: InputMaybe<Scalars['ID']>;
};


export type MutationUnlinkWalletArgs = {
  address?: InputMaybe<Scalars['String']>;
  walletId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateNftListingArgs = {
  data: UpdateNftListingInput;
  id: Scalars['ID'];
};


export type MutationUpdateNftModelArgs = {
  data: NftModelUpdateInput;
  id: Scalars['ID'];
};


export type MutationUpdateNftSetArgs = {
  data: NftSetUpdateInput;
  id: Scalars['ID'];
};


export type MutationUpdateWalletArgs = {
  address: Scalars['String'];
  data?: InputMaybe<UpdateWalletInput>;
};


export type MutationUploadNftContentArgs = {
  contentType?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  posterContentType?: InputMaybe<Scalars['String']>;
};


export type MutationVerifyWalletArgs = {
  address: Scalars['String'];
  signedVerificationCode: Scalars['JSON'];
};


export type MutationWithdrawArgs = {
  appId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  niftoryWalletAddress?: InputMaybe<Scalars['String']>;
  receiverAddress: Scalars['String'];
};

/** Respresentation of a [non-fungible token](https://en.wikipedia.org/wiki/Non-fungible_token) in the Niftory ecosystem (it doesn't have to be minted on the blockchain yet). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts). */
export type Nft = BlockchainEntity & Identifiable & SellableEntity & {
  __typename?: 'NFT';
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']>;
  /** The state of this NFT on the blockchain */
  blockchainState: NftBlockchainState;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The marketplace listings where this NFT belongs to */
  marketplaceListings?: Maybe<Array<Maybe<MarketplaceListing>>>;
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSONObject']>;
  /** The NFTModel from which this NFT was created. */
  model?: Maybe<NftModel>;
  /** The ID of the NFTModel from which this NFT was created */
  modelId?: Maybe<Scalars['ID']>;
  /** This state of this object's sale. */
  saleState?: Maybe<SaleState>;
  /** The serial number for this NFT within its model. */
  serialNumber?: Maybe<Scalars['Int']>;
  /**
   * The status of this NFT (e.g. if it is available or being transferred to a user
   * @deprecated Use blockchainState or saleState instead.
   */
  status?: Maybe<TransferState>;
  /** Blockchain transcations for this NFT */
  transactions?: Maybe<Array<Maybe<BlockchainTransaction>>>;
  /** The wallet containing this NFT, if it is owned by a user. */
  wallet?: Maybe<Wallet>;
};

/** The state of an NFT on the blockchain. */
export enum NftBlockchainState {
  /** An error occurred with this item's last blockchain operation. */
  Error = 'ERROR',
  /** The item is minted, and are no pending operations on it. */
  Minted = 'MINTED',
  /** The item is being minted. */
  Minting = 'MINTING',
  /** The item has already been transferred to a user's wallet. */
  Transferred = 'TRANSFERRED',
  /** The item is being transferred. */
  Transferring = 'TRANSFERRING',
  /** The item hasn't been minted yet. */
  Unminted = 'UNMINTED'
}

/** The content for an NFT. */
export type NftContent = Identifiable & {
  __typename?: 'NFTContent';
  /** The file content in this NFT. */
  files?: Maybe<Array<Maybe<NftFile>>>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The poster file for this NFT's content */
  poster?: Maybe<SimpleFile>;
};

/** The input to create or update [NFTContent]({{Types.NFTContent}}). */
export type NftContentInput = {
  /** The ID of the [NFTFile]({{Types.NFTFile}}) content. This can be created using [createFileUploadUrl]({{Mutations.createFileUploadUrl}}). */
  fileId: Scalars['ID'];
  /** The ID of the poster [File]({{Types.File}}). This can be created using [createFileUploadUrl]({{Mutations.createFileUploadUrl}}). */
  posterId?: InputMaybe<Scalars['ID']>;
};

/** File (with ipfsContentUrl and ipfsMetadataUrl). A file to be included in an NFT. Extends [File]({{Types.File}}) to includes the IPFS addresses for the content and metadata. */
export type NftFile = File & {
  __typename?: 'NFTFile';
  /** The MIME content type for this file. */
  contentType?: Maybe<Scalars['String']>;
  /** A unique identifier for this file in the Niftory API. */
  id: Scalars['ID'];
  /** The IPFS address for the content of this file. */
  ipfsContentAddress: Scalars['String'];
  /** The IPFS address for the metadata of this file. */
  ipfsMetadataAddress: Scalars['String'];
  /** The MD5 hash of this file. */
  md5?: Maybe<Scalars['String']>;
  /** A friendly name for the file. */
  name: Scalars['String'];
  /** The upload state of the file. */
  state: FileState;
  /** The cloud storage URL for this file. If state is GENERATED_UPLOAD_URL, then this url is the presigned URL to upload to. */
  url: Scalars['URL'];
};

/** Properties to filter [NFT]({{Types.NFT}})s by when querying them. */
export type NftFilterInput = {
  /** Blockchain IDs of the [NFT]({{Types.NFT}})s to find. */
  blockchainIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Blockchain states of the [NFT]({{Types.NFT}})s to find. Defaults to all. */
  blockchainStates?: InputMaybe<Array<InputMaybe<NftBlockchainState>>>;
  /** Database IDs of the [NFT]({{Types.NFT}})s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** The IDs of the [NFTModel]({{Types.NFTModel}}) that the [NFT]({{Types.NFT}}) should belong to. */
  nftModelIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Sale states of the [NFT]({{Types.NFT}})s to find. When querying within a user context, defaults to [PAID, FULFILLED]. Otherwise, defaults to all. */
  saleStates?: InputMaybe<Array<InputMaybe<SaleState>>>;
  /** Transfer states of the [NFT]({{Types.NFT}})s to find. Defaults to all. */
  transferStates?: InputMaybe<Array<InputMaybe<TransferState>>>;
};

/** A list of NFTs. */
export type NftList = Pageable & {
  __typename?: 'NFTList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
  /** The NFTs in this list. */
  items?: Maybe<Array<Maybe<Nft>>>;
};

/** A listing of NFTs for sale. */
export type NftListing = Attributable & HasTimes & Identifiable & {
  __typename?: 'NFTListing';
  /** The appId of the app this NFTListing belongs to. */
  appId: Scalars['ID'];
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']>;
  /** Creation date of this item */
  createdAt: Scalars['DateTime'];
  /** The description of the listing. */
  description?: Maybe<Scalars['String']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The NFT Model for this listing, NFTs from this model will be sold when a user checks out with this listing */
  nftModel: NftModel;
  /** The pricing for this listing */
  pricing: FixedPricing;
  /** The state of this listing. */
  state: ListingState;
  /** The title of the listing. */
  title?: Maybe<Scalars['String']>;
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type NftListingFilterInput = {
  /** The IDs of the NFTListing. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** The ID of the NFTModel that the NFTListing should belong to. */
  state?: InputMaybe<ListingState>;
  /** The title of the NFTListing. */
  title?: InputMaybe<Scalars['String']>;
};

/** A list of NFTListings. */
export type NftListingList = Pageable & {
  __typename?: 'NFTListingList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
  /** The NFTListings in this list. */
  items?: Maybe<Array<Maybe<NftListing>>>;
};

/** The blueprint for an NFT, containing everything needed to mint one -- file content, blockchain metadata, etc. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts). */
export type NftModel = Attributable & BlockchainEntity & BlockchainResource & HasTimes & Identifiable & Resource & {
  __typename?: 'NFTModel';
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']>;
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']>;
  /** This NFT model's content. */
  content?: Maybe<NftContent>;
  /** Creation date of this item */
  createdAt: Scalars['DateTime'];
  /** The user-friendly description for this model. */
  description: Scalars['String'];
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The marketplace listings created with nfts from this model */
  marketplaceListings?: Maybe<Array<Maybe<MarketplaceListing>>>;
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSONObject']>;
  /** The listings for this model. These can be used to sell the NFTs creating using this model */
  nftListings?: Maybe<Array<Maybe<NftListing>>>;
  /** The NFTs created using this model. */
  nfts?: Maybe<Array<Maybe<Nft>>>;
  /** The total quantity of NFTs that will be available for this model. */
  quantity?: Maybe<Scalars['PositiveInt']>;
  /** The total quantity of NFTs that have been minted from this model. */
  quantityMinted?: Maybe<Scalars['UnsignedInt']>;
  /** The rarity of the NFTs in this model. */
  rarity?: Maybe<SimpleRarityLevel>;
  /** The NFT model set containing this model. */
  set: NftSet;
  /** The state of this NFT Model on the blockchain */
  state: NftModelBlockchainState;
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** The user-friendly title for this model. */
  title: Scalars['String'];
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** The state of an NFT Model on the blockchain. */
export enum NftModelBlockchainState {
  /** All NFTs in this model have been transferred to users. */
  Completed = 'COMPLETED',
  /** An error occurred with this item's last blockchain operation. */
  Error = 'ERROR',
  /** The item is minted, and are no pending operations on it. */
  Minted = 'MINTED',
  /** The item is being minted. */
  Minting = 'MINTING',
  /** The item hasn't been minted yet. */
  Unminted = 'UNMINTED'
}

/** The input to create an [NFTModel]({{Types.NFTModel}}). */
export type NftModelCreateInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']>;
  /** The file content for this model. Either 'content' or 'contentId' must be specified. */
  content?: InputMaybe<NftContentInput>;
  /** The ID of the [NFTContent]({{Types.NFTContent}}) for this model. Either 'content' or 'contentId' must be specified. */
  contentId?: InputMaybe<Scalars['ID']>;
  /** The user-friendly details about this model. This will be added to the blockchain metadata when an NFT is minted. */
  description?: InputMaybe<Scalars['String']>;
  /** Metadata that will be added to the blockchain for any NFTs minted from this model. */
  metadata?: InputMaybe<Scalars['JSONObject']>;
  /** The total supply of NFTs that can be available for this model. This can be updated until the NFTModel is minted. */
  quantity?: InputMaybe<Scalars['PositiveInt']>;
  /** The status of the model. */
  status?: InputMaybe<Status>;
  /** The user-friendly subtitle for this model. This will be added to the blockchain metadata when an NFT is minted. */
  subtitle?: InputMaybe<Scalars['String']>;
  /** String labels to tag this [NFTModel]({{Types.NFTModel}}) with. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The user-friendly title for this model. This will be added to the blockchain metadata when an NFT is minted. */
  title: Scalars['String'];
};

/** Properties to filter [NFTModel]({{Types.NFTModel}})s when querying them. */
export type NftModelFilterInput = {
  /** Blockchain IDs of the [NFTModel]({{Types.NFTModel}})s to find. */
  blockchainIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Filter nft models that have active listings in the marketplace  */
  hasMarketplaceListing?: InputMaybe<Scalars['Boolean']>;
  /** Database IDs of the [NFTModel]({{Types.NFTModel}})s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** The IDs of the [NFTSet]({{Types.NFTSet}})s that the [NFTModel]({{Types.NFTModel}}) should belong to. */
  setIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Filter by [NFTModel]({{Types.NFTModel}}) status. */
  status?: InputMaybe<Status>;
  /** The tags in the [NFTModel]({{Types.NFTModel}}) to find. The models returned will contain every tag specified. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** A list of NFTModels. */
export type NftModelList = Pageable & {
  __typename?: 'NFTModelList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
  /** The NFTModels in this list. */
  items?: Maybe<Array<Maybe<NftModel>>>;
};

/** The input to update an NFT model. */
export type NftModelUpdateInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']>;
  /** The file content for this model. This can be updated until the NFTModel is minted. */
  content?: InputMaybe<NftContentInput>;
  /** The ID of the [NFTContent]({{Types.NFTContent}}) for this model. */
  contentId?: InputMaybe<Scalars['ID']>;
  /** The user-friendly details about this model. This will be added to the blockchain metadata when an NFT is minted. */
  description?: InputMaybe<Scalars['String']>;
  /** Metadata that will be added to the blockchain for any NFTs minted from this model. This can be updated until the NFTModel is minted */
  metadata?: InputMaybe<Scalars['JSONObject']>;
  /** The total supply of NFTs that can be available for this model. This can be updated until the NFTModel is minted. */
  quantity?: InputMaybe<Scalars['PositiveInt']>;
  /** The status of the model. */
  status?: InputMaybe<Status>;
  /** The user-friendly subtitle for this model. This will be added to the blockchain metadata when an NFT is minted. */
  subtitle?: InputMaybe<Scalars['String']>;
  /** String labels to tag this [NFTModel]({{Types.NFTModel}}) with. These will be stored in the Niftory API but will not be added to the blockchain. Updating this will replace the existing tags. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The user-friendly title for this model. This will be added to the blockchain metadata when an NFT is minted. */
  title?: InputMaybe<Scalars['String']>;
};

/** A set of NFTModels, to help you organize your NFTs. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts). */
export type NftSet = Attributable & BlockchainEntity & BlockchainResource & HasTimes & Identifiable & Resource & {
  __typename?: 'NFTSet';
  /** The app this set belongs to. */
  app?: Maybe<App>;
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']>;
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']>;
  /** Creation date of this item */
  createdAt: Scalars['DateTime'];
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The image to represent this set. */
  image?: Maybe<Scalars['URL']>;
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSONObject']>;
  /** Models contained in this set. */
  models?: Maybe<Array<Maybe<NftModel>>>;
  /** The state of this NFT Set on the blockchain */
  state: NftSetBlockchainState;
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** String labels to tag this NFTSet with. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The display image for this set. */
  title: Scalars['String'];
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** The state of an NFT Set on the blockchain. */
export enum NftSetBlockchainState {
  /** An error occurred with this item's last blockchain operation. */
  Error = 'ERROR',
  /** The item is minted, and are no pending operations on it. */
  Minted = 'MINTED',
  /** The item is being minted. */
  Minting = 'MINTING',
  /** The item hasn't been minted yet. */
  Unminted = 'UNMINTED'
}

/** The input to create an [NFTSet]({{Types.NFTSet}}). */
export type NftSetCreateInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']>;
  /** The list of ids of the uploaded metadata [File]({{Types.File}}s). This can be created using [createFileUploadUrl]({{Mutations.createFileUploadUrl}}). */
  fileIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Metadata that will be added to the blockchain */
  metadata?: InputMaybe<Scalars['JSONObject']>;
  /** String labels to tag this [NFTSet]({{Types.NFTSet}}) with. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The user-friendly title for this model. */
  title: Scalars['String'];
};

export type NftSetFilterInput = {
  /** Blockchain IDs of the [NFTSet]({{Types.NFTSet}})s to find. */
  blockchainIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Database IDs of the [NFTSet]({{Types.NFTSet}})s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** The search query for full text search */
  search?: InputMaybe<Scalars['String']>;
  /** The tags in the [NFTSet]({{Types.NFTSet}}) to find. The sets returned will contain every tag specified. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The title of the [NFTSet]({{Types.NFTSet}}) to find. */
  title?: InputMaybe<Scalars['String']>;
};

/** The input to update an [NFTSet]({{Types.NFTSet}}). */
export type NftSetUpdateInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']>;
  /** The list of ids of the uploaded metadata [File]({{Types.File}}s). This can be created using [createFileUploadUrl]({{Mutations.createFileUploadUrl}}). */
  fileIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Metadata that will be added to the blockchain */
  metadata?: InputMaybe<Scalars['JSONObject']>;
  /** String labels to tag this [NFTSet]({{Types.NFTSet}}) with. These will be stored in the Niftory API but will not be added to the blockchain. Updating this will replace the existing tags. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** The user-friendly title for this set. */
  title?: InputMaybe<Scalars['String']>;
};

/** An organization within the Niftory ecosystem. Organization manages [App]({{Types.App}})s. Read more [here](https://docs.niftory.com/home/v/admin/explore/org-and-apps). */
export type Organization = Identifiable & {
  __typename?: 'Organization';
  /** The apps belonging to this Organization. */
  apps?: Maybe<Array<Maybe<App>>>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** This organization's members. */
  members?: Maybe<Array<Maybe<AdminUser>>>;
  name?: Maybe<Scalars['String']>;
};

export type OrganizationCreateInput = {
  /** A user to add to the organization. Required if using backend credentials. */
  adminUserEmail?: InputMaybe<Scalars['EmailAddress']>;
  name: Scalars['String'];
};

/** An interface representing lists that can be paginated with a cursor. */
export type Pageable = {
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /** Gets the currently signed in [AdminUser]({{Types.AdminUser}}). */
  adminUser?: Maybe<AdminUser>;
  /** Gets the [App]({{Types.App}}) for the current application context. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
  app?: Maybe<App>;
  /** Gets an [App]({{Types.App}}) by its ID. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
  appById?: Maybe<App>;
  /** Gets the currently logged-in [AppUser]({{Types.AppUser}}) context. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
  appUser?: Maybe<AppUser>;
  /** Gets an [AppUser]({{Types.AppUser}}) by its ID. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
  appUserById?: Maybe<AppUser>;
  /** Gets the list of users for your app. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
  appUsers?: Maybe<AppUserList>;
  /** Gets a blockchain transaction. */
  blockchainTransaction?: Maybe<BlockchainTransaction>;
  /** Gets the [Contract]({{Types.Contract}}) from the currently authenticated app. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/contract). */
  contract?: Maybe<Contract>;
  /** Gets a [File]({{Types.File}}) by its ID. */
  file?: Maybe<File>;
  /** Gets the list of invoices for your app. */
  invoices?: Maybe<InvoiceList>;
  /** Gets a [MarketplaceListing]({{Types.MarketplaceListing}}) by ID. */
  marketplaceListing?: Maybe<MarketplaceListing>;
  /** Gets an [MarketplaceListing]({{Types.MarketplaceListing}}) by ID. */
  marketplaceListings?: Maybe<MarketplaceListingList>;
  /** Gets an [NFT]({{Types.NFT}}) by database ID. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts/querying-nfts). */
  nft?: Maybe<Nft>;
  /** Gets an [NFTListing]({{Types.NFTListing}}) by ID. */
  nftListing?: Maybe<NftListing>;
  /** Gets [NFTListing]({{Types.NFTListing}})s for the current [App]({{Types.App}}) context */
  nftListings?: Maybe<NftListingList>;
  /** Gets an [NFTModel]({{Types.NFTModel}}) by database ID. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts/querying-nfts). */
  nftModel?: Maybe<NftModel>;
  /** Gets [NFTModel]({{Types.NFTModel}})s for the current [App]({{Types.App}}) context. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts/querying-nfts). */
  nftModels?: Maybe<NftModelList>;
  /** Gets [NFT]({{Types.NFT}})s associated with the current [AppUser]({{Types.AppUser}}) context, including those that are transferring or failed to transfer. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts/querying-nfts). */
  nfts?: Maybe<NftList>;
  /** Gets [NFT]({{Types.NFT}})s associated with the current wallet, including those that are transferring or failed to transfer. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts/querying-nfts). */
  nftsByWallet?: Maybe<NftList>;
  /** Gets an [NFTSet]({{Types.NFTSet}}) by database ID. */
  set?: Maybe<NftSet>;
  /** Gets [NFTSet]({{Types.NFTSet}})s for the current [App]({{Types.App}}) context. */
  sets?: Maybe<Array<Maybe<NftSet>>>;
  /** Gets the primary [Wallet]({{Types.Wallet}}) belonging to the current [AppUser]({{Types.AppUser}}) context. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  wallet?: Maybe<Wallet>;
  /** Gets a [Wallet]({{Types.Wallet}}) by its blockchain address. Wallet must be registered using [registerWallet]({{Mutations.registerWallet}}) before this request succeeds. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  walletByAddress?: Maybe<Wallet>;
  /** Gets a [Wallet]({{Types.Wallet}}) by its database ID. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  walletById?: Maybe<Wallet>;
  /** Gets the primary [Wallet]({{Types.Wallet}}) for a given [AppUser]({{Types.AppUser}}). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  walletByUserId?: Maybe<Wallet>;
  /** Gets all [Wallet]({{Types.Wallet}})s for a given app. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  wallets?: Maybe<WalletList>;
};


export type QueryAppByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAppUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAppUsersArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  maxResults?: InputMaybe<Scalars['PositiveInt']>;
};


export type QueryBlockchainTransactionArgs = {
  hash?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};


export type QueryContractArgs = {
  appId?: InputMaybe<Scalars['ID']>;
};


export type QueryFileArgs = {
  id: Scalars['ID'];
};


export type QueryInvoicesArgs = {
  appId?: InputMaybe<Scalars['ID']>;
  cursor?: InputMaybe<Scalars['String']>;
  maxResults?: InputMaybe<Scalars['PositiveInt']>;
};


export type QueryMarketplaceListingArgs = {
  id?: InputMaybe<Scalars['ID']>;
  nftId?: InputMaybe<Scalars['ID']>;
};


export type QueryMarketplaceListingsArgs = {
  appId?: InputMaybe<Scalars['ID']>;
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<MarketplaceListingFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']>;
};


export type QueryNftArgs = {
  id: Scalars['ID'];
};


export type QueryNftListingArgs = {
  id: Scalars['ID'];
};


export type QueryNftListingsArgs = {
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<NftListingFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']>;
};


export type QueryNftModelArgs = {
  id: Scalars['ID'];
};


export type QueryNftModelsArgs = {
  appId?: InputMaybe<Scalars['ID']>;
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<NftModelFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']>;
};


export type QueryNftsArgs = {
  appId?: InputMaybe<Scalars['ID']>;
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<NftFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']>;
  userId?: InputMaybe<Scalars['ID']>;
};


export type QueryNftsByWalletArgs = {
  address?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['String']>;
  filter?: InputMaybe<NftFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']>;
  walletId?: InputMaybe<Scalars['ID']>;
};


export type QuerySetArgs = {
  id: Scalars['ID'];
};


export type QuerySetsArgs = {
  appId?: InputMaybe<Scalars['ID']>;
  filter?: InputMaybe<NftSetFilterInput>;
};


export type QueryWalletByAddressArgs = {
  address: Scalars['String'];
  appId?: InputMaybe<Scalars['ID']>;
};


export type QueryWalletByIdArgs = {
  id: Scalars['ID'];
};


export type QueryWalletByUserIdArgs = {
  userId: Scalars['ID'];
};


export type QueryWalletsArgs = {
  appId: Scalars['ID'];
  cursor?: InputMaybe<Scalars['String']>;
  maxResults?: InputMaybe<Scalars['PositiveInt']>;
};

/** The input to register a [Wallet]({{Types.Wallet}}). */
export type RegisterWalletInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']>;
};

/** An interface representing properties common to all user-managed resources in the Niftory API. */
export type Resource = {
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']>;
  /** Creation date of this item */
  createdAt: Scalars['DateTime'];
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** Roles for users of the Niftory admin portal and APIs. */
export enum Role {
  /** Can do anything a minter can, and manage users and permissions. */
  Administrator = 'ADMINISTRATOR',
  /** Can create blockchain objects like models and sets. */
  Creator = 'CREATOR',
  /** Can do anything a creator can, but also manage listings */
  Manager = 'MANAGER',
  /** Can do anything a manager can, and also perform blockchain actions like minting. */
  Minter = 'MINTER'
}

/** The state of an item for sale. */
export enum SaleProcessingState {
  /** This item is available for sale. */
  Available = 'AVAILABLE',
  /** This item was created, but not yet available for sale. */
  Created = 'CREATED',
  /** An error was encountered while selling this item. */
  Error = 'ERROR',
  /** The user has purchased the item, but it's not yet cleared for transfer to their wallet. */
  Locked = 'LOCKED',
  /** This item is reserved for a user, but not yet purchased. */
  Reserved = 'RESERVED',
  /** The item has been sold and transferred to a user's wallet. */
  Sold = 'SOLD',
  /** The item is in the process of being transferred to the user's wallet. */
  Transferring = 'TRANSFERRING'
}

/** The state of an item being sold. */
export enum SaleState {
  /** The item has not been reserved or purchased yet. */
  Available = 'AVAILABLE',
  /** The item has been delivered. */
  Fulfilled = 'FULFILLED',
  /** The item has been paid for and is being fulfilled. */
  Paid = 'PAID',
  /** The item is reserved for a future purchase. */
  Reserved = 'RESERVED'
}

/** An interface representing properties common to all objects that can be bought and sold */
export type SellableEntity = {
  /** This state of this object's sale. */
  saleState?: Maybe<SaleState>;
};

/** A file uploaded to the Niftory API. */
export type SimpleFile = File & {
  __typename?: 'SimpleFile';
  /** The MIME content type for this file. */
  contentType?: Maybe<Scalars['String']>;
  /** A unique identifier for this file in the Niftory API. */
  id: Scalars['ID'];
  /** The MD5 hash of this file. */
  md5?: Maybe<Scalars['String']>;
  /** A friendly name for the file. */
  name: Scalars['String'];
  /** The upload state of the file. */
  state: FileState;
  /** The cloud storage URL for this file. If state is GENERATED_UPLOAD_URL, then this url is the presigned URL to upload to. */
  url: Scalars['URL'];
};

/** The default rarity levels in the Niftory API. */
export enum SimpleRarityLevel {
  /** The most common NFTs. */
  Common = 'COMMON',
  /** The rarest of the rare NFTs, for the most dedicated collectors. */
  Legendary = 'LEGENDARY',
  /** These are rarer, harder to get and more expensive. */
  Rare = 'RARE'
}

/** Status of this resource for user workflows. */
export enum Status {
  /** "Here you go!" */
  Done = 'DONE',
  /** "I'm just getting started." */
  Draft = 'DRAFT',
  /** "I'm working on it!" */
  InProgress = 'IN_PROGRESS',
  /** "I'll get to it eventually..." */
  ToDo = 'TO_DO'
}

/** The state of an item being transferred. */
export enum TransferState {
  /** The item has been created, but not transferred. */
  Available = 'AVAILABLE',
  /** The item failed to transfer. */
  Error = 'ERROR',
  /** The item is being transferred. */
  InProgress = 'IN_PROGRESS',
  /** The item is reserved for a future transfer. */
  Reserved = 'RESERVED',
  /** The item has been transferred. */
  Success = 'SUCCESS'
}

/** The input to update an [NFTListing]({{Types.NFTListing}}). */
export type UpdateNftListingInput = {
  /** The metadata for this listing in JSON format */
  attributes?: InputMaybe<Scalars['JSONObject']>;
  /** The description of the listing */
  description?: InputMaybe<Scalars['String']>;
  /** The ID of the NFTModel to list for sale in this NFT listing. */
  nftModelId?: InputMaybe<Scalars['ID']>;
  /** The price of the NFTlisting. Must be greater than 0. */
  price?: InputMaybe<Scalars['PositiveFloat']>;
  /** The title of the listing */
  title?: InputMaybe<Scalars['String']>;
};

/** The input to update [Wallet]({{Types.Wallet}}) data. */
export type UpdateWalletInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']>;
};

/** An interface containing common data about users. */
export type UserData = {
  /** This user's email. */
  email?: Maybe<Scalars['EmailAddress']>;
  /** The URL for this user's image. */
  image?: Maybe<Scalars['String']>;
  /** The user's full name. */
  name?: Maybe<Scalars['String']>;
};

/** Represents a blockchain wallet scoped to a particular [App]({{Types.App}}) and [AppUser]({{Types.AppUser}}). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets). */
export type Wallet = Attributable & HasTimes & Identifiable & {
  __typename?: 'Wallet';
  /** This wallet's address on the blockchain. May be null until the wallet is actually created, in the case of custodial wallets. */
  address?: Maybe<Scalars['String']>;
  /** The User who owns the wallet */
  appUser?: Maybe<AppUser>;
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']>;
  /** Creation date of this item */
  createdAt: Scalars['DateTime'];
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID'];
  /** The NFTs from the current app that are in this wallet. */
  nfts?: Maybe<Array<Maybe<Nft>>>;
  /** The state of this wallet. */
  state: WalletState;
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** The verification code that can be used to verify this wallet for this user. */
  verificationCode?: Maybe<Scalars['String']>;
  /** The type of wallet. This represents if the wallet was linked externally or created by Niftory */
  walletType?: Maybe<WalletType>;
};

/** A list of Wallets. */
export type WalletList = Pageable & {
  __typename?: 'WalletList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']>;
  /** The Wallets in this list. */
  items?: Maybe<Array<Maybe<Wallet>>>;
};

/** The state of a wallet. */
export enum WalletState {
  /** (Custodial Wallet Only) The Niftory custodial wallet failed to be created on the blockchain. */
  CreationFailed = 'CREATION_FAILED',
  /** (Custodial Wallet Only) The Niftory custodial wallet is in the process of being created on-chain. The address and state of the Wallet object will be updated once complete. */
  PendingCreation = 'PENDING_CREATION',
  /** The wallet is ready to receive NFTs from this app's contract. */
  Ready = 'READY',
  /** The wallet has been registered with Niftory, but not yet verified to belong to the signed-in user. */
  Unverified = 'UNVERIFIED',
  /** The wallet is verified to belong to the signed-in user, but not yet ready to receive NFTs from this app's contract. */
  Verified = 'VERIFIED'
}

/** The type of wallet. */
export enum WalletType {
  /** A custodial wallet created by the niftory API. */
  Custodial = 'CUSTODIAL',
  /** An external wallet linked by the user. */
  External = 'EXTERNAL'
}

/** The state of a blockchain transaction. */
export enum BlockchainTransactionState {
  /** The transaction hasn't been completed yet. */
  Pending = 'PENDING',
  /** The transaction has been completed. */
  Sealed = 'SEALED'
}

export type ReadyWalletMutationVariables = Exact<{
  address: Scalars['String'];
}>;


export type ReadyWalletMutation = { __typename?: 'Mutation', readyWallet?: { __typename?: 'Wallet', id: string, address?: string | null, state: WalletState } | null };

export type RegisterWalletMutationVariables = Exact<{
  address: Scalars['String'];
}>;


export type RegisterWalletMutation = { __typename?: 'Mutation', registerWallet?: { __typename?: 'Wallet', id: string, address?: string | null, verificationCode?: string | null, state: WalletState } | null };

export type TransferNftToWalletMutationVariables = Exact<{
  nftModelId: Scalars['ID'];
  address: Scalars['String'];
}>;


export type TransferNftToWalletMutation = { __typename?: 'Mutation', transfer?: { __typename?: 'NFT', id: string } | null };

export type UpdateNftModelMutationVariables = Exact<{
  data?: InputMaybe<NftModelUpdateInput>;
  id?: InputMaybe<Scalars['ID']>;
}>;


export type UpdateNftModelMutation = { __typename?: 'Mutation', updateNFTModel?: { __typename?: 'NFTModel', attributes?: any | null, blockchainId?: string | null, createdAt: any, description: string, id: string, metadata?: any | null, rarity?: SimpleRarityLevel | null, quantityMinted?: any | null, quantity?: any | null, updatedAt?: any | null, title: string, status?: Status | null, state: NftModelBlockchainState } | null };

export type VerifyWalletMutationVariables = Exact<{
  address: Scalars['String'];
  signedVerificationCode: Scalars['JSON'];
}>;


export type VerifyWalletMutation = { __typename?: 'Mutation', verifyWallet?: { __typename?: 'Wallet', id: string, address?: string | null, state: WalletState } | null };

export type ContractQueryVariables = Exact<{ [key: string]: never; }>;


export type ContractQuery = { __typename?: 'Query', contract?: { __typename?: 'EvmContract', name?: string | null, address?: string | null } | { __typename?: 'FlowContract', name?: string | null, address?: string | null } | null };

export type NftQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NftQuery = { __typename?: 'Query', nft?: { __typename?: 'NFT', blockchainId?: string | null, blockchainState: NftBlockchainState, metadata?: any | null, id: string, serialNumber?: number | null, status?: TransferState | null, model?: { __typename?: 'NFTModel', id: string, attributes?: any | null, state: NftModelBlockchainState, createdAt: any, status?: Status | null, blockchainId?: string | null, metadata?: any | null, title: string, description: string, rarity?: SimpleRarityLevel | null, quantity?: any | null, set: { __typename?: 'NFTSet', attributes?: any | null, blockchainId?: string | null, createdAt: any, id: string, image?: any | null, metadata?: any | null, state: NftSetBlockchainState, status?: Status | null, title: string, updatedAt?: any | null }, content?: { __typename?: 'NFTContent', id: string, poster?: { __typename?: 'SimpleFile', url: any, state: FileState, contentType?: string | null, id: string } | null, files?: Array<{ __typename?: 'NFTFile', url: any, id: string, state: FileState, contentType?: string | null } | null> | null } | null } | null } | null };

export type NftModelQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NftModelQuery = { __typename?: 'Query', nftModel?: { __typename?: 'NFTModel', id: string, attributes?: any | null, status?: Status | null, blockchainId?: string | null, metadata?: any | null, title: string, description: string, rarity?: SimpleRarityLevel | null, quantity?: any | null, quantityMinted?: any | null, content?: { __typename?: 'NFTContent', id: string, poster?: { __typename?: 'SimpleFile', url: any, state: FileState, contentType?: string | null, id: string } | null, files?: Array<{ __typename?: 'NFTFile', url: any, id: string, state: FileState, contentType?: string | null } | null> | null } | null, set: { __typename?: 'NFTSet', id: string } } | null };

export type NftModelsQueryVariables = Exact<{
  appId?: InputMaybe<Scalars['ID']>;
}>;


export type NftModelsQuery = { __typename?: 'Query', nftModels?: { __typename?: 'NFTModelList', cursor?: string | null, items?: Array<{ __typename?: 'NFTModel', id: string, blockchainId?: string | null, title: string, description: string, quantity?: any | null, quantityMinted?: any | null, status?: Status | null, rarity?: SimpleRarityLevel | null, attributes?: any | null, content?: { __typename?: 'NFTContent', files?: Array<{ __typename?: 'NFTFile', url: any, contentType?: string | null } | null> | null, poster?: { __typename?: 'SimpleFile', url: any } | null } | null } | null> | null } | null };

export type NftsByWalletQueryVariables = Exact<{
  address?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['String']>;
  maxResults?: InputMaybe<Scalars['PositiveInt']>;
  walletId?: InputMaybe<Scalars['ID']>;
  filter?: InputMaybe<NftFilterInput>;
}>;


export type NftsByWalletQuery = { __typename?: 'Query', nftsByWallet?: { __typename?: 'NFTList', cursor?: string | null, items?: Array<{ __typename?: 'NFT', id: string, blockchainId?: string | null, serialNumber?: number | null, blockchainState: NftBlockchainState, status?: TransferState | null, model?: { __typename?: 'NFTModel', id: string, title: string, description: string, rarity?: SimpleRarityLevel | null, attributes?: any | null, quantity?: any | null, quantityMinted?: any | null, metadata?: any | null, status?: Status | null, state: NftModelBlockchainState, updatedAt?: any | null, blockchainId?: string | null, createdAt: any, content?: { __typename?: 'NFTContent', id: string, files?: Array<{ __typename?: 'NFTFile', contentType?: string | null, id: string, url: any } | null> | null, poster?: { __typename?: 'SimpleFile', url: any, state: FileState, contentType?: string | null, id: string } | null } | null } | null } | null> | null } | null };

export type WalletByAddressQueryVariables = Exact<{
  address: Scalars['String'];
}>;


export type WalletByAddressQuery = { __typename?: 'Query', walletByAddress?: { __typename?: 'Wallet', id: string, address?: string | null, state: WalletState, verificationCode?: string | null } | null };

export type CompleteCheckoutWithDapperWalletMutationVariables = Exact<{
  transactionId: Scalars['String'];
  nftDatabaseId?: InputMaybe<Scalars['String']>;
}>;


export type CompleteCheckoutWithDapperWalletMutation = { __typename?: 'Mutation', completeCheckoutWithDapperWallet?: { __typename?: 'NFT', id: string, blockchainId?: string | null, serialNumber?: number | null, saleState?: SaleState | null, blockchainState: NftBlockchainState } | null };

export type CheckoutWithDapperWalletMutationVariables = Exact<{
  nftModelId: Scalars['ID'];
  address: Scalars['String'];
  price?: InputMaybe<Scalars['UnsignedFloat']>;
  expiry?: InputMaybe<Scalars['UnsignedInt']>;
}>;


export type CheckoutWithDapperWalletMutation = { __typename?: 'Mutation', checkoutWithDapperWallet?: { __typename?: 'CheckoutWithDapperWalletResponse', cadence?: string | null, brand?: string | null, expiry?: string | null, nftId?: string | null, nftDatabaseId?: string | null, nftTypeRef?: string | null, price?: string | null, registryAddress?: string | null, setId?: string | null, templateId?: string | null, signerAddress?: string | null, signerKeyId?: number | null } | null };

export type SignTransactionForDapperWalletMutationVariables = Exact<{
  transaction?: InputMaybe<Scalars['String']>;
}>;


export type SignTransactionForDapperWalletMutation = { __typename?: 'Mutation', signTransactionForDapperWallet?: string | null };


export const ReadyWalletDocument = `
    mutation readyWallet($address: String!) {
  readyWallet(address: $address) {
    id
    address
    state
  }
}
    `;
export const useReadyWalletMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<ReadyWalletMutation, TError, ReadyWalletMutationVariables, TContext>) =>
    useMutation<ReadyWalletMutation, TError, ReadyWalletMutationVariables, TContext>(
      ['readyWallet'],
      (variables?: ReadyWalletMutationVariables) => fetchData<ReadyWalletMutation, ReadyWalletMutationVariables>(ReadyWalletDocument, variables)(),
      options
    );
export const RegisterWalletDocument = `
    mutation registerWallet($address: String!) {
  registerWallet(address: $address) {
    id
    address
    verificationCode
    state
  }
}
    `;
export const useRegisterWalletMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<RegisterWalletMutation, TError, RegisterWalletMutationVariables, TContext>) =>
    useMutation<RegisterWalletMutation, TError, RegisterWalletMutationVariables, TContext>(
      ['registerWallet'],
      (variables?: RegisterWalletMutationVariables) => fetchData<RegisterWalletMutation, RegisterWalletMutationVariables>(RegisterWalletDocument, variables)(),
      options
    );
export const TransferNftToWalletDocument = `
    mutation transferNFTToWallet($nftModelId: ID!, $address: String!) {
  transfer(nftModelId: $nftModelId, address: $address) {
    id
  }
}
    `;
export const useTransferNftToWalletMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<TransferNftToWalletMutation, TError, TransferNftToWalletMutationVariables, TContext>) =>
    useMutation<TransferNftToWalletMutation, TError, TransferNftToWalletMutationVariables, TContext>(
      ['transferNFTToWallet'],
      (variables?: TransferNftToWalletMutationVariables) => fetchData<TransferNftToWalletMutation, TransferNftToWalletMutationVariables>(TransferNftToWalletDocument, variables)(),
      options
    );
export const UpdateNftModelDocument = `
    mutation UpdateNFTModel($data: NFTModelUpdateInput = {}, $id: ID = "") {
  updateNFTModel(data: $data, id: $id) {
    attributes
    blockchainId
    createdAt
    description
    id
    metadata
    rarity
    quantityMinted
    quantity
    updatedAt
    title
    status
    state
  }
}
    `;
export const useUpdateNftModelMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateNftModelMutation, TError, UpdateNftModelMutationVariables, TContext>) =>
    useMutation<UpdateNftModelMutation, TError, UpdateNftModelMutationVariables, TContext>(
      ['UpdateNFTModel'],
      (variables?: UpdateNftModelMutationVariables) => fetchData<UpdateNftModelMutation, UpdateNftModelMutationVariables>(UpdateNftModelDocument, variables)(),
      options
    );
export const VerifyWalletDocument = `
    mutation verifyWallet($address: String!, $signedVerificationCode: JSON!) {
  verifyWallet(address: $address, signedVerificationCode: $signedVerificationCode) {
    id
    address
    state
  }
}
    `;
export const useVerifyWalletMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<VerifyWalletMutation, TError, VerifyWalletMutationVariables, TContext>) =>
    useMutation<VerifyWalletMutation, TError, VerifyWalletMutationVariables, TContext>(
      ['verifyWallet'],
      (variables?: VerifyWalletMutationVariables) => fetchData<VerifyWalletMutation, VerifyWalletMutationVariables>(VerifyWalletDocument, variables)(),
      options
    );
export const ContractDocument = `
    query contract {
  contract {
    name
    address
  }
}
    `;
export const useContractQuery = <
      TData = ContractQuery,
      TError = unknown
    >(
      variables?: ContractQueryVariables,
      options?: UseQueryOptions<ContractQuery, TError, TData>
    ) =>
    useQuery<ContractQuery, TError, TData>(
      variables === undefined ? ['contract'] : ['contract', variables],
      fetchData<ContractQuery, ContractQueryVariables>(ContractDocument, variables),
      options
    );
export const useInfiniteContractQuery = <
      TData = ContractQuery,
      TError = unknown
    >(
      pageParamKey: keyof ContractQueryVariables,
      variables?: ContractQueryVariables,
      options?: UseInfiniteQueryOptions<ContractQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<ContractQuery, TError, TData>(
      variables === undefined ? ['contract.infinite'] : ['contract.infinite', variables],
      (metaData) => fetchData<ContractQuery, ContractQueryVariables>(ContractDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const NftDocument = `
    query nft($id: ID!) {
  nft(id: $id) {
    blockchainId
    blockchainState
    metadata
    id
    serialNumber
    model {
      id
      attributes
      state
      createdAt
      status
      blockchainId
      metadata
      title
      description
      rarity
      quantity
      set {
        attributes
        blockchainId
        createdAt
        id
        image
        metadata
        state
        status
        title
        updatedAt
      }
      content {
        id
        poster {
          url
          state
          contentType
          id
        }
        files {
          url
          id
          state
          contentType
        }
      }
    }
    status
  }
}
    `;
export const useNftQuery = <
      TData = NftQuery,
      TError = unknown
    >(
      variables: NftQueryVariables,
      options?: UseQueryOptions<NftQuery, TError, TData>
    ) =>
    useQuery<NftQuery, TError, TData>(
      ['nft', variables],
      fetchData<NftQuery, NftQueryVariables>(NftDocument, variables),
      options
    );
export const useInfiniteNftQuery = <
      TData = NftQuery,
      TError = unknown
    >(
      pageParamKey: keyof NftQueryVariables,
      variables: NftQueryVariables,
      options?: UseInfiniteQueryOptions<NftQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<NftQuery, TError, TData>(
      ['nft.infinite', variables],
      (metaData) => fetchData<NftQuery, NftQueryVariables>(NftDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const NftModelDocument = `
    query nftModel($id: ID!) {
  nftModel(id: $id) {
    id
    attributes
    status
    blockchainId
    metadata
    title
    description
    rarity
    quantity
    quantityMinted
    content {
      id
      poster {
        url
        state
        contentType
        id
      }
      files {
        url
        id
        state
        contentType
      }
    }
    set {
      id
    }
  }
}
    `;
export const useNftModelQuery = <
      TData = NftModelQuery,
      TError = unknown
    >(
      variables: NftModelQueryVariables,
      options?: UseQueryOptions<NftModelQuery, TError, TData>
    ) =>
    useQuery<NftModelQuery, TError, TData>(
      ['nftModel', variables],
      fetchData<NftModelQuery, NftModelQueryVariables>(NftModelDocument, variables),
      options
    );
export const useInfiniteNftModelQuery = <
      TData = NftModelQuery,
      TError = unknown
    >(
      pageParamKey: keyof NftModelQueryVariables,
      variables: NftModelQueryVariables,
      options?: UseInfiniteQueryOptions<NftModelQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<NftModelQuery, TError, TData>(
      ['nftModel.infinite', variables],
      (metaData) => fetchData<NftModelQuery, NftModelQueryVariables>(NftModelDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const NftModelsDocument = `
    query nftModels($appId: ID) {
  nftModels(appId: $appId) {
    items {
      id
      blockchainId
      title
      description
      quantity
      quantityMinted
      status
      rarity
      attributes
      content {
        files {
          url
          contentType
        }
        poster {
          url
        }
      }
    }
    cursor
  }
}
    `;
export const useNftModelsQuery = <
      TData = NftModelsQuery,
      TError = unknown
    >(
      variables?: NftModelsQueryVariables,
      options?: UseQueryOptions<NftModelsQuery, TError, TData>
    ) =>
    useQuery<NftModelsQuery, TError, TData>(
      variables === undefined ? ['nftModels'] : ['nftModels', variables],
      fetchData<NftModelsQuery, NftModelsQueryVariables>(NftModelsDocument, variables),
      options
    );
export const useInfiniteNftModelsQuery = <
      TData = NftModelsQuery,
      TError = unknown
    >(
      pageParamKey: keyof NftModelsQueryVariables,
      variables?: NftModelsQueryVariables,
      options?: UseInfiniteQueryOptions<NftModelsQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<NftModelsQuery, TError, TData>(
      variables === undefined ? ['nftModels.infinite'] : ['nftModels.infinite', variables],
      (metaData) => fetchData<NftModelsQuery, NftModelsQueryVariables>(NftModelsDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const NftsByWalletDocument = `
    query nftsByWallet($address: String = "", $cursor: String = "", $maxResults: PositiveInt = 25, $walletId: ID = "", $filter: NFTFilterInput = {}) {
  nftsByWallet(
    address: $address
    cursor: $cursor
    maxResults: $maxResults
    walletId: $walletId
    filter: $filter
  ) {
    items {
      id
      blockchainId
      serialNumber
      blockchainState
      model {
        id
        title
        description
        rarity
        attributes
        quantity
        quantityMinted
        metadata
        status
        state
        updatedAt
        blockchainId
        createdAt
        content {
          id
          files {
            contentType
            id
            url
          }
          poster {
            url
            state
            contentType
            id
          }
        }
      }
      status
    }
    cursor
  }
}
    `;
export const useNftsByWalletQuery = <
      TData = NftsByWalletQuery,
      TError = unknown
    >(
      variables?: NftsByWalletQueryVariables,
      options?: UseQueryOptions<NftsByWalletQuery, TError, TData>
    ) =>
    useQuery<NftsByWalletQuery, TError, TData>(
      variables === undefined ? ['nftsByWallet'] : ['nftsByWallet', variables],
      fetchData<NftsByWalletQuery, NftsByWalletQueryVariables>(NftsByWalletDocument, variables),
      options
    );
export const useInfiniteNftsByWalletQuery = <
      TData = NftsByWalletQuery,
      TError = unknown
    >(
      pageParamKey: keyof NftsByWalletQueryVariables,
      variables?: NftsByWalletQueryVariables,
      options?: UseInfiniteQueryOptions<NftsByWalletQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<NftsByWalletQuery, TError, TData>(
      variables === undefined ? ['nftsByWallet.infinite'] : ['nftsByWallet.infinite', variables],
      (metaData) => fetchData<NftsByWalletQuery, NftsByWalletQueryVariables>(NftsByWalletDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const WalletByAddressDocument = `
    query walletByAddress($address: String!) {
  walletByAddress(address: $address) {
    id
    address
    state
    verificationCode
  }
}
    `;
export const useWalletByAddressQuery = <
      TData = WalletByAddressQuery,
      TError = unknown
    >(
      variables: WalletByAddressQueryVariables,
      options?: UseQueryOptions<WalletByAddressQuery, TError, TData>
    ) =>
    useQuery<WalletByAddressQuery, TError, TData>(
      ['walletByAddress', variables],
      fetchData<WalletByAddressQuery, WalletByAddressQueryVariables>(WalletByAddressDocument, variables),
      options
    );
export const useInfiniteWalletByAddressQuery = <
      TData = WalletByAddressQuery,
      TError = unknown
    >(
      pageParamKey: keyof WalletByAddressQueryVariables,
      variables: WalletByAddressQueryVariables,
      options?: UseInfiniteQueryOptions<WalletByAddressQuery, TError, TData>
    ) =>{
    
    return useInfiniteQuery<WalletByAddressQuery, TError, TData>(
      ['walletByAddress.infinite', variables],
      (metaData) => fetchData<WalletByAddressQuery, WalletByAddressQueryVariables>(WalletByAddressDocument, {...variables, ...(metaData.pageParam ?? {})})(),
      options
    )};

export const CompleteCheckoutWithDapperWalletDocument = `
    mutation CompleteCheckoutWithDapperWallet($transactionId: String!, $nftDatabaseId: String) {
  completeCheckoutWithDapperWallet(
    transactionId: $transactionId
    nftDatabaseId: $nftDatabaseId
  ) {
    id
    blockchainId
    serialNumber
    saleState
    blockchainState
  }
}
    `;
export const useCompleteCheckoutWithDapperWalletMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CompleteCheckoutWithDapperWalletMutation, TError, CompleteCheckoutWithDapperWalletMutationVariables, TContext>) =>
    useMutation<CompleteCheckoutWithDapperWalletMutation, TError, CompleteCheckoutWithDapperWalletMutationVariables, TContext>(
      ['CompleteCheckoutWithDapperWallet'],
      (variables?: CompleteCheckoutWithDapperWalletMutationVariables) => fetchData<CompleteCheckoutWithDapperWalletMutation, CompleteCheckoutWithDapperWalletMutationVariables>(CompleteCheckoutWithDapperWalletDocument, variables)(),
      options
    );
export const CheckoutWithDapperWalletDocument = `
    mutation CheckoutWithDapperWallet($nftModelId: ID!, $address: String!, $price: UnsignedFloat, $expiry: UnsignedInt) {
  checkoutWithDapperWallet(
    nftModelId: $nftModelId
    address: $address
    price: $price
    expiry: $expiry
  ) {
    cadence
    brand
    expiry
    nftId
    nftDatabaseId
    nftTypeRef
    price
    registryAddress
    setId
    templateId
    signerAddress
    signerKeyId
  }
}
    `;
export const useCheckoutWithDapperWalletMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CheckoutWithDapperWalletMutation, TError, CheckoutWithDapperWalletMutationVariables, TContext>) =>
    useMutation<CheckoutWithDapperWalletMutation, TError, CheckoutWithDapperWalletMutationVariables, TContext>(
      ['CheckoutWithDapperWallet'],
      (variables?: CheckoutWithDapperWalletMutationVariables) => fetchData<CheckoutWithDapperWalletMutation, CheckoutWithDapperWalletMutationVariables>(CheckoutWithDapperWalletDocument, variables)(),
      options
    );
export const SignTransactionForDapperWalletDocument = `
    mutation SignTransactionForDapperWallet($transaction: String) {
  signTransactionForDapperWallet(transaction: $transaction)
}
    `;
export const useSignTransactionForDapperWalletMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SignTransactionForDapperWalletMutation, TError, SignTransactionForDapperWalletMutationVariables, TContext>) =>
    useMutation<SignTransactionForDapperWalletMutation, TError, SignTransactionForDapperWalletMutationVariables, TContext>(
      ['SignTransactionForDapperWallet'],
      (variables?: SignTransactionForDapperWalletMutationVariables) => fetchData<SignTransactionForDapperWalletMutation, SignTransactionForDapperWalletMutationVariables>(SignTransactionForDapperWalletDocument, variables)(),
      options
    );