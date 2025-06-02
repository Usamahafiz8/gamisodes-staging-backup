import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  EmailAddress: { input: any; output: any; }
  JSON: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
  PositiveFloat: { input: any; output: any; }
  PositiveInt: { input: any; output: any; }
  URL: { input: any; output: any; }
  UnsignedFloat: { input: any; output: any; }
  UnsignedInt: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

/** Current Prisma Mapping: User (with role >= MARKETER). A user of the Niftory admin portal and APIs. */
export type AdminUser = Identifiable & UserData & {
  __typename?: 'AdminUser';
  /** The apps this user is an admin for. */
  apps?: Maybe<Array<Maybe<App>>>;
  /** This user's email. */
  email?: Maybe<Scalars['EmailAddress']['output']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** The URL for this user's image. */
  image?: Maybe<Scalars['String']['output']>;
  /** The user's full name. */
  name?: Maybe<Scalars['String']['output']>;
  /** The organizations this user belongs to. */
  organizations?: Maybe<Array<Maybe<Organization>>>;
  /** Role of the admin user */
  role?: Maybe<Scalars['String']['output']>;
  /** Accepted datetime of TOS agreement */
  tosAcceptanceDateTime?: Maybe<Scalars['DateTime']['output']>;
};

export type AdminUserCreateInput = {
  /** The appIds of apps to create the user to */
  appIds: Array<InputMaybe<Scalars['String']['input']>>;
  /** The email of the user */
  email: Scalars['String']['input'];
  /** The name of the user */
  name: Scalars['String']['input'];
  /** The role of the user */
  role: Scalars['String']['input'];
};

/** A list of admin Users. */
export type AdminUserList = Pageable & {
  __typename?: 'AdminUserList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The admin users in this list. */
  items?: Maybe<Array<Maybe<AdminUser>>>;
};

export type AdminUserUpdateInput = {
  /** The appIds of apps to update the user to */
  appIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The email of the user */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The name of the user */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The role of the user */
  role?: InputMaybe<Role>;
};

