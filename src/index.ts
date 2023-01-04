import { ICANIDClient } from './ICANIDClient';
import { ICANIDClientOptions } from './global';

import './global';

export * from './global';

/**
 * Asynchronously creates the ICANIDClient instance and calls `checkSession`.
 *
 * **Note:** There are caveats to using this in a private browser tab, which may not silently authenticae
 * a user on page refresh. Please see [the checkSession docs](https://auth0.github.io/auth0-spa-js/classes/ICANIDClient.html#checksession) for more info.
 *
 * @param options The client options
 * @returns An instance of ICANIDClient
 */
export async function createICANIDClient(options: ICANIDClientOptions) {
  const auth0 = new ICANIDClient(options);
  await auth0.checkSession();
  return auth0;
}

export { ICANIDClient };

export {
  GenericError,
  AuthenticationError,
  TimeoutError,
  PopupTimeoutError,
  PopupCancelledError,
  MfaRequiredError,
  MissingRefreshTokenError
} from './errors';

export {
  ICache,
  LocalStorageCache,
  InMemoryCache,
  Cacheable,
  DecodedToken,
  CacheEntry,
  WrappedCacheEntry,
  KeyManifestEntry,
  MaybePromise,
  CacheKey,
  CacheKeyData
} from './cache';
