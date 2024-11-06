import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

const data = [
  { date: "Jan", views: 1200 },
  { date: "Feb", views: 1600 },
  { date: "Mar", views: 1900 },
  { date: "Apr", views: 1400 },
  { date: "May", views: 2200 },
  { date: "Jun", views: 2600 },
]

export function BusinessAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Views</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