export type AdminUsersFilterInput = {
  /** The role of the user to filter */
  role?: InputMaybe<Scalars['String']['input']>;
  /** The search query for full text search */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** An application in the Niftory ecosystem. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
export type App = Identifiable & {
  __typename?: 'App';
  /** The blockchain in which this app is deployed. */
  blockchain?: Maybe<Blockchain>;
  /** The number of concurrent blockchain operations for app. */
  concurrency?: Maybe<Scalars['UnsignedInt']['output']>;
  /** The contract associated with this app. */
  contract?: Maybe<Contract>;
  /** The credentials for this app. */
  credentials?: Maybe<Array<Maybe<Keys>>>;
  /** The dapper merchant account for this app */
  dapperMerchantAccountAddress?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** The key pool size for creation of niftory custodial wallets. */
  keyPoolSize?: Maybe<Scalars['UnsignedInt']['output']>;
  /**
   * The keys for this app.
   * @deprecated Use credentials instead
   */
  keys?: Maybe<Keys>;
  /** The name for this app. */
  name?: Maybe<Scalars['String']['output']>;
  /** The organization this app belongs to */
  organization?: Maybe<Organization>;
  /** Blockchain storage address for the app's NFTs after they are initially minted */
  storageAddress?: Maybe<Scalars['String']['output']>;
};

export type AppCreateInput = {
  /** A user to add to the organization. Required if using backend credentials. */
  adminUserEmail?: InputMaybe<Scalars['EmailAddress']['input']>;
  /** The blockchain in which this app is deployed. */
  blockchain?: InputMaybe<Blockchain>;
  dapperMerchantAccountAddress?: InputMaybe<Scalars['String']['input']>;
  /** Name of the app */
  name?: InputMaybe<Scalars['String']['input']>;
  /** The id of the organization to create app in */
  organizationId?: InputMaybe<Scalars['String']['input']>;
  /** The URIs to redirect to after signin. Only required if using oauth */
  redirectUris?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** A list of all apps. */
export type AppList = Pageable & {
  __typename?: 'AppList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The Apps in this list. */
  items?: Maybe<Array<Maybe<App>>>;
};

export type AppUpdateInput = {
  /** Name of the app */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Storage address of the app  */
  storageAddress?: InputMaybe<Scalars['String']['input']>;
};

/** Represents a user of a particular Niftory [App]({{Types.App}}). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
export type AppUser = HasTimes & Identifiable & UserData & {
  __typename?: 'AppUser';
  /** The app this user is scoped to. */
  app?: Maybe<App>;
  /** Creation date of this item */
  createdAt: Scalars['DateTime']['output'];
  /** This user's email. */
  email?: Maybe<Scalars['EmailAddress']['output']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** The URL for this user's image. */
  image?: Maybe<Scalars['String']['output']>;
  /** The user's full name. */
  name?: Maybe<Scalars['String']['output']>;
  /** The primary wallet used by this user. */
  primaryWallet?: Maybe<Wallet>;
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /**
   * The wallet owned by this user.
   * @deprecated Use primaryWallet or wallets instead.
   */
  wallet?: Maybe<Wallet>;
  /** All wallets owned by this user. */
  wallets?: Maybe<Array<Maybe<Wallet>>>;
};

export type AppUserCreateInput = {
  /** The appId of the App for which the User is created within */
  appId: Scalars['String']['input'];
  /** The email of the User */
  email: Scalars['String']['input'];
  /** The name of the User */
  name: Scalars['String']['input'];
  /** The role of the User */
  role: Scalars['String']['input'];
};

/** Represents a list of [AppUser]({{Types.AppUser}})s of a particular Niftory [App]({{Types.App}}). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/app-and-appuser). */
export type AppUserList = Pageable & {
  __typename?: 'AppUserList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The AppUsers in this list. */
  items?: Maybe<Array<Maybe<AppUser>>>;
};

export type AppUsersFilterInput = {
  /** The search query for full text search */
  search?: InputMaybe<Scalars['String']['input']>;
};

export type AppsFilterInput = {
  /** The search query for full text search */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** An interface representing objects that have attributes property for non-blockchain property storage. */
export type Attributable = {
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']['output']>;
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
  blockchainId?: Maybe<Scalars['String']['output']>;
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSONObject']['output']>;
};

/** An interface representing properties common to all objects that exist on the blockchain */
export type BlockchainResource = {
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']['output']>;
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']['output']>;
  /** Creation date of this item */
  createdAt: Scalars['DateTime']['output'];
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** Transaction performed on a blockchain. */
export type BlockchainTransaction = {
  __typename?: 'BlockchainTransaction';
  /** The blockchain where the transaction was perfomed. */
  blockchain: Blockchain;
  /** The hash of the blockchain transaction. */
  hash: Scalars['String']['output'];
  /** The database ID of the transaction. */
  id: Scalars['ID']['output'];
  /** Name of the transaction performed */
  name?: Maybe<Scalars['String']['output']>;
  /** The output of the transaction. */
  result?: Maybe<Scalars['JSON']['output']>;
  /** The state of the transaction. */
  state?: Maybe<BlockchainTransactionState>;
};

/** The response from initiating a checkout with Dapper Wallet. */
export type CheckoutWithDapperWalletResponse = {
  __typename?: 'CheckoutWithDapperWalletResponse';
  /** The brand for the transaction. */
  brand?: Maybe<Scalars['String']['output']>;
  /** The cadence code for the transaction. */
  cadence?: Maybe<Scalars['String']['output']>;
  /** A time when this listing will expire. */
  expiry?: Maybe<Scalars['String']['output']>;
  /** The address of the merchant account that will receive the payment. */
  merchantAccountAddress?: Maybe<Scalars['String']['output']>;
  /** The database ID representing the NFT. To be used for [completeCheckoutWithDapperWallet]({{Mutations.completeCheckoutWithDapperWallet}}) */
  nftDatabaseId?: Maybe<Scalars['String']['output']>;
  /** The NFT blockchain hash if the NFT has already been minted. */
  nftId?: Maybe<Scalars['String']['output']>;
  /** A reference to the cadence NFT type to be used in the transaction. */
  nftTypeRef?: Maybe<Scalars['String']['output']>;
  /** The price to sell the NFT at. */
  price?: Maybe<Scalars['String']['output']>;
  /** The registry address for the transaction. */
  registryAddress?: Maybe<Scalars['String']['output']>;
  /** The set ID from which to send an NFT. */
  setId?: Maybe<Scalars['String']['output']>;
  /** The address of the signer that must authorize this transaction. */
  signerAddress?: Maybe<Scalars['String']['output']>;
  /** The key ID of the signer that must authorize this transaction */
  signerKeyId?: Maybe<Scalars['Int']['output']>;
  /** The template ID from which to send an NFT. */
  templateId?: Maybe<Scalars['String']['output']>;
};

/** Properties common to all smart contracts. */
export type Contract = {
  /** The address at which this contract is deployed. */
  address?: Maybe<Scalars['String']['output']>;
  /** The blockchain in which this contract is deployed. */
  blockchain?: Maybe<Blockchain>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** On-chain contract metadata. */
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  /** The name of this contract. */
  name?: Maybe<Scalars['String']['output']>;
  /** The state of this contract. */
  state?: Maybe<ContractState>;
  /** The version of niftory contract */
  version?: Maybe<Scalars['String']['output']>;
};

/** The state of a contract on the blockchain */
export enum ContractState {
  /** The contract has been created but deployment hasn't started yet. */
  Created = 'CREATED',
  /** The contract is being deployed. */
  Deploying = 'DEPLOYING',
  /** The contract deployment failed. */
  DeployFailed = 'DEPLOY_FAILED',
  /** The contract has been deployed. */
  Ready = 'READY',
  /** The contract update failed. */
  UpdateFailed = 'UPDATE_FAILED',
  /** The contract is being updated. */
  Updating = 'UPDATING'
}

export type ContractUpdateInput = {
  /** The version of the contract to update to */
  version?: InputMaybe<ContractVersion>;
};

/** The type of contract versions. */
export enum ContractVersion {
  V1 = 'V1',
  V2 = 'V2',
  V2_1 = 'V2_1',
  V2_1_1 = 'V2_1_1',
  V2_2 = 'V2_2'
}

export type CreateFileOptionsInput = {
  /** The Content-Type (MIME type) of the file to be uploaded. This must match the Content-Type header you will use to upload the file to the returned URL. If this is left empty, your Content-Type header must also be empty. */
  contentType?: InputMaybe<Scalars['String']['input']>;
  /** Required if the file to be uploaded is a video, and uploadToIPFS=true. In that case a poster must have already been uploaded (so it can be used as the image on IPFS). */
  posterFileId?: InputMaybe<Scalars['ID']['input']>;
  /** Whether to asynchronously trigger an IPFS upload after the file has been uploaded to the returned cloud storage URL. */
  uploadToIPFS?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The input to create an [NFTListing]({{Types.NFTListing}}). */
export type CreateNftListingInput = {
  /** The metadata for this listing in JSON format */
  attributes?: InputMaybe<Scalars['JSONObject']['input']>;
  /** The description of the listing */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the NFT models to list for sale in this NFT listing. */
  nftModelId: Scalars['ID']['input'];
  /** The price of the NFTlisting. Must be greater than 0. */
  price: Scalars['PositiveFloat']['input'];
  /** The status of the NFTListing, example - HIDE_IN_STORE, SHOW_IN_STORE  */
  state?: InputMaybe<ListingState>;
  /** The title of the listing */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The input to create a custodial Niftory [Wallet]({{Types.Wallet}}). */
export type CreateNiftoryWalletInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** The type of client for Niftory authentication. */
export enum CredentialType {
  /** A client that can't keep secrets (e.g. TV or game console). */
  Device = 'DEVICE',
  /** A server-side client that can keep secrets. */
  Server = 'SERVER'
}

export type CredentialUpdateInput = {
  /** The URIs to redirect to after signin. Only required if using oauth. Will replace the current list. */
  redirectUris: Array<InputMaybe<Scalars['URL']['input']>>;
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

/** Custom Blockchain Transaction that can be peroformed on [Wallet]({{Types.Wallet}}) scoped to a specific app */
export type CustomTransaction = Identifiable & {
  __typename?: 'CustomTransaction';
  /** The appId of the app this Custom Transaction belongs to. */
  appId: Scalars['ID']['output'];
  /** The Approval state of the transaction. Transactions need to be approved by a Niftory Admin before execution */
  approvalState?: Maybe<CustomTransactionState>;
  /** The code of the custom transaction written in Cadence */
  code: Scalars['String']['output'];
  hash: Scalars['String']['output'];
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** The metadata script for the transaction. */
  metadataScript?: Maybe<Scalars['String']['output']>;
  /**  A user friendly name for the custom transaction */
  name: Scalars['String']['output'];
};

export type CustomTransactionCreateInput = {
  /** The code of the custom transaction written in cadence */
  code: Scalars['String']['input'];
  /** The associated metadata script of the transaction, if it exists */
  metadataScript: Scalars['String']['input'];
  /** a user friendly name for the transaction */
  name: Scalars['String']['input'];
};

/** List of custom blokchain transactions. */
export type CustomTransactionList = Pageable & {
  __typename?: 'CustomTransactionList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The custom blockchain Transactions in this list */
  items?: Maybe<Array<Maybe<CustomTransaction>>>;
};

/** The state of a custom blockchain transaction. */
export enum CustomTransactionState {
  /** The transaction has been allowed by an admin. */
  Allowed = 'ALLOWED',
  /** The transaction is pending. */
  Submitted = 'SUBMITTED'
}

/** A transaction used for Dapper wallet. */
export type DapperTransaction = {
  __typename?: 'DapperTransaction';
  /** The metadata script for the transaction. */
  metadataScript?: Maybe<Scalars['String']['output']>;
  /** The transaction code. */
  transaction?: Maybe<Scalars['String']['output']>;
};

/** A smart contract on an EVM blockchain. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/contract). */
export type EvmContract = Contract & Identifiable & {
  __typename?: 'EvmContract';
  /** The address at which this contract is deployed. */
  address?: Maybe<Scalars['String']['output']>;
  /** The blockchain in which this contract is deployed. */
  blockchain?: Maybe<Blockchain>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** On-chain contract metadata. */
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  /** The name of this contract. */
  name?: Maybe<Scalars['String']['output']>;
  /** The state of this contract. */
  state?: Maybe<ContractState>;
  /** The version of niftory contract */
  version?: Maybe<Scalars['String']['output']>;
};

/** An interface containing common data about files. */
export type File = {
  /** The MIME content type for this file. */
  contentType?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this file in the Niftory API. */
  id: Scalars['ID']['output'];
  /** The MD5 hash of this file. */
  md5?: Maybe<Scalars['String']['output']>;
  /** A friendly name for the file. */
  name: Scalars['String']['output'];
  /** The upload state of the file. */
  state: FileState;
  /** The cloud storage URL for this file. If state is GENERATED_UPLOAD_URL, then this url is the presigned URL to upload to. */
  url: Scalars['URL']['output'];
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
  price: Scalars['PositiveFloat']['output'];
};

/** A simple pricing strategy for listings with fixed prices. */
export type FixedPricingInput = {
  /** The currency at which this price is set. */
  currency: Currency;
  /** The price in the specified currency at which this item is for sale. */
  price: Scalars['PositiveFloat']['input'];
};

/** A smart contract on the Polygon blockchain. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/contract). */
export type FlowContract = Contract & Identifiable & {
  __typename?: 'FlowContract';
  /** The address at which this contract is deployed. */
  address?: Maybe<Scalars['String']['output']>;
  /** The blockchain in which this contract is deployed. */
  blockchain?: Maybe<Blockchain>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** On-chain contract metadata. */
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  /** The name of this contract. */
  name?: Maybe<Scalars['String']['output']>;
  /** Storage paths for this contract. */
  paths?: Maybe<FlowContractPaths>;
  /** The state of this contract. */
  state?: Maybe<ContractState>;
  /** Transactions that need to be given to Dapper Wallet for use with their platform. */
  transactions?: Maybe<FlowContractTransactions>;
  /** The version of niftory contract */
  version?: Maybe<Scalars['String']['output']>;
};

/** Paths used by Flow contracts for storage. */
export type FlowContractPaths = {
  __typename?: 'FlowContractPaths';
  /** The Collection Public Path for the contract. */
  collectionPublicPath?: Maybe<Scalars['String']['output']>;
  /** The Collection Storage Path for the contract. */
  collectionStoragePath?: Maybe<Scalars['String']['output']>;
};

/** Transactions used by a Flow contract. */
export type FlowContractTransactions = {
  __typename?: 'FlowContractTransactions';
  /** A transaction that cancels any Marketplace Listing */
  cancelMarketplaceListing?: Maybe<Scalars['String']['output']>;
  /** A transaction that creates a listing of an NFT on the Marketplace with Dapper wallet */
  createMarketplaceListing?: Maybe<MultiCurrencyTransaction>;
  /** A transaction that creates a listing of an NFT on the Marketplace with Dapper wallet */
  purchaseMarketplaceListing?: Maybe<MultiCurrencyDapperTransaction>;
  /** A transaction that purchases an NFT with Dapper wallet with USD. */
  purchaseWithUsd?: Maybe<DapperTransaction>;
  /** A transaction that sets up a wallet to receive NFTs for this contract. */
  setup?: Maybe<Scalars['String']['output']>;
};

/** An interface representing objects with a creation and update time */
export type HasTimes = {
  /** Creation date of this item */
  createdAt: Scalars['DateTime']['output'];
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

/** An interface representing objects with unique IDs */
export type Identifiable = {
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
};

/** The response from initiating a purchase checkout. */
export type InitiateCheckoutResponse = {
  __typename?: 'InitiateCheckoutResponse';
  /** The URL to redirect the user to. */
  redirectUrl?: Maybe<Scalars['URL']['output']>;
  /** The status of the payment */
  status?: Maybe<Scalars['String']['output']>;
  /** A message to display to the user which contains checkout information */
  statusMessage?: Maybe<Scalars['String']['output']>;
};

/** A purchase invoice for an NFT. The invoice is created when an NFT is reserved using reserve, and updated when a payment is initiated with checkout */
export type Invoice = HasTimes & Identifiable & {
  __typename?: 'Invoice';
  /** Creation date of this item */
  createdAt: Scalars['DateTime']['output'];
  /** The ID of the Niftory invoice for an NFT purchase */
  id: Scalars['ID']['output'];
  /** The listing associated with this invoice */
  listingId?: Maybe<Scalars['String']['output']>;
  /** The state of this invoice */
  state?: Maybe<InvoiceState>;
  /** The total spent in USD in this invoice */
  total?: Maybe<Scalars['PositiveFloat']['output']>;
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The user id associated with this invoice */
  userId?: Maybe<Scalars['String']['output']>;
};

/** A list of completed invoices for this app */
export type InvoiceList = Pageable & {
  __typename?: 'InvoiceList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']['output']>;
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

export type InvoicesFilterInput = {
  /** The end date of invoices to filter */
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** The starting date of invoice to filter */
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

/** The type of kms key types. */
export enum KmsKeyProviderType {
  /** The aws kms key provider */
  AwsKmsKeyProvider = 'AWS_KMS_KEY_PROVIDER',
  /** The GCP kms key provider */
  GcpKmsKeyProvider = 'GCP_KMS_KEY_PROVIDER'
}

/** The keys for an application in the Niftory platform */
export type Keys = {
  __typename?: 'Keys';
  /** The public API key. */
  apiKey?: Maybe<Scalars['String']['output']>;
  /** The public Client ID. */
  clientId?: Maybe<Scalars['String']['output']>;
  /** The public Client Secret. */
  clientSecret?: Maybe<Scalars['String']['output']>;
  /** The URIs that users can be redirected to after authenticating with this client. */
  redirectUris?: Maybe<Array<Maybe<Scalars['URL']['output']>>>;
  /** The type of credential. */
  type?: Maybe<CredentialType>;
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
  appId: Scalars['ID']['output'];
  /** The blockchain resource ID of the marketplace */
  blockchainId?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** The NFT belonging to this listing. */
  nft: Nft;
  /** The price in the specified currency at which this item is for sale. */
  pricing: FixedPricing;
  /** The state of the marketplace listing */
  state: MarketplaceListingState;
  /** The transactions ids belonging to this marketplace listing */
  transactionIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The user to which the listing belongs to */
  user?: Maybe<AppUser>;
  /** The Wallet where the NFT belongs to */
  wallet?: Maybe<Wallet>;
};

/** Properties to filter [MarketplaceListing]({{Types.MarketplaceListing}})s when querying them. */
export type MarketplaceListingFilterInput = {
  /** Database IDs of the [MarketplaceListing]({{Types.MarketplaceListing}})s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** The IDs of the [NFTModel]({{Types.NFTModel}}) to filter by  */
  nftModelIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** The IDs of the [AppUser]({{Types.AppUser}}) to filter by */
  userIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** The IDs of the [Wallets]({{Types.Wallets}}) to filter by */
  walletIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

/** A list of MarketplaceListings. */
export type MarketplaceListingList = Pageable & {
  __typename?: 'MarketplaceListingList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']['output']>;
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
  flow?: Maybe<Scalars['String']['output']>;
  /** Transaction using the US Dollar */
  usd?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Marks the current TOS version as accepted for the logged in user */
  acceptAdminUserTOS?: Maybe<AdminUser>;
  /** Adds a credential for the specified app. Only supported for privileged clients. */
  addCredential?: Maybe<Keys>;
  /** Approves a custom blockchain transaction to execute it on the blockchain */
  approveCustomTransaction?: Maybe<CustomTransaction>;
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
  /** Updates an admin user */
  createAdminUser?: Maybe<AdminUser>;
  /** Creates the [App]({{Types.App}}) on the specified organization for the user. */
  createApp?: Maybe<App>;
  /** Creates a custom blockchain transaction. that can be later executed on the blockchain */
  createCustomTransaction?: Maybe<CustomTransaction>;
  /** Generates a pre-signed URL that can then be used to upload a file. Once the file has been uploaded to the URL, it will automatically be uploaded to IPFS (if desired). Use the returned [File]({{Types.SimpleFile}}).state to track the upload. */
  createFileUploadUrl?: Maybe<File>;
  /** Creates a new [NFTListing]({{Types.NFTListing}}). */
  createNFTListing?: Maybe<NftListing>;
  /** Creates a new [NFTModel]({{Types.NFTModel}}). */
  createNFTModel?: Maybe<NftModel>;
  /** Creates a new [NFTSet]({{Types.NFTSet}}). */
  createNFTSet?: Maybe<NftSet>;
  /** Provisions a Niftory [Wallet]({{Types.Wallet}}) and, if specified, associates it with the given [AppUser]({{Types.AppUser}}). Note: The call fails if the user already has a wallet. */
  createNiftoryWallet?: Maybe<Wallet>;
  createOrganization: Organization;
  /** Deletes a credential and returns the deleted credential. Only supported for privileged clients. */
  deleteCredential?: Maybe<Keys>;
  /** Deletes a custom blockchain transaction from the database, This won't delete the transaction from the blockchain */
  deleteCustomTransaction?: Maybe<CustomTransaction>;
  /** Deletes the specified file from cloud storage (but not IPFS). */
  deleteFile?: Maybe<File>;
  /** Deletes an existing [NFTListing]({{Types.NFTListing}}). */
  deleteNFTListing?: Maybe<NftListing>;
  /** Deletes an existing [NFTModel]({{Types.NFTModel}}). This operation will only be perfomed if no NFTs have been minted from this NFTModel */
  deleteNFTModel?: Maybe<NftModel>;
  /** Deletes an existing [NFTSet]({{Types.NFTSet}}). This operation will only be perfomed if no NFTs have been minted from this NFTSet */
  deleteNFTSet?: Maybe<NftSet>;
  deleteOrganizationMember: OrganizationMember;
  /** Deploys the [Contract]({{Types.Contract}}) from the currently authenticated app. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/contract). */
  deployContract?: Maybe<Contract>;
  /** Executes a transaction for a Niftory wallet. */
  executeTransaction?: Maybe<BlockchainTransaction>;
  /** Initiates minting for a given [NFTModel]({{Types.NFTmodel}}). */
  mintNFTModel?: Maybe<NftModel>;
  /** Initiates minting for a given [NFTSet]({{Types.NFTSet}}). */
  mintNFTSet?: Maybe<NftSet>;
  /** Marks a [Wallet]({{Types.Wallet}}) as ready, indicating that the wallet is ready to receive [NFT]({{Types.NFT}})s from the app's [Contract]({{Types.Contract}}). The wallet must be verified before this succeeds. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/set-up-wallets). */
  readyWallet?: Maybe<Wallet>;
  /** Registers a [Wallet]({{Types.Wallet}}), associating it with the currently signed-in [AppUser]({{Types.AppUser}}) if specified. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/set-up-wallets). */
  registerWallet?: Maybe<Wallet>;
  /** Reserves an [NFT]({{Types.NFT}}) for an [AppUser]({{Types.AppUser}}) and returns an [Invoice]({{Types.Invoice}}) for purchase. */
  reserve?: Maybe<Invoice>;
  /** Sets the primary [Wallet]({{Types.Wallet}}) for the currently signed in user. */
  setPrimaryWallet?: Maybe<Wallet>;
  /** Signs a transaction for a Niftory wallet. */
  signTransaction?: Maybe<Scalars['String']['output']>;
  /** Signs a transaction for Dapper Wallet. */
  signTransactionForDapperWallet?: Maybe<Scalars['String']['output']>;
  /** Initiates the transfer of an [NFT]({{Types.NFT}}) to the currently-logged in [AppUser]({{Types.AppUser}}). The NFT is reserved for the user in database, and you can use the NFT.status field to check on the transfer progress. */
  transfer?: Maybe<Nft>;
  /** Unlinks the specified [Wallet]({{Types.Wallet}}) from the currently signed in user. */
  unlinkWallet?: Maybe<Wallet>;
  /** Updates an admin user */
  updateAdminUser?: Maybe<AdminUser>;
  /** Updates app details of provided appId */
  updateApp?: Maybe<App>;
  /** Updates the [Contract]({{Types.Contract}}) for the currently authenticated app. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/contract). */
  updateContract?: Maybe<Contract>;
  /** Updates credentials for the specified client. Only supported for privileged clients. */
  updateCredential?: Maybe<Keys>;
  /** Updates an existing [NFTListing]({{Types.NFTListing}}). */
  updateNFTListing?: Maybe<NftListing>;
  /** Updates an existing [NFTModel]({{Types.NFTModel}}). Note that if this NFTModel has already been used to mint an NFT, the update operation will fail for any properties that affect the blockchain (such as 'quantity', 'title', 'metadata', etc.), whereas updating 'attributes' will succeed. */
  updateNFTModel?: Maybe<NftModel>;
  /** Updates an existing [NFTSet]({{Types.NFTSet}}). */
  updateNFTSet?: Maybe<NftSet>;
  updateOrganization: Organization;
  updateOrganizationMember: OrganizationMember;
  /** Update a [Wallet]({{Types.Wallet}}) of the currently signed-in user. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/set-up-wallets). */
  updateWallet?: Maybe<Wallet>;
  /** Creates an [NFTContent]({{Types.NFTContent}}) object containing pre-signed URLs that can then be used to upload a file and poster. The primary file will automatically be uploaded to IPFS once it's been uploaded to the pre-signed URL. Each returned [File]({{Types.SimpleFile}}) has a 'state' property to track the upload. */
  uploadNFTContent?: Maybe<NftContent>;
  /** Verifies a [Wallet]({{Types.Wallet}}) to the currently signed-in user. If the signed verification code fails to decode with the wallet's public key or doesn't match the wallet's verification code, the request will fail. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/set-up-wallets). */
  verifyWallet?: Maybe<Wallet>;
  /** Initiates the withdrawal of an [NFT]({{Types.NFT}}) from a custodial Niftory [Wallet]{{Types.Wallet}} to a receiver [Wallet]({{Types.Wallet}}) address */
  withdraw?: Maybe<Nft>;
};


export type MutationAddCredentialArgs = {
  appId: Scalars['ID']['input'];
  data?: InputMaybe<CredentialUpdateInput>;
  type?: InputMaybe<CredentialType>;
};


export type MutationApproveCustomTransactionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCheckoutArgs = {
  invoiceId: Scalars['String']['input'];
  onError: Scalars['String']['input'];
  onSuccess: Scalars['String']['input'];
};


export type MutationCheckoutWithDapperWalletArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  expiry?: InputMaybe<Scalars['UnsignedInt']['input']>;
  nftModelId: Scalars['ID']['input'];
  price?: InputMaybe<Scalars['UnsignedFloat']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  walletId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCompleteCheckoutWithDapperWalletArgs = {
  nftDatabaseId?: InputMaybe<Scalars['String']['input']>;
  transactionId: Scalars['String']['input'];
};


export type MutationCompleteMarketplaceCancelArgs = {
  id: Scalars['ID']['input'];
  transactionId: Scalars['String']['input'];
};


export type MutationCompleteMarketplaceListArgs = {
  nftId: Scalars['ID']['input'];
  transactionId: Scalars['String']['input'];
};


export type MutationCompleteMarketplacePurchaseArgs = {
  id: Scalars['ID']['input'];
  transactionId: Scalars['String']['input'];
};


export type MutationCreateAdminUserArgs = {
  data?: InputMaybe<AdminUserCreateInput>;
};


export type MutationCreateAppArgs = {
  data: AppCreateInput;
};


export type MutationCreateCustomTransactionArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  data: CustomTransactionCreateInput;
};


export type MutationCreateFileUploadUrlArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  options?: InputMaybe<CreateFileOptionsInput>;
};


export type MutationCreateNftListingArgs = {
  data: CreateNftListingInput;
};


export type MutationCreateNftModelArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  data: NftModelCreateInput;
  setId: Scalars['ID']['input'];
};


export type MutationCreateNftSetArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  data: NftSetCreateInput;
};


export type MutationCreateNiftoryWalletArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  data?: InputMaybe<CreateNiftoryWalletInput>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreateOrganizationArgs = {
  data: OrganizationCreateInput;
};


export type MutationDeleteCredentialArgs = {
  clientId: Scalars['ID']['input'];
};


export type MutationDeleteCustomTransactionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteFileArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteNftListingArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteNftModelArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteNftSetArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
};


export type MutationDeleteOrganizationMemberArgs = {
  organizationId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeployContractArgs = {
  appId: Scalars['String']['input'];
  blockchain: Blockchain;
  name: Scalars['String']['input'];
};


export type MutationExecuteTransactionArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  appId?: InputMaybe<Scalars['ID']['input']>;
  args?: InputMaybe<Scalars['JSONObject']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  transaction?: InputMaybe<Scalars['String']['input']>;
  transactionId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  walletId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationMintNftModelArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  quantity?: InputMaybe<Scalars['PositiveInt']['input']>;
};


export type MutationMintNftSetArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
};


export type MutationReadyWalletArgs = {
  address: Scalars['String']['input'];
};


export type MutationRegisterWalletArgs = {
  address: Scalars['String']['input'];
  data?: InputMaybe<RegisterWalletInput>;
};


export type MutationReserveArgs = {
  listingId: Scalars['ID']['input'];
};


export type MutationSetPrimaryWalletArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  walletId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSignTransactionArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  appId?: InputMaybe<Scalars['ID']['input']>;
  transaction: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['ID']['input']>;
  walletId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationSignTransactionForDapperWalletArgs = {
  transaction?: InputMaybe<Scalars['String']['input']>;
};


export type MutationTransferArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  appId?: InputMaybe<Scalars['ID']['input']>;
  force?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  nftModelId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
  walletId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUnlinkWalletArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  walletId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateAdminUserArgs = {
  data?: InputMaybe<AdminUserUpdateInput>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateAppArgs = {
  appId: Scalars['ID']['input'];
  data: AppUpdateInput;
};


export type MutationUpdateContractArgs = {
  appId: Scalars['ID']['input'];
  data?: InputMaybe<ContractUpdateInput>;
};


export type MutationUpdateCredentialArgs = {
  clientId: Scalars['ID']['input'];
  data: CredentialUpdateInput;
};


export type MutationUpdateNftListingArgs = {
  data: UpdateNftListingInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateNftModelArgs = {
  data: NftModelUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateNftSetArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  data: NftSetUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateOrganizationArgs = {
  data: OrganizationUpdateInput;
  id: Scalars['ID']['input'];
};


export type MutationUpdateOrganizationMemberArgs = {
  data: OrganizationMemberUpdateInput;
};


export type MutationUpdateWalletArgs = {
  address: Scalars['String']['input'];
  data?: InputMaybe<UpdateWalletInput>;
};


export type MutationUploadNftContentArgs = {
  contentType?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  posterContentType?: InputMaybe<Scalars['String']['input']>;
};


export type MutationVerifyWalletArgs = {
  address: Scalars['String']['input'];
  signedVerificationCode: Scalars['JSON']['input'];
};


export type MutationWithdrawArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  niftoryWalletAddress?: InputMaybe<Scalars['String']['input']>;
  receiverAddress: Scalars['String']['input'];
};

/** Respresentation of a [non-fungible token](https://en.wikipedia.org/wiki/Non-fungible_token) in the Niftory ecosystem (it doesn't have to be minted on the blockchain yet). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts). */
export type Nft = BlockchainEntity & Identifiable & SellableEntity & {
  __typename?: 'NFT';
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']['output']>;
  /** The state of this NFT on the blockchain */
  blockchainState: NftBlockchainState;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** The marketplace listings where this NFT belongs to */
  marketplaceListings?: Maybe<Array<Maybe<MarketplaceListing>>>;
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  /** The NFTModel from which this NFT was created. */
  model?: Maybe<NftModel>;
  /** The ID of the NFTModel from which this NFT was created */
  modelId?: Maybe<Scalars['ID']['output']>;
  /** This state of this object's sale. */
  saleState?: Maybe<SaleState>;
  /** The serial number for this NFT within its model. */
  serialNumber?: Maybe<Scalars['Int']['output']>;
  /**
   * The status of this NFT (e.g. if it is available or being transferred to a user
   * @deprecated Use blockchainState or saleState instead.
   */
  status?: Maybe<TransferState>;
  /** Blockchain transcations for this NFT */
  transactions?: Maybe<Array<Maybe<BlockchainTransaction>>>;
  /** Most recent updated date of this NFT, if any */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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
  id: Scalars['ID']['output'];
  /** The poster file for this NFT's content */
  poster?: Maybe<SimpleFile>;
};

/** The input to create or update [NFTContent]({{Types.NFTContent}}). */
export type NftContentInput = {
  /** The ID of the [NFTFile]({{Types.NFTFile}}) content. This can be created using [createFileUploadUrl]({{Mutations.createFileUploadUrl}}). */
  fileId: Scalars['ID']['input'];
  /** The ID of the poster [File]({{Types.File}}). This can be created using [createFileUploadUrl]({{Mutations.createFileUploadUrl}}). */
  posterId?: InputMaybe<Scalars['ID']['input']>;
};

/** File (with ipfsContentUrl and ipfsMetadataUrl). A file to be included in an NFT. Extends [File]({{Types.File}}) to includes the IPFS addresses for the content and metadata. */
export type NftFile = File & {
  __typename?: 'NFTFile';
  /** The MIME content type for this file. */
  contentType?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this file in the Niftory API. */
  id: Scalars['ID']['output'];
  /** The IPFS address for the content of this file. */
  ipfsContentAddress: Scalars['String']['output'];
  /** The IPFS address for the metadata of this file. */
  ipfsMetadataAddress: Scalars['String']['output'];
  /** The MD5 hash of this file. */
  md5?: Maybe<Scalars['String']['output']>;
  /** A friendly name for the file. */
  name: Scalars['String']['output'];
  /** The upload state of the file. */
  state: FileState;
  /** The cloud storage URL for this file. If state is GENERATED_UPLOAD_URL, then this url is the presigned URL to upload to. */
  url: Scalars['URL']['output'];
};

/** Properties to filter [NFT]({{Types.NFT}})s by when querying them. */
export type NftFilterInput = {
  /** Blockchain IDs of the [NFT]({{Types.NFT}})s to find. */
  blockchainIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Blockchain states of the [NFT]({{Types.NFT}})s to find. Defaults to all. */
  blockchainStates?: InputMaybe<Array<InputMaybe<NftBlockchainState>>>;
  /** Database IDs of the [NFT]({{Types.NFT}})s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** The IDs of the [NFTModel]({{Types.NFTModel}}) that the [NFT]({{Types.NFT}}) should belong to. */
  nftModelIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Sale states of the [NFT]({{Types.NFT}})s to find. When querying within a user context, defaults to [PAID, FULFILLED]. Otherwise, defaults to all. */
  saleStates?: InputMaybe<Array<InputMaybe<SaleState>>>;
  /** The search query for full text search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** Transfer states of the [NFT]({{Types.NFT}})s to find. Defaults to all. */
  transferStates?: InputMaybe<Array<InputMaybe<TransferState>>>;
};

/** A list of NFTs. */
export type NftList = Pageable & {
  __typename?: 'NFTList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The NFTs in this list. */
  items?: Maybe<Array<Maybe<Nft>>>;
};

/** A listing of NFTs for sale. */
export type NftListing = Attributable & HasTimes & Identifiable & {
  __typename?: 'NFTListing';
  /** The appId of the app this NFTListing belongs to. */
  appId: Scalars['ID']['output'];
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']['output']>;
  /** Creation date of this item */
  createdAt: Scalars['DateTime']['output'];
  /** The description of the listing. */
  description?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** The NFT Model for this listing, NFTs from this model will be sold when a user checks out with this listing */
  nftModel: NftModel;
  /** The pricing for this listing */
  pricing: FixedPricing;
  /** The state of this listing. */
  state: ListingState;
  /** The title of the listing. */
  title?: Maybe<Scalars['String']['output']>;
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type NftListingFilterInput = {
  /** The IDs of the NFTListing. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** The search query for full text search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** The status of the NFTListing, example - HIDE_IN_STORE, SHOW_IN_STORE  */
  state?: InputMaybe<ListingState>;
  /** The title of the NFTListing. */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** A list of NFTListings. */
export type NftListingList = Pageable & {
  __typename?: 'NFTListingList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The NFTListings in this list. */
  items?: Maybe<Array<Maybe<NftListing>>>;
};

/** The blueprint for an NFT, containing everything needed to mint one -- file content, blockchain metadata, etc. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts). */
export type NftModel = Attributable & BlockchainEntity & BlockchainResource & HasTimes & Identifiable & Resource & {
  __typename?: 'NFTModel';
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']['output']>;
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']['output']>;
  /** This NFT model's content. */
  content?: Maybe<NftContent>;
  /** Creation date of this item */
  createdAt: Scalars['DateTime']['output'];
  /** The user-friendly description for this model. */
  description: Scalars['String']['output'];
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** The marketplace listings created with nfts from this model */
  marketplaceListings?: Maybe<Array<Maybe<MarketplaceListing>>>;
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  /** The listings for this model. These can be used to sell the NFTs creating using this model */
  nftListings?: Maybe<Array<Maybe<NftListing>>>;
  /** The NFTs created using this model. */
  nfts?: Maybe<Array<Maybe<Nft>>>;
  /** The total quantity of NFTs that will be available for this model. */
  quantity?: Maybe<Scalars['PositiveInt']['output']>;
  /** The total quantity of NFTs that have been minted from this model. */
  quantityMinted?: Maybe<Scalars['UnsignedInt']['output']>;
  /** The rarity of the NFTs in this model. */
  rarity?: Maybe<SimpleRarityLevel>;
  /** The NFT model set containing this model. */
  set: NftSet;
  /** The state of this NFT Model on the blockchain */
  state: NftModelBlockchainState;
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** The user-friendly title for this model. */
  title: Scalars['String']['output'];
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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
  attributes?: InputMaybe<Scalars['JSONObject']['input']>;
  /** The file content for this model. Either 'content' or 'contentId' must be specified. */
  content?: InputMaybe<NftContentInput>;
  /** The ID of the [NFTContent]({{Types.NFTContent}}) for this model. Either 'content' or 'contentId' must be specified. */
  contentId?: InputMaybe<Scalars['ID']['input']>;
  /** The user-friendly details about this model. This will be added to the blockchain metadata when an NFT is minted. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Metadata that will be added to the blockchain for any NFTs minted from this model. */
  metadata?: InputMaybe<Scalars['JSONObject']['input']>;
  /** The total supply of NFTs that can be available for this model. This should be at least 1. This can be updated until the NFTModel is minted. */
  quantity?: InputMaybe<Scalars['PositiveInt']['input']>;
  /** The status of the model. */
  status?: InputMaybe<Status>;
  /** The user-friendly subtitle for this model. This will be added to the blockchain metadata when an NFT is minted. */
  subtitle?: InputMaybe<Scalars['String']['input']>;
  /** String labels to tag this [NFTModel]({{Types.NFTModel}}) with. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The user-friendly title for this model. This will be added to the blockchain metadata when an NFT is minted. */
  title: Scalars['String']['input'];
};

/** Properties to filter [NFTModel]({{Types.NFTModel}})s when querying them. */
export type NftModelFilterInput = {
  /** Blockchain IDs of the [NFTModel]({{Types.NFTModel}})s to find. */
  blockchainIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Filter nft models that have active listings in the marketplace  */
  hasMarketplaceListing?: InputMaybe<Scalars['Boolean']['input']>;
  /** Database IDs of the [NFTModel]({{Types.NFTModel}})s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** The search query for full text search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** The IDs of the [NFTSet]({{Types.NFTSet}})s that the [NFTModel]({{Types.NFTModel}}) should belong to. */
  setIds?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** Filter by [NFTModel]({{Types.NFTModel}}) status. */
  status?: InputMaybe<Status>;
  /** The tags in the [NFTModel]({{Types.NFTModel}}) to find. The models returned will contain every tag specified. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** A list of NFTModels. */
export type NftModelList = Pageable & {
  __typename?: 'NFTModelList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The NFTModels in this list. */
  items?: Maybe<Array<Maybe<NftModel>>>;
};

/** The input to update an NFT model. */
export type NftModelUpdateInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']['input']>;
  /** The file content for this model. This can be updated until the NFTModel is minted. */
  content?: InputMaybe<NftContentInput>;
  /** The ID of the [NFTContent]({{Types.NFTContent}}) for this model. */
  contentId?: InputMaybe<Scalars['ID']['input']>;
  /** The user-friendly details about this model. This will be added to the blockchain metadata when an NFT is minted. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Metadata that will be added to the blockchain for any NFTs minted from this model. This can be updated until the NFTModel is minted */
  metadata?: InputMaybe<Scalars['JSONObject']['input']>;
  /** The total supply of NFTs that can be available for this model. This can be updated until the NFTModel is minted. */
  quantity?: InputMaybe<Scalars['PositiveInt']['input']>;
  /** The status of the model. */
  status?: InputMaybe<Status>;
  /** The user-friendly subtitle for this model. This will be added to the blockchain metadata when an NFT is minted. */
  subtitle?: InputMaybe<Scalars['String']['input']>;
  /** String labels to tag this [NFTModel]({{Types.NFTModel}}) with. These will be stored in the Niftory API but will not be added to the blockchain. Updating this will replace the existing tags. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The user-friendly title for this model. This will be added to the blockchain metadata when an NFT is minted. */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** A set of NFTModels, to help you organize your NFTs. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts). */
export type NftSet = Attributable & BlockchainEntity & BlockchainResource & HasTimes & Identifiable & Resource & {
  __typename?: 'NFTSet';
  /** The app this set belongs to. */
  app?: Maybe<App>;
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']['output']>;
  /** The ID of this resource on the blockchain. */
  blockchainId?: Maybe<Scalars['String']['output']>;
  /** Creation date of this item */
  createdAt: Scalars['DateTime']['output'];
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** The image to represent this set. */
  image?: Maybe<Scalars['URL']['output']>;
  /** A mapping of properties that will be added to the blockchain. */
  metadata?: Maybe<Scalars['JSONObject']['output']>;
  /** Models contained in this set. */
  models?: Maybe<Array<Maybe<NftModel>>>;
  /** The state of this NFT Set on the blockchain */
  state: NftSetBlockchainState;
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** String labels to tag this NFTSet with. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  /** The display image for this set. */
  title: Scalars['String']['output'];
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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
  attributes?: InputMaybe<Scalars['JSONObject']['input']>;
  /** The list of ids of the uploaded metadata [File]({{Types.File}}s). This can be created using [createFileUploadUrl]({{Mutations.createFileUploadUrl}}). */
  fileIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Metadata that will be added to the blockchain */
  metadata?: InputMaybe<Scalars['JSONObject']['input']>;
  /** String labels to tag this [NFTSet]({{Types.NFTSet}}) with. These will be stored in the Niftory API but will not be added to the blockchain. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The user-friendly title for this model. */
  title: Scalars['String']['input'];
};

export type NftSetFilterInput = {
  /** Blockchain IDs of the [NFTSet]({{Types.NFTSet}})s to find. */
  blockchainIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Database IDs of the [NFTSet]({{Types.NFTSet}})s to find. */
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  /** The search query for full text search */
  search?: InputMaybe<Scalars['String']['input']>;
  /** The tags in the [NFTSet]({{Types.NFTSet}}) to find. The sets returned will contain every tag specified. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The title of the [NFTSet]({{Types.NFTSet}}) to find. */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** A list of NFTSets. */
export type NftSetList = Pageable & {
  __typename?: 'NFTSetList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The NFTSets in this list. */
  items?: Maybe<Array<Maybe<NftSet>>>;
};

/** The input to update an [NFTSet]({{Types.NFTSet}}). */
export type NftSetUpdateInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']['input']>;
  /** The list of ids of the uploaded metadata [File]({{Types.File}}s). This can be created using [createFileUploadUrl]({{Mutations.createFileUploadUrl}}). */
  fileIds?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** Metadata that will be added to the blockchain */
  metadata?: InputMaybe<Scalars['JSONObject']['input']>;
  /** String labels to tag this [NFTSet]({{Types.NFTSet}}) with. These will be stored in the Niftory API but will not be added to the blockchain. Updating this will replace the existing tags. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  /** The user-friendly title for this set. */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** An organization within the Niftory ecosystem. Organization manages [App]({{Types.App}})s. Read more [here](https://docs.niftory.com/home/v/admin/explore/org-and-apps). */
export type Organization = Identifiable & {
  __typename?: 'Organization';
  /** The apps belonging to this Organization. */
  apps?: Maybe<Array<Maybe<App>>>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** This organization's members. */
  members?: Maybe<Array<Maybe<OrganizationMember>>>;
  name?: Maybe<Scalars['String']['output']>;
};

export type OrganizationCreateInput = {
  /** A user to add to the organization. Required if using backend credentials. */
  adminUserEmail?: InputMaybe<Scalars['EmailAddress']['input']>;
  name: Scalars['String']['input'];
};

/** Member of an organization */
export type OrganizationMember = Identifiable & UserData & {
  __typename?: 'OrganizationMember';
  /** The apps this user is an admin for. */
  apps?: Maybe<Array<Maybe<App>>>;
  /** This user's email. */
  email?: Maybe<Scalars['EmailAddress']['output']>;
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** The URL for this user's image. */
  image?: Maybe<Scalars['String']['output']>;
  /** The user's full name. */
  name?: Maybe<Scalars['String']['output']>;
  /** Role of the user in organization */
  organizationRole?: Maybe<OrganizationRole>;
};

export type OrganizationMemberUpdateInput = {
  /** The list of appIds in organization to connect user to */
  appIds: Array<InputMaybe<Scalars['String']['input']>>;
  /** The email of the organization member */
  email: Scalars['String']['input'];
  /** The name of the organization member */
  name: Scalars['String']['input'];
  /** The id of the organization to create the user in */
  organizationId: Scalars['String']['input'];
  /** The role of the organization member */
  organizationRole: OrganizationRole;
};

/** The role of an admin in an organization. */
export enum OrganizationRole {
  Admin = 'ADMIN',
  Member = 'MEMBER'
}

export type OrganizationUpdateInput = {
  name: Scalars['String']['input'];
};

/** An interface representing lists that can be paginated with a cursor. */
export type Pageable = {
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  /** Gets the currently signed in [AdminUser]({{Types.AdminUser}}). */
  adminUser?: Maybe<AdminUser>;
  /** Gets the [AdminUser]({{Types.AdminUser}}) by their userId. */
  adminUserById?: Maybe<AdminUser>;
  /** Gets a list of [AdminUser]({{Types.AdminUser}})s */
  adminUsers?: Maybe<AdminUserList>;
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
  /** Gets the [AppList]({{Types.AppList}}) for the niftory admins. */
  apps?: Maybe<AppList>;
  /** Gets a blockchain transaction. */
  blockchainTransaction?: Maybe<BlockchainTransaction>;
  /** Gets the [Contract]({{Types.Contract}}) from the currently authenticated app. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/contract). */
  contract?: Maybe<Contract>;
  /** Gets a custom blockchain transaction. */
  customTransaction?: Maybe<CustomTransaction>;
  /** Gets a list of custom blockchain transactions. */
  customTransactions?: Maybe<CustomTransactionList>;
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
  /** Gets an [NFTSet]({{Types.NFTSet}}) by database ID. */
  nftSet?: Maybe<NftSet>;
  /** Gets [NFTSet]()s for the current [App]() context. */
  nftSets?: Maybe<NftSetList>;
  /** Gets [NFT]({{Types.NFT}})s associated with the current [AppUser]({{Types.AppUser}}) context, including those that are transferring or failed to transfer. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts/querying-nfts). */
  nfts?: Maybe<NftList>;
  /** Gets [NFT]({{Types.NFT}})s associated with the current wallet, including those that are transferring or failed to transfer. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/nfts/querying-nfts). */
  nftsByWallet?: Maybe<NftList>;
  organizationById?: Maybe<Organization>;
  /** Gets the sales stats for the specified app. */
  saleStats?: Maybe<SaleStatsResponse>;
  /** Gets an [NFTSet]({{Types.NFTSet}}) by database ID. */
  set?: Maybe<NftSet>;
  /**
   * Gets [NFTSet]({{Types.NFTSet}})s for the current [App]({{Types.App}}) context.
   * @deprecated This operation is deprecated. Please use 'nftSetList' instead.
   */
  sets?: Maybe<Array<Maybe<NftSet>>>;
  /** Gets the user stats for the specified app. */
  userStats?: Maybe<UserStatsResponse>;
  /** Gets the primary [Wallet]({{Types.Wallet}}) belonging to the current [AppUser]({{Types.AppUser}}) context. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  wallet?: Maybe<Wallet>;
  /** Gets a [Wallet]({{Types.Wallet}}) by its blockchain address. Wallet must be registered using [registerWallet]({{Mutations.registerWallet}}) before this request succeeds. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  walletByAddress?: Maybe<Wallet>;
  /** Gets a [Wallet]({{Types.Wallet}}) by its database ID. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  walletById?: Maybe<Wallet>;
  /** Gets the primary [Wallet]({{Types.Wallet}}) for a given [AppUser]({{Types.AppUser}}). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  walletByUserId?: Maybe<Wallet>;
  /** Gets the wallet stats for the specified app. */
  walletStats?: Maybe<WalletStatsResponse>;
  /** Gets all [Wallet]({{Types.Wallet}})s for a given app. Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets/query-wallets). */
  wallets?: Maybe<WalletList>;
};


export type QueryAdminUserByIdArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
};


export type QueryAdminUsersArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AdminUsersFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']['input']>;
};


export type QueryAppByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAppUserByIdArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
};


export type QueryAppUsersArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AppUsersFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']['input']>;
};


export type QueryAppsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<AppsFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']['input']>;
};


export type QueryBlockchainTransactionArgs = {
  hash?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryContractArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCustomTransactionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCustomTransactionsArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  maxResults?: InputMaybe<Scalars['PositiveInt']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFileArgs = {
  id: Scalars['ID']['input'];
};


export type QueryInvoicesArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<InvoicesFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']['input']>;
};


export type QueryMarketplaceListingArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  nftId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMarketplaceListingsArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<MarketplaceListingFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']['input']>;
};


export type QueryNftArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNftListingArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNftListingsArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<NftListingFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']['input']>;
};


export type QueryNftModelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNftModelsArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<NftModelFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']['input']>;
};


