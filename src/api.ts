import { TokenEndpointOptions, TokenEndpointResponse } from './global';
import { DEFAULT_ICANID_CLIENT } from './constants';
import { getJSON } from './http';
import { createQueryParams } from './utils';
import { encode } from 'js-base64';


export async function oauthToken(
  {
    baseUrl,
    timeout,
    audience,
    scope,
    icanidClient,
    useFormData,
    client_id,
    client_secret,
    clientSecretMethod,
    ...options
  }: TokenEndpointOptions,
  worker?: Worker
) {

  const headers: Record<string,any> = {
    'Content-Type': useFormData
      ? 'application/x-www-form-urlencoded'
      : 'application/json',
    // TODO enable
    // 'ICANID-Client': btoa(
    //   JSON.stringify(icanidClient || DEFAULT_ICANID_CLIENT)
    // )
  };
  if (clientSecretMethod == 'client_secret_basic') {
    const secret = encode(`${client_id}:${client_secret}`);
    headers['Authorization'] = `Basic ${secret}`;
  } else { // client_secret_post
    options.client_id = client_id;
    options.client_secret = client_secret;
  }

  const body = useFormData || clientSecretMethod == 'client_secret_basic'
    ? createQueryParams(options)
    : JSON.stringify(options);

  return await getJSON<TokenEndpointResponse>(
    `${baseUrl}/oauth2/token`,
    timeout,
    audience || 'default',
    scope,
    {
      method: 'POST',
      body,
      headers,
    },
    worker,
    useFormData
  );
}
