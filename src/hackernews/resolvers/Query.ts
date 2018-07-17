function feed(root: any, args: any, context: any, info: any): any {
  return context.db.query.links({}, info);
}

function title(): string {
  return 'This is the API of a Hackernews Clone';
}

export default { feed, title };
