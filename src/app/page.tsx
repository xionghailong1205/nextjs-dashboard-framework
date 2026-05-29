import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Badge>可直接运行</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">Next.js 管理后台开发框架</h1>
        <p className="max-w-3xl text-sm leading-6 text-slate-600">
          这是一个可直接启动的基础项目，集成了 shadcn 风格 UI 组件、TanStack Table、React Hook Form，以及 PostgreSQL
          直连配置。你可以在此基础上继续补充业务页面和 SQL 查询逻辑。
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>侧边栏布局</CardTitle>
            <CardDescription>已提供后台常见导航结构，适合作为管理系统母版页。</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>表格 Demo</CardTitle>
            <CardDescription>内置 TanStack Table 示例页面，可继续扩展分页、筛选和服务端查询。</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>表单 Demo</CardTitle>
            <CardDescription>使用 React Hook Form + Zod 完成表单校验和提交流程示例。</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>数据库接入方式</CardTitle>
          <CardDescription>项目使用 pg 直连 PostgreSQL，不引入 ORM，方便你直接编写 SQL。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <p>1. 在根目录创建 .env.local，并配置 DATABASE_URL。</p>
          <p>2. 在服务端使用 src/lib/db.ts 暴露的 query 或 getPool 直接执行 SQL。</p>
          <p>3. 打开“数据库配置”页面或 /api/database/status 查看当前配置状态。</p>
        </CardContent>
      </Card>
    </div>
  );
}
