# google adwords nodejs

google adwords and nodejs in action

https://accounts.google.com/o/oauth2/auth?client_id=16536262744-tqkl7ugdc363i66tf4i64lhg3iubd83j.apps.googleusercontent.com&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadwords&redirect_uri=urn:ietf:wg:oauth:2.0:oob&access_type=offline&approval_prompt=auto

4/0wA_JBMyfVH1ZEqZlAr0sOn_XmdzUrBgCjrpi9fVs9TudrjZUDzuUmU

```bash
curl \
  -d code=4/MgGqR_qEUkzq95LlP_Am8clUbX8t733PvtoMuZ_xsmAA8NHdjK07xXo \
  -d client_id=16536262744-tqkl7ugdc363i66tf4i64lhg3iubd83j.apps.googleusercontent.com \
  -d client_secret=lcch1lisdrgzrOlNZUaeTGqI \
  -d redirect_uri=urn:ietf:wg:oauth:2.0:oob \
  -d grant_type=authorization_code https://accounts.google.com/o/oauth2/token
```

```bash
{
  "access_token": "ya29.GlvwBtvhPiM5HyvriZkyJGM0l7R63t26H7ig26psBl_I7TRVF86mlWSCvWbcuXeFPtGwuPnXbF4i6HM96pAITSGM_tyHm1i4JpPnCpHQmjH6hHYCCfCKmOlATMhQ",
  "expires_in": 3600,
  "refresh_token": "1/wOiUxb5S0TBKdDDwGfANp9kja4oBMrn45BG_-aOoQOk",
  "scope": "https://www.googleapis.com/auth/adwords",
  "token_type": "Bearer"
}
```

## references

- https://developers.google.com/adwords/api/docs/reference/release-notes/v201809?refresh=1
- https://github.com/googleads/googleads-python-lib/wiki
- https://developers.google.com/adwords/api/docs/guides/authentication
