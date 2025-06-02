export interface IMetafields {
  global: Record<string, string>;
  custom: {
    nftmodelid: string;
    groupid: string;
    upgradegroupid: string;
    [key: string]: string | number | boolean;
  };
  [key: string]: Record<string, string | number | boolean>;
}
