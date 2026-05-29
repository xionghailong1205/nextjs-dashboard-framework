import { TableDemo } from "@/components/table-demo";

export default function TableDemoPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">TanStack Table Demo</h1>
        <p className="text-sm text-slate-500">示例数据全部在前端，可快速替换成你的服务端查询结果。</p>
      </div>
      <TableDemo />
    </div>
  );
}
