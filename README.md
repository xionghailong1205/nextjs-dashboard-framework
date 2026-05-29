# nextjs-dashboard-framework

一个可直接运行的 Next.js 管理后台基础框架，已经集成：

- shadcn 风格 UI 组件
- 侧边栏后台布局
- TanStack Table demo 页面
- React Hook Form + Zod demo 页面
- PostgreSQL 直连配置（`pg`），不使用 ORM

## 本地启动

```bash
npm install
npm run dev
```

打开以下页面查看效果：

- `/`：后台首页
- `/table-demo`：TanStack Table 示例
- `/form-demo`：React Hook Form 示例
- `/settings/database`：数据库配置页

## PostgreSQL 配置

1. 复制 `.env.example` 为 `.env.local`
2. 配置连接字符串：

```bash
DATABASE_URL=******localhost:5432/dashboard
```

3. 在服务端直接写 SQL：

```ts
import { query } from "@/lib/db";

const result = await query("SELECT * FROM users WHERE id = $1", [userId]);
```

项目还提供了一个后端状态接口：

- `/api/database/status`

当 `DATABASE_URL` 已配置时，该接口会尝试执行 `SELECT 1 AS ok` 验证连接。
