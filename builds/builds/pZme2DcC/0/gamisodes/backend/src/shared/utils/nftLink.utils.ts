interface IPathOptions {
  nftID: string;
  collectionName: string;
}

export const nftRedirectUrl = (
  host: string,
  { collectionName, nftID }: IPathOptions,
  query: Record<string, any>,
): string => {
  const url = new URL(`https://${host}/collection/${collectionName}/${nftID}`);
  Object.entries(query).forEach(([key, value]) =>
    url.searchParams.set(key, value.toString()),
  );
  return url.toString();
};

export const errorRedirectUrl = (
  host: string,
  nftModelId: string,
  query: Record<string, any>,
): string => {
  const url = new URL(`https://${host}/promo/error/${nftModelId}`);
  Object.entries(query).forEach(([key, value]) =>
    url.searchParams.set(key, value.toString()),
  );
  return url.toString();
};
