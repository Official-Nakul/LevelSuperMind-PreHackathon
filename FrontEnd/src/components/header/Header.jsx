import { Button } from "@/components/ui/button";

function header() {
  return (
    <div className=" w-full flex items-center justify-between sticky top-0 bg-white z-[49]">
      <h1 className=" text-blue-400 font-semibold text-4xl">Insights</h1>
      <div className=" self-end">
        <Button className=" mt-2">Ask AI</Button>
      </div>
    </div>
  );
}

export default header;
