# google adwords nodejs

google adwords and nodejs in action

https://accounts.google.com/o/oauth2/auth?client_id=16536262744-gkf760ql3erq5vama61qq04l3lr94cgm.apps.googleusercontent.com&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fadwords&redirect_uri=urn:ietf:wg:oauth:2.0:oob&access_type=offline&approval_prompt=auto

4/0wA_JBMyfVH1ZEqZlAr0sOn_XmdzUrBgCjrpi9fVs9TudrjZUDzuUmU

```bash
curl \
  -d code=4/0wA_JBMyfVH1ZEqZlAr0sOn_XmdzUrBgCjrpi9fVs9TudrjZUDzuUmU \
  -d client_id=16536262744-gkf760ql3erq5vama61qq04l3lr94cgm.apps.googleusercontent.com \
  -d client_secret=F_TokpXnTv3XONyGvMdvxFxA \
  -d redirect_uri=urn:ietf:wg:oauth:2.0:oob \
  -d grant_type=authorization_code https://accounts.google.com/o/oauth2/token
```

```bash
{
  "access_token": "ya29.GluSBvAbpLMbEiZXqROVP-AY-oSyUS0xYgKiFneQWik8p076pCZ1vrgZekIktkJtgyScJDck2-6BNSmExxuJitA0nh1RVMi_JO-eAjhmCjnHqwF5mz-M8zMBe24J",
  "expires_in": 3600,
  "refresh_token": "1/8B5GdHgeFpWkeNKrFA0iJnYwLG1lRY6Ll5utouYimhg",
  "scope": "https://www.googleapis.com/auth/adwords",
  "token_type": "Bearer"
}
```

## references

- https://developers.google.com/adwords/api/docs/reference/release-notes/v201809?refresh=1
