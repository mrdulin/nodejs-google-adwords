import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { APP_SECRET, getUserId } from '../utils';

async function signup(parent: any, args: any, context: any, info: any) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.db.mutation.createUser(
    {
      data: { ...args, password }
    },
    `{id}`
  );

  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user
  };
}

async function login(parent: any, args: any, context: any, info: any) {
  const user = await context.db.query.user({ where: { email: args.email } }, `{id password}`);
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

function post(root: any, args: any, context: any, info: any) {
  const userId = getUserId(context);
  console.log('userId: ', userId);
  return context.db.mutation.createLink(
    {
      data: {
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } }
      }
    },
    info
  );
}

export default { signup, login, post };
