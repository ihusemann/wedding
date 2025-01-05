import { trpc } from "@/trpc/server";
import { Button } from "@repo/ui/components/button";

export default async function Page() {
  const data = await trpc.users.list();

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{JSON.stringify(data)}</h1>
        <Button size="sm">Button</Button>
      </div>
    </div>
  );
}
