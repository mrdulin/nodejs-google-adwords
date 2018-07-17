import * as jwt from 'jsonwebtoken';

const APP_SECRET = 'graphql-yoga-lab';

function getUserId(context: any) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET) as any;
    return userId;
  }

  throw new Error('Not authenticated');
}

export { getUserId, APP_SECRET };
