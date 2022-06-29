const __DB__ = 'products';
const __DBUSER__ = Deno.env.get('DBUSER') || 'root';
const __DBPASSWORD__ = Deno.env.get('DBPASSWORD') || 'root';
const __DBHOST__ = Deno.env.get('DBHOSTNAME') || '127.0.0.1';
const __DBPORT__ = Deno.env.get('DBPORT') || 5432;

const dbCreds = {
  user: __DBUSER__,
  database: __DB__,
  password: __DBPASSWORD__,
  hostname: __DBHOST__,
  port: __DBPORT__,
};

export { dbCreds };
