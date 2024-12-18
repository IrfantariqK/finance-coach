"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { LightbulbIcon, TrendingUpIcon, AlertCircleIcon } from "lucide-react";

interface InsightsDisplayProps {
  insights?: {
    summary?: string;
    insights?: string[];
    recommendations?: string[];
  };
}

export function InsightsDisplay({ insights }: InsightsDisplayProps) {
  if (!insights) {
    return <InsightsLoading />;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="space-y-8">
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
              <LightbulbIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-muted-foreground">
              {insights.summary || "No summary available yet."}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <Card className="h-full bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 bg-green-100 rounded-full dark:bg-green-900">
                <TrendingUpIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent>
              {insights.insights && insights.insights.length > 0 ? (
                <ul className="space-y-4">
                  {insights.insights.map((insight, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-green-500" />
                      <span className="text-muted-foreground">{insight}</span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No insights available yet.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <Card className="h-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900">
                <AlertCircleIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              {insights.recommendations && insights.recommendations.length > 0 ? (
                <ul className="space-y-4">
                  {insights.recommendations.map((rec, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-purple-500" />
                      <span className="text-muted-foreground">{rec}</span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No recommendations available yet.</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function InsightsLoading() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-full" />
          <CardTitle>Financial Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-5/6 h-4" />
            <Skeleton className="w-4/6 h-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-5/6 h-4" />
            <Skeleton className="w-4/6 h-4" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
