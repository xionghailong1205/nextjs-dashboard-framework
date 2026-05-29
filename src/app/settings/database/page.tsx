import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDatabaseConfig } from "@/lib/db";

export default function DatabaseSettingsPage() {
  const config = getDatabaseConfig();

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">数据库配置</h1>
        <p className="text-sm text-slate-500">使用环境变量配置 PostgreSQL 连接字符串，并在服务端直接执行 SQL。</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>当前状态</CardTitle>
          <CardDescription>配置项名称固定为 {config.envKey}。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Badge variant={config.configured ? "success" : "secondary"}>{config.configured ? "已配置" : "未配置"}</Badge>
          <div className="rounded-lg border border-dashed bg-slate-50 p-4 text-sm text-slate-600">
            {config.configured
              ? "已检测到 DATABASE_URL，后端可直接使用 pg 连接数据库。"
              : "请在 .env.local 中设置 DATABASE_URL=postgresql://user@localhost:5432/dashboard"}
          </div>
          <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-50">
{`import { query } from "@/lib/db";

const result = await query("SELECT * FROM users WHERE id = $1", [userId]);`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
