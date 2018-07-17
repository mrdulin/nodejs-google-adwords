function user(root: any, args: any, context: any, info: any) {
  return context.db.query.user({ where: { id: root.user.id } }, info);
}

export default { user };
