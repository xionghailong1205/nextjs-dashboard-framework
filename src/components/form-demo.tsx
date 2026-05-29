"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  projectName: z.string().min(2, "项目名称至少 2 个字符"),
  ownerEmail: z.string().email("请输入正确的邮箱地址"),
  databaseUrl: z.string().url("请输入完整的 PostgreSQL 连接地址"),
});

type FormValues = z.infer<typeof formSchema>;

export function FormDemo() {
  const [submittedData, setSubmittedData] = React.useState<FormValues | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "Next.js Dashboard",
      ownerEmail: "admin@example.com",
      databaseUrl: "******localhost:5432/dashboard",
    },
  });

  const onSubmit = async (values: FormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setSubmittedData(values);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card>
        <CardHeader>
          <CardTitle>React Hook Form 示例</CardTitle>
          <CardDescription>使用 Zod 做表单校验，提交后会在右侧输出格式化结果。</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="projectName">项目名称</Label>
              <Input id="projectName" {...register("projectName")} />
              {errors.projectName ? <p className="text-sm text-rose-500">{errors.projectName.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerEmail">负责人邮箱</Label>
              <Input id="ownerEmail" type="email" {...register("ownerEmail")} />
              {errors.ownerEmail ? <p className="text-sm text-rose-500">{errors.ownerEmail.message}</p> : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="databaseUrl">数据库连接字符串</Label>
              <Input id="databaseUrl" {...register("databaseUrl")} />
              {errors.databaseUrl ? <p className="text-sm text-rose-500">{errors.databaseUrl.message}</p> : null}
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "提交中..." : "提交表单"}
            </Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>提交结果</CardTitle>
          <CardDescription>可用于接入 API 或保存后台配置。</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-50">
            {JSON.stringify(submittedData, null, 2) ?? "null"}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
