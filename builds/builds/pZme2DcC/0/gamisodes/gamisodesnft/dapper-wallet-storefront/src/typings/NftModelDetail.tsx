import { EModelTypes } from "consts/const"

export type NFTModelDetail = {
  metadata: {
    type: EModelTypes
    title: string
    description: string
    amount: number
    quantityMinted: number
    price: number
    editionSize: string | null
    checkoutDisclaimer: string | null
    content: {
      contentType: string
      contentUrl: string
      thumbnailUrl: string
      alt: string
    }[]
  }
}
export enum EErrorIdentity {
  NO_PRICE = "NO_PRICE",
  NFT_LIMIT_REACHED = "NFT_LIMIT_REACHED",
  SessionExpired = "SESSION_EXPIRED",
  MustSignInVerifyWallet = "MUST_SIGN_IN_VERIFY_WALLET",
  MustBeString = "MUST_BE_STRING",
  MustBeEmail = "MUST_BE_EMAIL",
  IsNotEmpty = "IS_NOT_EMPTY",
  IsNotExist = "NOT_EXIST",
  ThisWalletExist = "THIS_WALLET_EXIST",
  MethodNotAllowed = "METHOD_NOT_ALLOWED",
  NftLimitReached = "NFT_LIMIT_REACHED",
  NftAllSold = "NFT_ALL_SOLD",
  NftNotFree = "NFT_NOT_FREE",
  NeedDapperWallet = "NEED_DAPPER_WALLET",
  NeedCustodialWallet = "NEED_CUSTODIAL_WALLET",
  MustBeHavingCustodialAndDapper = "MUST_BE_HAVING_CUSTODIAL_AND_DAPPER_WALLET",
  RecaptchaError = "RECAPTCHA_ERROR",
  ErrorWhileTransferring = "error-while-transferring",
  ErrorModelOfGroupNotExist = "ERROR_MODEL_OF_GROUP_NOT_EXIST",
  YouNotHaveThisGroup = "YOU_NOT_HAVE_THIS_GROUP",
  GroupNotExist = "GROUP_NOT_EXIST",
  GroupNotAvailable = "GROUP_NOT_AVAILABLE_NOW",
}

