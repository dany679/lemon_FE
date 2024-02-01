type labelProps = { label: string };

const Empty = ({ label }: labelProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center">
      <div className="relative h-72 w-72">
        {/* <Image alt="Empty" width={100} height={100} src="/empty.png" /> */}
      </div>
      <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  );
};

export default Empty;