export type QueryNftSetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryNftSetsArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<NftSetFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']['input']>;
};


export type QueryNftsArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<NftFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryNftsByWalletArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<NftFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']['input']>;
  walletId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryOrganizationByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySaleStatsArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<SalesStatFilterInput>;
};


export type QuerySetArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySetsArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<NftSetFilterInput>;
};


export type QueryUserStatsArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryWalletByAddressArgs = {
  address: Scalars['String']['input'];
  appId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryWalletByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryWalletByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryWalletStatsArgs = {
  appId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryWalletsArgs = {
  appId: Scalars['ID']['input'];
  cursor?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<WalletsFilterInput>;
  maxResults?: InputMaybe<Scalars['PositiveInt']['input']>;
};

/** The input to register a [Wallet]({{Types.Wallet}}). */
export type RegisterWalletInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** An interface representing properties common to all user-managed resources in the Niftory API. */
export type Resource = {
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']['output']>;
  /** Creation date of this item */
  createdAt: Scalars['DateTime']['output'];
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** The status of this resource. Can be used to track progress in designing and creating resources. */
  status?: Maybe<Status>;
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
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

/** The response for saleStats call */
export type SaleStatsResponse = {
  __typename?: 'SaleStatsResponse';
  /** The total number of listings sold */
  listingsSold?: Maybe<Scalars['UnsignedInt']['output']>;
  /** The total number of sales made */
  totalSales?: Maybe<Scalars['UnsignedInt']['output']>;
  /** The total number of unique buyers of listings */
  uniqueBuyers?: Maybe<Scalars['UnsignedInt']['output']>;
  /** The total number of unique listings sold */
  uniqueListingsSold?: Maybe<Scalars['UnsignedInt']['output']>;
};

export type SalesStatFilterInput = {
  /** The end date of invoices to filter */
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** The starting date of invoice to filter */
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

/** An interface representing properties common to all objects that can be bought and sold */
export type SellableEntity = {
  /** This state of this object's sale. */
  saleState?: Maybe<SaleState>;
};

/** A file uploaded to the Niftory API. */
export type SimpleFile = File & {
  __typename?: 'SimpleFile';
  /** The MIME content type for this file. */
  contentType?: Maybe<Scalars['String']['output']>;
  /** A unique identifier for this file in the Niftory API. */
  id: Scalars['ID']['output'];
  /** The MD5 hash of this file. */
  md5?: Maybe<Scalars['String']['output']>;
  /** A friendly name for the file. */
  name: Scalars['String']['output'];
  /** The upload state of the file. */
  state: FileState;
  /** The cloud storage URL for this file. If state is GENERATED_UPLOAD_URL, then this url is the presigned URL to upload to. */
  url: Scalars['URL']['output'];
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
  attributes?: InputMaybe<Scalars['JSONObject']['input']>;
  /** The description of the listing */
  description?: InputMaybe<Scalars['String']['input']>;
  /** The ID of the NFTModel to list for sale in this NFT listing. */
  nftModelId?: InputMaybe<Scalars['ID']['input']>;
  /** The price of the NFTlisting. Must be greater than 0. */
  price?: InputMaybe<Scalars['PositiveFloat']['input']>;
  /** The status of the NFTListing, example - HIDE_IN_STORE, SHOW_IN_STORE  */
  state?: InputMaybe<ListingState>;
  /** The title of the listing */
  title?: InputMaybe<Scalars['String']['input']>;
};

/** The input to update [Wallet]({{Types.Wallet}}) data. */
export type UpdateWalletInput = {
  /** A mapping of attributes for this resource. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** An interface containing common data about users. */
export type UserData = {
  /** This user's email. */
  email?: Maybe<Scalars['EmailAddress']['output']>;
  /** The URL for this user's image. */
  image?: Maybe<Scalars['String']['output']>;
  /** The user's full name. */
  name?: Maybe<Scalars['String']['output']>;
};

/** The response for userStats call */
export type UserStatsResponse = {
  __typename?: 'UserStatsResponse';
  /** The total number of users */
  totalUsers?: Maybe<Scalars['UnsignedInt']['output']>;
};

/** Represents a blockchain wallet scoped to a particular [App]({{Types.App}}) and [AppUser]({{Types.AppUser}}). Read more [here](https://docs.niftory.com/home/v/api/core-concepts/wallets). */
export type Wallet = Attributable & HasTimes & Identifiable & {
  __typename?: 'Wallet';
  /** This wallet's address on the blockchain. May be null until the wallet is actually created, in the case of custodial wallets. */
  address?: Maybe<Scalars['String']['output']>;
  /** The User who owns the wallet */
  appUser?: Maybe<AppUser>;
  /** A mapping of attributes for this object. These will be stored in the Niftory API but will not be added to the blockchain. */
  attributes?: Maybe<Scalars['JSONObject']['output']>;
  /** Creation date of this item */
  createdAt: Scalars['DateTime']['output'];
  /** A unique identifier for this object in the Niftory API. */
  id: Scalars['ID']['output'];
  /** The number of nfts belonging to this wallet */
  nftCount?: Maybe<Scalars['UnsignedInt']['output']>;
  /** The NFTs from the current app that are in this wallet. */
  nfts?: Maybe<Array<Maybe<Nft>>>;
  /** The state of this wallet. */
  state: WalletState;
  /** Most recent updated date of this item, if any */
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  /** The verification code that can be used to verify this wallet for this user. */
  verificationCode?: Maybe<Scalars['String']['output']>;
  /** The type of wallet. This represents if the wallet was linked externally or created by Niftory */
  walletType?: Maybe<WalletType>;
};

/** A list of Wallets. */
export type WalletList = Pageable & {
  __typename?: 'WalletList';
  /** The cursor to use to fetch the next page of results, if any. */
  cursor?: Maybe<Scalars['String']['output']>;
  /** The Wallets in this list. */
  items?: Maybe<Array<Maybe<Wallet>>>;
};

/** The state of a wallet. */
export enum WalletState {
  /** (Niftory Wallet Only) The Niftory wallet failed to be created on the blockchain. */
  CreationFailed = 'CREATION_FAILED',
  /** (Niftory Wallet Only) The Niftory wallet is in the process of being created on-chain. The address and state of the Wallet object will be updated once complete. */
  PendingCreation = 'PENDING_CREATION',
  /** The wallet is ready to receive NFTs from this app's contract. */
  Ready = 'READY',
  /** The wallet has been registered with Niftory, but not yet verified to belong to the signed-in user. */
  Unverified = 'UNVERIFIED',
  /** The wallet is verified to belong to the signed-in user, but not yet ready to receive NFTs from this app's contract. */
  Verified = 'VERIFIED'
}

/** The response for walletStats call */
export type WalletStatsResponse = {
  __typename?: 'WalletStatsResponse';
  /** The total number of sales made */
  totalWallets?: Maybe<Scalars['UnsignedInt']['output']>;
};

/** The type of wallet. */
export enum WalletType {
  /** An external wallet linked by the user. */
  External = 'EXTERNAL',
  /** A wallet created by the niftory API. */
  Niftory = 'NIFTORY'
}

export type WalletsFilterInput = {
  /** The search query for full text search */
  search?: InputMaybe<Scalars['String']['input']>;
};

/** The state of a blockchain transaction. */
export enum BlockchainTransactionState {
  /** The transaction hasn't been completed yet. */
  Pending = 'PENDING',
  /** The transaction has been completed. */
  Sealed = 'SEALED'
}

export type CheckoutWithDapperWalletMutationVariables = Exact<{
  nftModelId: Scalars['ID']['input'];
  address: Scalars['String']['input'];
  price?: InputMaybe<Scalars['UnsignedFloat']['input']>;
  expiry?: InputMaybe<Scalars['UnsignedInt']['input']>;
}>;


export type CheckoutWithDapperWalletMutation = { __typename?: 'Mutation', checkoutWithDapperWallet?: { __typename?: 'CheckoutWithDapperWalletResponse', cadence?: string | null, brand?: string | null, expiry?: string | null, nftId?: string | null, nftDatabaseId?: string | null, nftTypeRef?: string | null, price?: string | null, registryAddress?: string | null, setId?: string | null, templateId?: string | null, signerAddress?: string | null, signerKeyId?: number | null } | null };

export type CompleteCheckoutWithDapperWalletMutationVariables = Exact<{
  transactionId: Scalars['String']['input'];
  nftDatabaseId?: InputMaybe<Scalars['String']['input']>;
}>;


export type CompleteCheckoutWithDapperWalletMutation = { __typename?: 'Mutation', completeCheckoutWithDapperWallet?: { __typename?: 'NFT', id: string, blockchainId?: string | null, serialNumber?: number | null, saleState?: SaleState | null, blockchainState: NftBlockchainState } | null };

export type CompleteMarketplaceCancelMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  transactionId: Scalars['String']['input'];
}>;


export type CompleteMarketplaceCancelMutation = { __typename?: 'Mutation', completeMarketplaceCancel?: { __typename?: 'MarketplaceListing', state: MarketplaceListingState, id: string, nft: { __typename?: 'NFT', id: string } } | null };

export type CompleteMarketplaceListMutationVariables = Exact<{
  nftId: Scalars['ID']['input'];
  transactionId: Scalars['String']['input'];
}>;


export type CompleteMarketplaceListMutation = { __typename?: 'Mutation', completeMarketplaceList?: { __typename?: 'MarketplaceListing', id: string, state: MarketplaceListingState, nft: { __typename?: 'NFT', id: string } } | null };

export type CompleteMarketplacePurchaseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  transactionId: Scalars['String']['input'];
}>;


export type CompleteMarketplacePurchaseMutation = { __typename?: 'Mutation', completeMarketplacePurchase?: { __typename?: 'MarketplaceListing', state: MarketplaceListingState, id: string, nft: { __typename?: 'NFT', id: string } } | null };

export type CreateNiftoryWalletMutationVariables = Exact<{
  appId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CreateNiftoryWalletMutation = { __typename?: 'Mutation', createNiftoryWallet?: { __typename?: 'Wallet', address?: string | null, attributes?: any | null, createdAt: any, id: string, state: WalletState, walletType?: WalletType | null } | null };

export type ReadyWalletMutationVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type ReadyWalletMutation = { __typename?: 'Mutation', readyWallet?: { __typename?: 'Wallet', id: string, address?: string | null, state: WalletState } | null };

export type RegisterWalletMutationVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type RegisterWalletMutation = { __typename?: 'Mutation', registerWallet?: { __typename?: 'Wallet', id: string, address?: string | null, verificationCode?: string | null, state: WalletState } | null };

export type SignTransactionForDapperWalletMutationVariables = Exact<{
  transaction?: InputMaybe<Scalars['String']['input']>;
}>;


export type SignTransactionForDapperWalletMutation = { __typename?: 'Mutation', signTransactionForDapperWallet?: string | null };

export type TransferNftToWalletMutationVariables = Exact<{
  nftModelId: Scalars['ID']['input'];
  address?: InputMaybe<Scalars['String']['input']>;
  walletId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type TransferNftToWalletMutation = { __typename?: 'Mutation', transfer?: { __typename?: 'NFT', id: string, blockchainId?: string | null, status?: TransferState | null, saleState?: SaleState | null } | null };

export type TransferBetweenWalletsMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  niftoryWalletAddress: Scalars['String']['input'];
  receiverAddress: Scalars['String']['input'];
}>;


export type TransferBetweenWalletsMutation = { __typename?: 'Mutation', withdraw?: { __typename?: 'NFT', id: string, status?: TransferState | null } | null };

export type TransferByIdMutationVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
  walletId?: InputMaybe<Scalars['ID']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  force?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type TransferByIdMutation = { __typename?: 'Mutation', transfer?: { __typename?: 'NFT', id: string, serialNumber?: number | null, status?: TransferState | null, saleState?: SaleState | null } | null };

export type UpdateNftModelMutationVariables = Exact<{
  attributes?: InputMaybe<Scalars['JSONObject']['input']>;
  metadata?: InputMaybe<Scalars['JSONObject']['input']>;
  id: Scalars['ID']['input'];
}>;


export type UpdateNftModelMutation = { __typename?: 'Mutation', updateNFTModel?: { __typename?: 'NFTModel', attributes?: any | null, id: string, title: string, metadata?: any | null } | null };

export type VerifyWalletMutationVariables = Exact<{
  address: Scalars['String']['input'];
  signedVerificationCode: Scalars['JSON']['input'];
}>;


export type VerifyWalletMutation = { __typename?: 'Mutation', verifyWallet?: { __typename?: 'Wallet', id: string, address?: string | null, state: WalletState } | null };

export type WithdrawMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  niftoryWalletAddress: Scalars['String']['input'];
  receiverAddress: Scalars['String']['input'];
}>;


export type WithdrawMutation = { __typename?: 'Mutation', withdraw?: { __typename?: 'NFT', id: string, blockchainId?: string | null, serialNumber?: number | null, modelId?: string | null, transactions?: Array<{ __typename?: 'BlockchainTransaction', id: string } | null> | null } | null };

export type ContractQueryVariables = Exact<{ [key: string]: never; }>;


export type ContractQuery = { __typename?: 'Query', contract?: { __typename?: 'EvmContract', name?: string | null, address?: string | null } | { __typename?: 'FlowContract', name?: string | null, address?: string | null } | null };

export type GetNftsQueryVariables = Exact<{
  ids?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>> | InputMaybe<Scalars['ID']['input']>>;
}>;


export type GetNftsQuery = { __typename?: 'Query', nfts?: { __typename?: 'NFTList', items?: Array<{ __typename?: 'NFT', serialNumber?: number | null, modelId?: string | null, id: string, saleState?: SaleState | null, status?: TransferState | null } | null> | null } | null };

export type MarketplaceListingQueryVariables = Exact<{
  nftId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type MarketplaceListingQuery = { __typename?: 'Query', marketplaceListing?: { __typename?: 'MarketplaceListing', id: string, blockchainId?: string | null, transactionIds?: Array<string | null> | null, state: MarketplaceListingState, wallet?: { __typename?: 'Wallet', address?: string | null } | null, pricing: { __typename?: 'FixedPricing', price: any, currency: Currency }, nft: { __typename?: 'NFT', id: string, blockchainId?: string | null, serialNumber?: number | null, blockchainState: NftBlockchainState, status?: TransferState | null, model?: { __typename?: 'NFTModel', id: string, title: string, description: string, rarity?: SimpleRarityLevel | null, content?: { __typename?: 'NFTContent', id: string, poster?: { __typename?: 'SimpleFile', url: any, state: FileState, contentType?: string | null, id: string } | null, files?: Array<{ __typename?: 'NFTFile', url: any, id: string, state: FileState, contentType?: string | null } | null> | null } | null } | null } } | null };

export type MarketplaceListingsQueryVariables = Exact<{
  filter?: InputMaybe<MarketplaceListingFilterInput>;
  appId?: InputMaybe<Scalars['ID']['input']>;
  maxResults?: InputMaybe<Scalars['PositiveInt']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type MarketplaceListingsQuery = { __typename?: 'Query', marketplaceListings?: { __typename?: 'MarketplaceListingList', cursor?: string | null, items?: Array<{ __typename?: 'MarketplaceListing', id: string, blockchainId?: string | null, transactionIds?: Array<string | null> | null, state: MarketplaceListingState, wallet?: { __typename?: 'Wallet', address?: string | null } | null, pricing: { __typename?: 'FixedPricing', price: any, currency: Currency }, nft: { __typename?: 'NFT', id: string, blockchainId?: string | null, serialNumber?: number | null, blockchainState: NftBlockchainState, status?: TransferState | null, wallet?: { __typename?: 'Wallet', address?: string | null } | null, model?: { __typename?: 'NFTModel', id: string, title: string, description: string, rarity?: SimpleRarityLevel | null, content?: { __typename?: 'NFTContent', id: string, poster?: { __typename?: 'SimpleFile', url: any, state: FileState, contentType?: string | null, id: string } | null, files?: Array<{ __typename?: 'NFTFile', url: any, id: string, state: FileState, contentType?: string | null } | null> | null } | null } | null } } | null> | null } | null };

export type ModelQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ModelQuery = { __typename?: 'Query', nftModel?: { __typename?: 'NFTModel', attributes?: any | null, quantity?: any | null, quantityMinted?: any | null, title: string, metadata?: any | null, status?: Status | null, state: NftModelBlockchainState, nfts?: Array<{ __typename?: 'NFT', id: string, serialNumber?: number | null, modelId?: string | null } | null> | null } | null };

export type NftQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type NftQuery = { __typename?: 'Query', nft?: { __typename?: 'NFT', blockchainId?: string | null, blockchainState: NftBlockchainState, metadata?: any | null, id: string, serialNumber?: number | null, saleState?: SaleState | null, status?: TransferState | null, model?: { __typename?: 'NFTModel', id: string, attributes?: any | null, status?: Status | null, blockchainId?: string | null, metadata?: any | null, title: string, description: string, rarity?: SimpleRarityLevel | null, quantity?: any | null, content?: { __typename?: 'NFTContent', id: string, poster?: { __typename?: 'SimpleFile', url: any, state: FileState, contentType?: string | null, id: string } | null, files?: Array<{ __typename?: 'NFTFile', url: any, id: string, state: FileState, contentType?: string | null } | null> | null } | null } | null, wallet?: { __typename?: 'Wallet', address?: string | null } | null, marketplaceListings?: Array<{ __typename?: 'MarketplaceListing', id: string, blockchainId?: string | null, state: MarketplaceListingState } | null> | null } | null };

export type NftModelQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type NftModelQuery = { __typename?: 'Query', nftModel?: { __typename?: 'NFTModel', id: string, attributes?: any | null, status?: Status | null, blockchainId?: string | null, metadata?: any | null, title: string, description: string, rarity?: SimpleRarityLevel | null, quantity?: any | null, quantityMinted?: any | null, content?: { __typename?: 'NFTContent', id: string, poster?: { __typename?: 'SimpleFile', url: any, state: FileState, contentType?: string | null, id: string } | null, files?: Array<{ __typename?: 'NFTFile', url: any, id: string, state: FileState, contentType?: string | null } | null> | null } | null, set: { __typename?: 'NFTSet', id: string } } | null };

export type NftModelsQueryVariables = Exact<{
  filter?: InputMaybe<NftModelFilterInput>;
  appId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type NftModelsQuery = { __typename?: 'Query', nftModels?: { __typename?: 'NFTModelList', cursor?: string | null, items?: Array<{ __typename?: 'NFTModel', id: string, blockchainId?: string | null, title: string, description: string, quantity?: any | null, status?: Status | null, rarity?: SimpleRarityLevel | null, content?: { __typename?: 'NFTContent', files?: Array<{ __typename?: 'NFTFile', url: any, contentType?: string | null } | null> | null, poster?: { __typename?: 'SimpleFile', url: any } | null } | null } | null> | null } | null };

export type NftsByWalletQueryVariables = Exact<{
  address?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  maxResults?: InputMaybe<Scalars['PositiveInt']['input']>;
  walletId?: InputMaybe<Scalars['ID']['input']>;
  filter?: InputMaybe<NftFilterInput>;
}>;


export type NftsByWalletQuery = { __typename?: 'Query', nftsByWallet?: { __typename?: 'NFTList', cursor?: string | null, items?: Array<{ __typename?: 'NFT', id: string, blockchainId?: string | null, serialNumber?: number | null, blockchainState: NftBlockchainState, modelId?: string | null, status?: TransferState | null, model?: { __typename?: 'NFTModel', id: string, title: string, description: string, rarity?: SimpleRarityLevel | null, attributes?: any | null, quantity?: any | null, quantityMinted?: any | null, metadata?: any | null, status?: Status | null, state: NftModelBlockchainState, updatedAt?: any | null, blockchainId?: string | null, createdAt: any, content?: { __typename?: 'NFTContent', id: string, files?: Array<{ __typename?: 'NFTFile', contentType?: string | null, id: string, url: any } | null> | null, poster?: { __typename?: 'SimpleFile', url: any, state: FileState, contentType?: string | null, id: string } | null } | null } | null } | null> | null } | null };

export type WalletByAddressQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type WalletByAddressQuery = { __typename?: 'Query', walletByAddress?: { __typename?: 'Wallet', id: string, address?: string | null, state: WalletState, verificationCode?: string | null } | null };

export type WalletByIdQueryVariables = Exact<{
  id?: InputMaybe<Scalars['ID']['input']>;
}>;


export type WalletByIdQuery = { __typename?: 'Query', walletById?: { __typename?: 'Wallet', address?: string | null, id: string, state: WalletState } | null };


export const CheckoutWithDapperWalletDocument = gql`
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
export const CompleteCheckoutWithDapperWalletDocument = gql`
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
export const CompleteMarketplaceCancelDocument = gql`
    mutation CompleteMarketplaceCancel($id: ID!, $transactionId: String!) {
  completeMarketplaceCancel(id: $id, transactionId: $transactionId) {
    state
    id
    nft {
      id
    }
  }
}
    `;
export const CompleteMarketplaceListDocument = gql`
    mutation CompleteMarketplaceList($nftId: ID!, $transactionId: String!) {
  completeMarketplaceList(nftId: $nftId, transactionId: $transactionId) {
    id
    state
    nft {
      id
    }
  }
}
    `;
export const CompleteMarketplacePurchaseDocument = gql`
    mutation CompleteMarketplacePurchase($id: ID!, $transactionId: String!) {
  completeMarketplacePurchase(id: $id, transactionId: $transactionId) {
    state
    id
    nft {
      id
    }
  }
}
    `;
export const CreateNiftoryWalletDocument = gql`
    mutation CreateNiftoryWallet($appId: ID = "") {
  createNiftoryWallet(appId: $appId) {
    address
    attributes
    createdAt
    id
    state
    walletType
  }
}
    `;
export const ReadyWalletDocument = gql`
    mutation readyWallet($address: String!) {
  readyWallet(address: $address) {
    id
    address
    state
  }
}
    `;
export const RegisterWalletDocument = gql`
    mutation registerWallet($address: String!) {
  registerWallet(address: $address) {
    id
    address
    verificationCode
    state
  }
}
    `;
export const SignTransactionForDapperWalletDocument = gql`
    mutation signTransactionForDapperWallet($transaction: String) {
  signTransactionForDapperWallet(transaction: $transaction)
}
    `;
export const TransferNftToWalletDocument = gql`
    mutation transferNFTToWallet($nftModelId: ID!, $address: String, $walletId: ID) {
  transfer(nftModelId: $nftModelId, walletId: $walletId, address: $address) {
    id
    blockchainId
    status
    saleState
  }
}
    `;
export const TransferBetweenWalletsDocument = gql`
    mutation transferBetweenWallets($id: ID!, $niftoryWalletAddress: String!, $receiverAddress: String!) {
  withdraw(
    receiverAddress: $receiverAddress
    niftoryWalletAddress: $niftoryWalletAddress
    id: $id
  ) {
    id
    status
  }
}
    `;
export const TransferByIdDocument = gql`
    mutation transferById($id: ID, $walletId: ID, $address: String, $force: Boolean) {
  transfer(id: $id, walletId: $walletId, address: $address, force: $force) {
    id
    serialNumber
    status
    saleState
  }
}
    `;
export const UpdateNftModelDocument = gql`
    mutation updateNFTModel($attributes: JSONObject, $metadata: JSONObject, $id: ID!) {
  updateNFTModel(data: {metadata: $metadata, attributes: $attributes}, id: $id) {
    attributes
    id
    title
    metadata
  }
}
    `;
export const VerifyWalletDocument = gql`
    mutation verifyWallet($address: String!, $signedVerificationCode: JSON!) {
  verifyWallet(address: $address, signedVerificationCode: $signedVerificationCode) {
    id
    address
    state
  }
}
    `;
export const WithdrawDocument = gql`
    mutation withdraw($id: ID!, $niftoryWalletAddress: String!, $receiverAddress: String!) {
  withdraw(
    id: $id
    receiverAddress: $receiverAddress
    niftoryWalletAddress: $niftoryWalletAddress
  ) {
    id
    blockchainId
    serialNumber
    modelId
    transactions {
      id
    }
  }
}
    `;
export const ContractDocument = gql`
    query contract {
  contract {
    name
    address
  }
}
    `;
export const GetNftsDocument = gql`
    query getNfts($ids: [ID]) {
  nfts(filter: {ids: $ids}, maxResults: 100) {
    items {
      serialNumber
      modelId
      id
      saleState
      status
    }
  }
}
    `;
export const MarketplaceListingDocument = gql`
    query MarketplaceListing($nftId: ID, $id: ID) {
  marketplaceListing(nftId: $nftId, id: $id) {
    id
    blockchainId
    transactionIds
    state
    wallet {
      address
    }
    pricing {
      price
      currency
    }
    nft {
      id
      blockchainId
      serialNumber
      blockchainState
      model {
        id
        title
        description
        rarity
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
}
    `;
export const MarketplaceListingsDocument = gql`
    query MarketplaceListings($filter: MarketplaceListingFilterInput, $appId: ID, $maxResults: PositiveInt, $cursor: String) {
  marketplaceListings(
    filter: $filter
    appId: $appId
    maxResults: $maxResults
    cursor: $cursor
  ) {
    items {
      id
      blockchainId
      transactionIds
      state
      wallet {
        address
      }
      pricing {
        price
        currency
      }
      nft {
        id
        blockchainId
        serialNumber
        blockchainState
        wallet {
          address
        }
        model {
          id
          title
          description
          rarity
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
    cursor
  }
}
    `;
export const ModelDocument = gql`
    query model($id: ID!) {
  nftModel(id: $id) {
    attributes
    quantity
    quantityMinted
    title
    metadata
    nfts {
      id
      serialNumber
      modelId
    }
    status
    state
  }
}
    `;
export const NftDocument = gql`
    query nft($id: ID!) {
  nft(id: $id) {
    blockchainId
    blockchainState
    metadata
    id
    serialNumber
    saleState
    model {
      id
      attributes
      status
      blockchainId
      metadata
      title
      description
      rarity
      quantity
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
    wallet {
      address
    }
    marketplaceListings {
      id
      blockchainId
      state
    }
  }
}
    `;
export const NftModelDocument = gql`
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
export const NftModelsDocument = gql`
    query nftModels($filter: NFTModelFilterInput, $appId: ID) {
  nftModels(filter: $filter, appId: $appId) {
    items {
      id
      blockchainId
      title
      description
      quantity
      status
      rarity
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
export const NftsByWalletDocument = gql`
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
      modelId
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
export const WalletByAddressDocument = gql`
    query walletByAddress($address: String!) {
  walletByAddress(address: $address) {
    id
    address
    state
    verificationCode
  }
}
    `;
export const WalletByIdDocument = gql`
    query walletById($id: ID = "") {
  walletById(id: $id) {
    address
    id
    state
  }
}
    `;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    CheckoutWithDapperWallet(variables: CheckoutWithDapperWalletMutationVariables, options?: C): Promise<CheckoutWithDapperWalletMutation> {
      return requester<CheckoutWithDapperWalletMutation, CheckoutWithDapperWalletMutationVariables>(CheckoutWithDapperWalletDocument, variables, options) as Promise<CheckoutWithDapperWalletMutation>;
    },
    CompleteCheckoutWithDapperWallet(variables: CompleteCheckoutWithDapperWalletMutationVariables, options?: C): Promise<CompleteCheckoutWithDapperWalletMutation> {
      return requester<CompleteCheckoutWithDapperWalletMutation, CompleteCheckoutWithDapperWalletMutationVariables>(CompleteCheckoutWithDapperWalletDocument, variables, options) as Promise<CompleteCheckoutWithDapperWalletMutation>;
    },
    CompleteMarketplaceCancel(variables: CompleteMarketplaceCancelMutationVariables, options?: C): Promise<CompleteMarketplaceCancelMutation> {
      return requester<CompleteMarketplaceCancelMutation, CompleteMarketplaceCancelMutationVariables>(CompleteMarketplaceCancelDocument, variables, options) as Promise<CompleteMarketplaceCancelMutation>;
    },
    CompleteMarketplaceList(variables: CompleteMarketplaceListMutationVariables, options?: C): Promise<CompleteMarketplaceListMutation> {
      return requester<CompleteMarketplaceListMutation, CompleteMarketplaceListMutationVariables>(CompleteMarketplaceListDocument, variables, options) as Promise<CompleteMarketplaceListMutation>;
    },
    CompleteMarketplacePurchase(variables: CompleteMarketplacePurchaseMutationVariables, options?: C): Promise<CompleteMarketplacePurchaseMutation> {
      return requester<CompleteMarketplacePurchaseMutation, CompleteMarketplacePurchaseMutationVariables>(CompleteMarketplacePurchaseDocument, variables, options) as Promise<CompleteMarketplacePurchaseMutation>;
    },
    CreateNiftoryWallet(variables?: CreateNiftoryWalletMutationVariables, options?: C): Promise<CreateNiftoryWalletMutation> {
      return requester<CreateNiftoryWalletMutation, CreateNiftoryWalletMutationVariables>(CreateNiftoryWalletDocument, variables, options) as Promise<CreateNiftoryWalletMutation>;
    },
    readyWallet(variables: ReadyWalletMutationVariables, options?: C): Promise<ReadyWalletMutation> {
      return requester<ReadyWalletMutation, ReadyWalletMutationVariables>(ReadyWalletDocument, variables, options) as Promise<ReadyWalletMutation>;
    },
    registerWallet(variables: RegisterWalletMutationVariables, options?: C): Promise<RegisterWalletMutation> {
      return requester<RegisterWalletMutation, RegisterWalletMutationVariables>(RegisterWalletDocument, variables, options) as Promise<RegisterWalletMutation>;
    },
    signTransactionForDapperWallet(variables?: SignTransactionForDapperWalletMutationVariables, options?: C): Promise<SignTransactionForDapperWalletMutation> {
      return requester<SignTransactionForDapperWalletMutation, SignTransactionForDapperWalletMutationVariables>(SignTransactionForDapperWalletDocument, variables, options) as Promise<SignTransactionForDapperWalletMutation>;
    },
    transferNFTToWallet(variables: TransferNftToWalletMutationVariables, options?: C): Promise<TransferNftToWalletMutation> {
      return requester<TransferNftToWalletMutation, TransferNftToWalletMutationVariables>(TransferNftToWalletDocument, variables, options) as Promise<TransferNftToWalletMutation>;
    },
    transferBetweenWallets(variables: TransferBetweenWalletsMutationVariables, options?: C): Promise<TransferBetweenWalletsMutation> {
      return requester<TransferBetweenWalletsMutation, TransferBetweenWalletsMutationVariables>(TransferBetweenWalletsDocument, variables, options) as Promise<TransferBetweenWalletsMutation>;
    },
    transferById(variables?: TransferByIdMutationVariables, options?: C): Promise<TransferByIdMutation> {
      return requester<TransferByIdMutation, TransferByIdMutationVariables>(TransferByIdDocument, variables, options) as Promise<TransferByIdMutation>;
    },
    updateNFTModel(variables: UpdateNftModelMutationVariables, options?: C): Promise<UpdateNftModelMutation> {
      return requester<UpdateNftModelMutation, UpdateNftModelMutationVariables>(UpdateNftModelDocument, variables, options) as Promise<UpdateNftModelMutation>;
    },
    verifyWallet(variables: VerifyWalletMutationVariables, options?: C): Promise<VerifyWalletMutation> {
      return requester<VerifyWalletMutation, VerifyWalletMutationVariables>(VerifyWalletDocument, variables, options) as Promise<VerifyWalletMutation>;
    },
    withdraw(variables: WithdrawMutationVariables, options?: C): Promise<WithdrawMutation> {
      return requester<WithdrawMutation, WithdrawMutationVariables>(WithdrawDocument, variables, options) as Promise<WithdrawMutation>;
    },
    contract(variables?: ContractQueryVariables, options?: C): Promise<ContractQuery> {
      return requester<ContractQuery, ContractQueryVariables>(ContractDocument, variables, options) as Promise<ContractQuery>;
    },
    getNfts(variables?: GetNftsQueryVariables, options?: C): Promise<GetNftsQuery> {
      return requester<GetNftsQuery, GetNftsQueryVariables>(GetNftsDocument, variables, options) as Promise<GetNftsQuery>;
    },
    MarketplaceListing(variables?: MarketplaceListingQueryVariables, options?: C): Promise<MarketplaceListingQuery> {
      return requester<MarketplaceListingQuery, MarketplaceListingQueryVariables>(MarketplaceListingDocument, variables, options) as Promise<MarketplaceListingQuery>;
    },
    MarketplaceListings(variables?: MarketplaceListingsQueryVariables, options?: C): Promise<MarketplaceListingsQuery> {
      return requester<MarketplaceListingsQuery, MarketplaceListingsQueryVariables>(MarketplaceListingsDocument, variables, options) as Promise<MarketplaceListingsQuery>;
    },
    model(variables: ModelQueryVariables, options?: C): Promise<ModelQuery> {
      return requester<ModelQuery, ModelQueryVariables>(ModelDocument, variables, options) as Promise<ModelQuery>;
    },
    nft(variables: NftQueryVariables, options?: C): Promise<NftQuery> {
      return requester<NftQuery, NftQueryVariables>(NftDocument, variables, options) as Promise<NftQuery>;
    },
    nftModel(variables: NftModelQueryVariables, options?: C): Promise<NftModelQuery> {
      return requester<NftModelQuery, NftModelQueryVariables>(NftModelDocument, variables, options) as Promise<NftModelQuery>;
    },
    nftModels(variables?: NftModelsQueryVariables, options?: C): Promise<NftModelsQuery> {
      return requester<NftModelsQuery, NftModelsQueryVariables>(NftModelsDocument, variables, options) as Promise<NftModelsQuery>;
    },
    nftsByWallet(variables?: NftsByWalletQueryVariables, options?: C): Promise<NftsByWalletQuery> {
      return requester<NftsByWalletQuery, NftsByWalletQueryVariables>(NftsByWalletDocument, variables, options) as Promise<NftsByWalletQuery>;
    },
    walletByAddress(variables: WalletByAddressQueryVariables, options?: C): Promise<WalletByAddressQuery> {
      return requester<WalletByAddressQuery, WalletByAddressQueryVariables>(WalletByAddressDocument, variables, options) as Promise<WalletByAddressQuery>;
    },
    walletById(variables?: WalletByIdQueryVariables, options?: C): Promise<WalletByIdQuery> {
      return requester<WalletByIdQuery, WalletByIdQueryVariables>(WalletByIdDocument, variables, options) as Promise<WalletByIdQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;