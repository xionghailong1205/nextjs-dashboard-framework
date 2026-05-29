/* eslint-disable react-hooks/incompatible-library */

"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type TaskRow = {
  id: number;
  name: string;
  owner: string;
  status: "在线" | "草稿" | "暂停";
  updatedAt: string;
};

const data: TaskRow[] = [
  { id: 1, name: "Dashboard 首页", owner: "Admin", status: "在线", updatedAt: "2026-05-29" },
  { id: 2, name: "用户表管理", owner: "Helen", status: "草稿", updatedAt: "2026-05-27" },
  { id: 3, name: "数据同步任务", owner: "Mike", status: "暂停", updatedAt: "2026-05-25" },
  { id: 4, name: "审计日志", owner: "Suki", status: "在线", updatedAt: "2026-05-23" },
];

const columns: ColumnDef<TaskRow>[] = [
  {
    accessorKey: "name",
    header: "模块名称",
  },
  {
    accessorKey: "owner",
    header: "负责人",
  },
  {
    accessorKey: "status",
    header: "状态",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "在线" ? "success" : "secondary"}>{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: "更新时间",
  },
];

export function TableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card>
      <CardHeader className="gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <CardTitle>TanStack Table 示例</CardTitle>
          <CardDescription>一个可直接复用的客户端表格组件，包含排序和关键字过滤。</CardDescription>
        </div>
        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
          <Input
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="按模块名称或负责人搜索"
            className="md:w-72"
          />
          <Button type="button" variant="outline" onClick={() => table.resetSorting()}>
            重置排序
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <button
                        type="button"
                        className="flex items-center gap-2 font-medium"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: "↑",
                          desc: "↓",
                        }[header.column.getIsSorted() as string] ?? null}
                      </button>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center text-slate-500">
                  没有匹配的数据
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
