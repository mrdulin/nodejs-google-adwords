# google adwords nodejs

Google Ads API Client Library for Node.js. This library is developed for Google Adwords SOAP + WSDL API (v201809).

## OAuth

Replace your GCP OAuth 2.0 client ID and open this link in browser:

https://accounts.google.com/o/oauth2/auth?client_id={Your Client ID}&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadwords&redirect_uri=urn:ietf:wg:oauth:2.0:oob&access_type=offline&approval_prompt=auto

Get authorization code: `4/0wA_JBMyfVH1ZEqZlAr0sOn_XmdzUrBgCjrpi9fVs9TudrjZUDzuUmU`

Using authorization code exchange credentials:

```bash
curl \
  -d code=4/MgGqR_qEUkzq95LlP_Am8clUbX8t733PvtoMuZ_xsmAA8NHdjK07xXo \
  -d client_id=<client id> \
  -d client_secret=<client secret> \
  -d redirect_uri=urn:ietf:wg:oauth:2.0:oob \
  -d grant_type=authorization_code https://accounts.google.com/o/oauth2/token
```

Credentials response:

```bash
{
  "access_token": "<Access token>",
  "expires_in": 3600,
  "refresh_token": "<Refresh token>",
  "scope": "https://www.googleapis.com/auth/adwords",
  "token_type": "Bearer"
}
```

## Environment variables

```txt
ADWORDS_CLIENT_ID=<GCP OAuth 2.0 client ID>
ADWORDS_SECRET=<GCP OAuth 2.0 client secret>
ADWORDS_DEVELOPER_TOKEN=<Google Adwords Developer Token>
ADWORDS_CLIENT_CUSTOMER_ID=153-935-9847
ADWORDS_USER_AGENT=Google Ads API Client Library for Node.js
ADWORDS_REFRESH_TOKEN=<OAuth Refresh Token>
```

Put above environment variables into `.env` file for local development.

## TODO

- [ ] <https://developers.google.com/adwords/api/docs/guides/batch-jobs>
- [ ] <http://adwordsapi.blogspot.in/2011/03/concurrency-management-in-adwords-api.html>

## references

- <https://developers.google.com/adwords/api/docs/reference/release-notes/v201809?refresh=1>
- <https://github.com/googleads/googleads-python-lib/wiki>
- <https://developers.google.com/adwords/api/docs/guides/authentication>
- <https://developers.google.com/adwords/api/docs/guides/objects-methods>
- <https://developers.google.com/adwords/api/docs/samples/php/basic-operations#add-expanded-text-ads-to-an-ad-group>
- <https://developers.google.com/adwords/api/docs/guides/bestpractices>
- <https://developers.google.com/adwords/api/docs/guides/authentication#optimizing_oauth2_requests>
- <https://developers.google.com/adwords/api/docs/appendix/geotargeting#dma>
- <https://developers.google.com/adwords/api/docs/guides/reporting>
