import { Card, CardTitle } from "@/ui/shadcn/ui/card";

function Stat({ title, value, icon }) {
  return (
    <Card className="flex items-center px-4">
      <div className="flex space-x-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-[50%] border border-input">
          {icon}
        </div>
        <div>
          <CardTitle className="text-sm font-medium uppercase">
            {title}
          </CardTitle>
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </div>
    </Card>
  );
}

export default Stat;
