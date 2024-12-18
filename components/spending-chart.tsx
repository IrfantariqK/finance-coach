"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@prisma/client";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface SpendingChartProps {
  transactions: Transaction[];
}

export function SpendingChart({ transactions }: SpendingChartProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const COLORS = {
    Shopping: "#FF6B6B",     // Coral Red
    Food: "#4ECDC4",         // Turquoise
    Transport: "#45B7D1",    // Sky Blue
    Bills: "#96CEB4",        // Sage Green
    Entertainment: "#FFEEAD", // Soft Yellow
    Health: "#D4A5A5",       // Dusty Rose
    Other: "#9A8C98",        // Muted Purple
  };

  const chartData = transactions
    .reduce((acc, transaction) => {
      if (transaction.type === "expense") {
        const category = transaction.category || "Other";
        const existingCategory = acc.find((item) => item.name === category);

        if (existingCategory) {
          existingCategory.value += transaction.amount;
        } else {
          acc.push({ name: category, value: transaction.amount });
        }
      }
      return acc;
    }, [] as { name: string; value: number }[])
    .sort((a, b) => b.value - a.value);

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return percent > 0.05 ? (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="h-[500px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
              Spending Overview
            </span>
            <span className="text-sm font-normal text-muted-foreground">
              Total: ${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.name as keyof typeof COLORS] || "#9A8C98"}
                        opacity={activeIndex === null || activeIndex === index ? 1 : 0.7}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              <AnimatePresence>
                {chartData.map((entry, index) => (
                  <motion.div
                    key={entry.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between gap-4 p-3 rounded-lg transition-colors ${
                      activeIndex === index ? 'bg-accent' : ''
                    }`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor:
                            COLORS[entry.name as keyof typeof COLORS] || "#9A8C98",
                        }}
                      />
                      <span className="font-medium">{entry.name}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-semibold">
                        ${entry.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {((entry.value / total) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