export const msgByErrorCode = {
  [EErrorIdentity.NO_PRICE]: (
    <h1 className="uppercase  ">
      WE PREPARE NEW MISSION FOR YOU! PLEASE, CONTACT US IF YOU FACED WITH THIS ERROR!{" "}
      <span className="span-placeholder">
        DON'T WORRY, YOUR SPECIAL CARD MIGHT BE REQUESTED AGAIN!
      </span>
    </h1>
  ),
  [EErrorIdentity.NFT_LIMIT_REACHED]: (
    <h1 className="uppercase  ">
      MISSION ACCOMPLISHED! YOUR WALLET'S CAPACITY FOR THIS CARD HAS BEEN MAXED OUT.
    </h1>
  ),
  [EErrorIdentity.SessionExpired]: (
    <h1 className="uppercase  ">YOUR SESSION HAS EXPIRED! PLEASE LOG IN AGAIN.</h1>
  ),
  [EErrorIdentity.MustSignInVerifyWallet]: (
    <h1 className="uppercase  ">
      PLEASE SIGN IN AND VERIFY YOUR WALLET TO PROCEED.
      <br />
      <span className="span-placeholder">Facing issues? – Reach out to our support team!</span>
    </h1>
  ),
  [EErrorIdentity.MustBeString]: (
    <h1 className="uppercase  ">
      THE PROVIDED INPUT MUST BE A STRING. PLEASE CHECK AND TRY AGAIN.
      <br />
      <span className="span-placeholder">Not sure what's wrong? – Contact us for guidance!</span>
    </h1>
  ),
  [EErrorIdentity.MustBeEmail]: (
    <h1 className="uppercase  ">
      PLEASE PROVIDE A VALID EMAIL ADDRESS.
      <br />
      <span className="span-placeholder">Having trouble? – We're here to assist!</span>
    </h1>
  ),
  [EErrorIdentity.IsNotEmpty]: (
    <h1 className="uppercase  ">
      THIS FIELD CANNOT BE EMPTY. PLEASE PROVIDE THE REQUIRED INFORMATION.
      <br />
      <span className="span-placeholder">Need further instructions? – Read below!</span>
    </h1>
  ),
  [EErrorIdentity.IsNotExist]: (
    <h1 className="uppercase  ">
      THE ITEM YOU'RE LOOKING FOR DOES NOT EXIST.
      <br />
      <span className="span-placeholder">Confused? – We're here to help!</span>
    </h1>
  ),
  [EErrorIdentity.ThisWalletExist]: (
    <h1 className="uppercase  ">
      OOPS! THIS WALLET ALREADY EXISTS IN OUR SYSTEM.
      <br />
      <span className="span-placeholder">Need assistance? – Check your wallet or contact us!</span>
    </h1>
  ),
  [EErrorIdentity.MethodNotAllowed]: (
    <h1 className="uppercase  ">
      MISSION DENIED! THE METHOD YOU'RE TRYING IS NOT ALLOWED.
      <br />
      <span className="span-placeholder">Confused? – Read below or get in touch!</span>
    </h1>
  ),
  [EErrorIdentity.NftAllSold]: (
    <h1 className="uppercase  ">
      OOPS! ALL CARDS OF THIS TYPE HAVE BEEN SOLD OUT.
      <br />
      <span className="span-placeholder">
        Stay tuned for the next drop or contact us for more info!
      </span>
    </h1>
  ),
  [EErrorIdentity.NftNotFree]: (
    <h1 className="uppercase  ">
      HOLD UP! THIS CARD IS NOT AVAILABLE FOR FREE.
      <br />
      <span className="span-placeholder">Interested? – Check the pricing or get in touch!</span>
    </h1>
  ),
  [EErrorIdentity.NeedDapperWallet]: (
    <h1 className="uppercase  ">
      TO CONTINUE, YOU NEED A DAPPER WALLET!
      <br />
      <span className="span-placeholder">Don't have one? – Set up now and return!</span>
    </h1>
  ),
  [EErrorIdentity.NeedCustodialWallet]: (
    <h1 className="uppercase  ">
      A CUSTODIAL WALLET IS REQUIRED TO PROCEED!
      <br />
      <span className="span-placeholder">Get started with a custodial wallet and come back!</span>
    </h1>
  ),
  [EErrorIdentity.MustBeHavingCustodialAndDapper]: (
    <h1 className="uppercase  ">
      BOTH CUSTODIAL AND DAPPER WALLETS ARE NEEDED!
      <br />
      <span className="span-placeholder">Ensure both wallets are set up and try again!</span>
    </h1>
  ),
  [EErrorIdentity.RecaptchaError]: (
    <h1 className="uppercase  ">
      RECAPTCHA VALIDATION FAILED!
      <br />
      <span className="span-placeholder">Please confirm you're not a robot and retry!</span>
    </h1>
  ),
  [EErrorIdentity.ErrorWhileTransferring]: (
    <h1 className="uppercase  ">
      OOPS! THERE WAS AN ERROR WHILE TRANSFERRING.
      <br />
      <span className="span-placeholder">PLEASE TRY AGAIN OR CONTACT SUPPORT FOR ASSISTANCE!</span>
    </h1>
  ),
  [EErrorIdentity.ErrorModelOfGroupNotExist]: (
    <h1 className="uppercase  ">
      THE MODEL OF THE GROUP YOU'RE LOOKING FOR DOES NOT EXIST.
      <br />
      <span className="span-placeholder">
        PLEASE VERIFY YOUR INPUT OR CONTACT US FOR CLARIFICATIONS!
      </span>
    </h1>
  ),
  [EErrorIdentity.YouNotHaveThisGroup]: (
    <h1 className="  ">
      IT SEEMS YOU DON'T HAVE ACCESS TO THIS GROUP.
      <br />
      In most cases, this means you've already opened/revealed this edition and/or the item is being
      transferred out of your collection.
      <br />
      <span className="span-placeholder">IF THE ERROR PERSISTS PLEASE CONTACT SUPPORT.</span>
    </h1>
  ),
  [EErrorIdentity.GroupNotExist]: (
    <h1 className="uppercase  ">
      THE GROUP YOU'RE TRYING TO ACCESS DOES NOT EXIST.
      <br />
      <span className="span-placeholder">PLEASE REVIEW YOUR INPUT OR GET IN TOUCH WITH US!</span>
    </h1>
  ),
  [EErrorIdentity.GroupNotAvailable]: (
    <h1 className="uppercase  ">
      THE GROUP YOU'RE TRYING TO ACCESS IS CURRENTLY NOT AVAILABLE.
      <br />
      <span className="span-placeholder">PLEASE CHECK BACK LATER OR CONTACT SUPPORT!</span>
    </h1>
  ),
}
