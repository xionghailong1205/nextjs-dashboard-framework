import { FormDemo } from "@/components/form-demo";

export default function FormDemoPage() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">React Hook Form Demo</h1>
        <p className="text-sm text-slate-500">保留最常见的表单校验和提交模式，方便继续封装业务表单。</p>
      </div>
      <FormDemo />
    </div>
  );
}
