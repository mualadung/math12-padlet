const fs = require('fs');
const path = require('path');

const targetProvider = process.argv[2]?.toLowerCase();
const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');

if (!['sqlite', 'postgresql', 'postgres'].includes(targetProvider)) {
  console.log('Cách dùng: node scripts/switch_db_provider.js [sqlite | postgresql]');
  process.exit(1);
}

let content = fs.readFileSync(schemaPath, 'utf-8');

if (targetProvider === 'sqlite') {
  content = content.replace(
    /datasource db \{[\s\S]*?\}/,
    `datasource db {\n  provider = "sqlite"\n  url      = "file:./dev.db"\n}`
  );
  console.log('✓ Đã chuyển Prisma schema sang SQLITE (file:./dev.db)');
} else {
  content = content.replace(
    /datasource db \{[\s\S]*?\}/,
    `datasource db {\n  provider  = "postgresql"\n  url       = env("DATABASE_URL")\n  directUrl = env("DIRECT_URL")\n}`
  );
  console.log('✓ Đã chuyển Prisma schema sang POSTGRESQL (Supabase / Neon)');
}

fs.writeFileSync(schemaPath, content, 'utf-8');
console.log('Chạy tiếp: npx prisma generate');
